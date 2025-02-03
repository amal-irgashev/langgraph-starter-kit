from typing import Annotated, Sequence, TypedDict, Union, List, Dict, Any
from langchain_core.messages import BaseMessage, SystemMessage, ToolMessage
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langchain_community.tools import TavilySearchResults
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import ToolNode
from langgraph_sdk import get_client
from datetime import datetime
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize memory saver for thread-level persistence
memory = MemorySaver()

# Define the agent state
class AgentState(TypedDict):
    """The state of the agent."""
    messages: Annotated[Sequence[BaseMessage], add_messages]

# Initialize tools
def get_tools():
    """Get the tools available to the agent."""
    return [TavilySearchResults(max_results=3)]

tools = get_tools()
tool_node = ToolNode(tools)

# Initialize model
model = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.1,
    streaming=True
).bind_tools(tools)

# Define system prompt
system_prompt = SystemMessage(content=f"""You are a helpful AI assistant with access to search tools.
Your goal is to help users by understanding their requests and using search when needed to provide accurate information.
Always think step by step and use the search tool when you need to find current or factual information.
When searching, be specific with your queries to get the most relevant results.

The current date and time is: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}""")

# Agent node
async def agent_node(state: AgentState) -> Dict[str, List[BaseMessage]]:
    """Process messages and decide on next actions."""
    messages = [system_prompt] + list(state["messages"])
    response = await model.ainvoke(messages)
    return {"messages": [response]}

# Routing logic
def should_continue(state: AgentState) -> str:
    """Determine if we should continue processing or end."""
    messages = state["messages"]
    last_message = messages[-1]
    
    if not hasattr(last_message, 'tool_calls') or not last_message.tool_calls:
        return "end"
    return "continue"

# Create the graph
def create_graph() -> StateGraph:
    """Create the agent workflow graph with thread-level persistence."""
    workflow = StateGraph(AgentState)
    
    # Add nodes
    workflow.add_node("agent", agent_node)
    workflow.add_node("tools", tool_node)
    
    # Set entry point
    workflow.set_entry_point("agent")
    
    # Add edges
    workflow.add_conditional_edges(
        "agent",
        should_continue,
        {
            "continue": "tools",
            "end": END,
        },
    )
    workflow.add_edge("tools", "agent")
    
    # Compile with memory checkpointer for persistence
    return workflow.compile(checkpointer=memory)

# Create and expose the graph instance
graph = create_graph()

# Initialize LangGraph client
client = get_client()

