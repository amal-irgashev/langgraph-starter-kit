from typing import Annotated, Sequence, TypedDict, Union, List, Dict, Any
from langchain_core.messages import BaseMessage, SystemMessage, ToolMessage
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langchain_community.tools import TavilySearchResults
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Define the agent state
class AgentState(TypedDict):
    """The state of the agent."""
    messages: Annotated[Sequence[BaseMessage], add_messages]

# Initialize tools
def get_tools():
    """Get the tools available to the agent."""
    return [TavilySearchResults(max_results=3)]

# Initialize model
def get_model():
    """Get the language model for the agent."""
    return ChatOpenAI(
        model="gpt-4o",
        temperature=0,
        streaming=True
    ).bind_tools(get_tools())

# Tool execution node
def tool_node(state: AgentState) -> Dict[str, List[ToolMessage]]:
    """Execute tools based on the agent's requests."""
    outputs = []
    tools_by_name = {tool.name: tool for tool in get_tools()}
    
    for tool_call in state["messages"][-1].tool_calls:
        tool_result = tools_by_name[tool_call["name"]].invoke(
            tool_call["args"]
        )
        outputs.append(
            ToolMessage(
                content=json.dumps(tool_result),
                name=tool_call["name"],
                tool_call_id=tool_call["id"],
            )
        )
    return {"messages": outputs}

# Agent node
def agent_node(state: AgentState) -> Dict[str, List[BaseMessage]]:
    """Process messages and decide on next actions."""
    system_prompt = SystemMessage(content="""You are a helpful AI assistant with access to search tools.
    Your goal is to help users by understanding their requests and using search when needed to provide accurate information.
    Always think step by step and use the search tool when you need to find current or factual information.
    When searching, be specific with your queries to get the most relevant results.""")
    
    response = get_model().invoke(
        [system_prompt] + list(state["messages"])
    )
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
    """Create the agent workflow graph."""
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
    
    return workflow.compile()

# Create and expose the graph instance
graph = create_graph()

# Helper function for direct usage
def process_message(message: str) -> List[dict]:
    """Process a message through the agent graph."""
    inputs = {"messages": [("user", message)]}
    return list(graph.stream(inputs))
