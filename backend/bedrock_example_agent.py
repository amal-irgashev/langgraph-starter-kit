# this is an instance of the agent that uses the bedrock runtime insetad of the langchain runtime
# the model is anthropic.claude-3-haiku-20240307-v1:0
# the tools are the tavily search results tool

# the difference is that here we are going lower level



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

warnings.filterwarnings("ignore")

# Load environment variables from .env file
load_dotenv("../.env")
aws_region = os.getenv("SSO_REGION")
tavily_api_key = os.getenv("TAVILY_API_KEY")

# Set bedrock configs
bedrock_config = Config(
    connect_timeout=120, 
    read_timeout=120, 
    retries={"max_attempts": 0}
)

# Initialize bedrock runtime client
bedrock_rt = boto3.client(
    "bedrock-runtime",
    region_name=aws_region,
    config=bedrock_config
)

# Initialize memory saver for thread-level persistence
memory = MemorySaver()

# Initialize search tool
tool = TavilySearchResults(max_results=2)

# Define the agent state
class AgentState(TypedDict):
    messages: Annotated[list[AnyMessage], operator.add]

def create_agent_graph():
    """Create and return the agent workflow graph."""
    workflow = StateGraph(AgentState)
    
    # Add nodes for LLM and tool execution
    workflow.add_node("llm", agent.call_bedrock)
    workflow.add_node("action", agent.take_action)
    
    # Add edges
    workflow.add_conditional_edges(
        "llm",
        agent.exists_action,
        {True: "action", False: END}
    )
    workflow.add_edge("action", "llm")
    
    # Set entry point
    workflow.set_entry_point("llm")
    
    return workflow.compile(checkpointer=memory)

class Agent:
    def __init__(self, model, tools, checkpointer, system=""):
        self.system = system
        self.tools = {t.name: t for t in tools}
        self.model = model.bind_tools(tools)

    def call_bedrock(self, state: AgentState):
        messages = state["messages"]
        if self.system:
            messages = [SystemMessage(content=self.system)] + messages
        message = self.model.invoke(messages)
        return {"messages": [message]}

    def exists_action(self, state: AgentState):
        result = state["messages"][-1]
        return len(result.tool_calls) > 0

    def take_action(self, state: AgentState):
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

# Initialize model
model = ChatBedrockConverse(
    client=bedrock_rt,
    model="anthropic.claude-3-haiku-20240307-v1:0",
    temperature=0,
    max_tokens=None,
)

# Create the agent instance
system_prompt = """You are a smart research assistant. Use the search engine to look up information. \
You are allowed to make multiple calls (either together or in sequence). \
Only look up information when you are sure of what you want. \
If you need to look up some information before asking a follow up question, you are allowed to do that!
"""

agent = Agent(model, [tool], system=system_prompt, checkpointer=memory)

# Create and expose the graph instance that LangGraph API expects
graph = create_agent_graph()

# Initialize LangGraph client
client = get_client()

