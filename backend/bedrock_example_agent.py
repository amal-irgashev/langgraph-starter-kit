# This is an implementation of a ReAct agent using Amazon Bedrock runtime instead of LangChain runtime
# The model used is Claude 3 Haiku (anthropic.claude-3-haiku-20240307-v1:0)
# The agent is equipped with Tavily search capability as its primary tool

from typing import Annotated, TypedDict
from langchain_core.messages import AnyMessage, SystemMessage, HumanMessage, ToolMessage
from langchain_aws import ChatBedrockConverse
from langgraph.graph import StateGraph, END
import operator
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.checkpoint.memory import MemorySaver
from langgraph_sdk import get_client
import os
from dotenv import load_dotenv
import boto3
from botocore.config import Config
import warnings
import logging
from datetime import datetime

# Suppress warning messages
warnings.filterwarnings("ignore")

# Environment setup
load_dotenv("../.env")
aws_region = os.getenv("SSO_REGION")
tavily_api_key = os.getenv("TAVILY_API_KEY")

# Configure Bedrock client with extended timeouts and no retries
bedrock_config = Config(
    connect_timeout=120, 
    read_timeout=120, 
    retries={"max_attempts": 0}
)

# Initialize AWS Bedrock runtime client
bedrock_rt = boto3.client(
    "bedrock-runtime",
    region_name=aws_region,
    config=bedrock_config
)

# Initialize persistence layer for maintaining conversation state
memory = MemorySaver()

# Initialize Tavily search tool with max 2 results per query
tool = TavilySearchResults(max_results=2)

# Define the structure for maintaining agent state
# Uses TypedDict for type safety and Annotated for operator behavior
class AgentState(TypedDict):
    messages: Annotated[list[AnyMessage], operator.add]  # List of messages that can be concatenated

def create_agent_graph():
    """Create and return the agent workflow graph.
    
    This function defines the execution flow of the agent:
    1. LLM generates response/action
    2. Check if action needed
    3. Execute action if needed, otherwise end
    4. Return to LLM with action results
    """
    workflow = StateGraph(AgentState)
    
    # Define main workflow nodes
    workflow.add_node("llm", agent.call_bedrock)  # Node for LLM interactions
    workflow.add_node("action", agent.take_action)  # Node for tool execution
    
    # Define workflow logic
    workflow.add_conditional_edges(
        "llm",
        agent.exists_action,
        {True: "action", False: END}  # If action needed, go to action node, else end
    )
    workflow.add_edge("action", "llm")  # After action, return to LLM
    
    workflow.set_entry_point("llm")  # Start workflow at LLM node
    
    return workflow.compile(checkpointer=memory)

class Agent:
    """Main agent class that handles LLM interactions and tool execution"""
    
    def __init__(self, model, tools, checkpointer, system=""):
        """Initialize agent with model, tools, and optional system prompt"""
        self.system = system
        self.tools = {t.name: t for t in tools}  # Create tool lookup dictionary
        self.model = model.bind_tools(tools)  # Bind tools to the model

    def call_bedrock(self, state: AgentState):
        """Make a call to the Bedrock LLM"""
        messages = state["messages"]
        if self.system:
            messages = [SystemMessage(content=self.system)] + messages
        message = self.model.invoke(messages)
        return {"messages": [message]}

    def exists_action(self, state: AgentState):
        """Check if the last message requires any tool actions"""
        result = state["messages"][-1]
        return len(result.tool_calls) > 0

    def take_action(self, state: AgentState):
        """Execute requested tools and return their results"""
        tool_calls = state["messages"][-1].tool_calls
        results = []
        for t in tool_calls:
            print(f"Calling: {t}")
            result = self.tools[t["name"]].invoke(t["args"])
            results.append(
                ToolMessage(tool_call_id=t["id"], name=t["name"], content=str(result))
            )
        print("Back to the model!")
        return {"messages": results}

# Initialize the Bedrock model
model = ChatBedrockConverse(
    client=bedrock_rt,
    model="anthropic.claude-3-haiku-20240307-v1:0",
    temperature=0,  # Set to 0 for more deterministic responses
    max_tokens=None,
)

# Define system prompt for the agent
system_prompt = f"""You are a smart research assistant with access to search tools.
Your goal is to help users by understanding their requests and using search when needed to provide accurate information.
Always think step by step and use the search tool when you need to find current or factual information.
When searching, be specific with your queries to get the most relevant results.

Only look up information when you are sure of what you want.
If you need to look up some information before asking a follow up question, you are allowed to do that!

The current date and time is: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}"""

# Create agent instance with model, search tool, and system prompt
agent = Agent(model, [tool], system=system_prompt, checkpointer=memory)

# Create the workflow graph
graph = create_agent_graph()

# Initialize LangGraph client for API interactions
client = get_client()

