// // Chat Test Component to test the chat functionality

// // 'use client';

// import { useChat } from '../contexts/ChatContext';
// import { useChatActions } from '../hooks/useChatActions';
// import { useEffect, useState } from 'react';

// export function ChatTest() {
//   const { messages, isLoading, events } = useChat();
//   const { sendMessage, ready } = useChatActions();
//   const [status, setStatus] = useState<string>('Initializing...');
//   const [userInput, setUserInput] = useState<string>('');

//   useEffect(() => {
//     if (ready) {
//       setStatus('Ready');
//     }
//   }, [ready]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!ready || !userInput.trim()) return;
//     await sendMessage(userInput);
//     setUserInput('');
//   };

//   // Get the latest chain end event for the final answer
//   const latestChainEndEvent = events
//     .slice()
//     .reverse()
//     .find(event => event.data?.event === 'on_chain_end');

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       {/* Status Bar */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-medium text-gray-700">LangGraph Test</h2>
//         <span className={`text-sm px-2 py-1 rounded ${ready ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
//           {status}
//         </span>
//       </div>

//       {/* Input Section */}
//       <form onSubmit={handleSubmit} className="flex gap-2">
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder="Ask a question..."
//           className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//           disabled={!ready || isLoading}
//         />
//         <button
//           type="submit"
//           disabled={!ready || isLoading || !userInput.trim()}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//         >
//           {isLoading ? '...' : 'Send'}
//         </button>
//       </form>

//       {/* Main Content */}
//       <div className="grid grid-cols-2 gap-4">
//         {/* Event Stream Panel */}
//         <div className="border rounded-lg p-4 bg-gray-50">
//           <h3 className="text-sm font-medium text-gray-600 mb-3">Agent Stream</h3>
//           <div className="space-y-2 h-[500px] overflow-y-auto">
//             {events.map((event, idx) => {
//               const isChainStart = event.data?.event === 'on_chain_start';
//               const isChainEnd = event.data?.event === 'on_chain_end';
//               const isStream = event.data?.event === 'on_chain_stream';
              
//               // Only show stream events where the message is from the AI
//               const message = event.data?.data?.chunk?.messages?.[0];
//               const isAIMessage = message?.type === 'ai';
              
//               if (isStream && isAIMessage) {
//                 return (
//                   <div
//                     key={idx}
//                     className="p-2 rounded text-sm bg-yellow-50 text-yellow-700"
//                   >
//                     <div className="flex justify-between items-center mb-1">
//                       <span className="text-xs font-medium">Agent Thinking</span>
//                       <span className="text-xs opacity-70">
//                         {event.data?.metadata?.langgraph_node || 'agent'}
//                       </span>
//                     </div>
//                     <p className="text-xs whitespace-pre-wrap">
//                       {message.content || 'Processing...'}
//                     </p>
//                   </div>
//                 );
//               }
//               return null;
//             })}
//           </div>
//         </div>

//         {/* Final Answer Panel */}
//         <div className="border rounded-lg p-4">
//           <h3 className="text-sm font-medium text-gray-600 mb-3">Final Answer</h3>
//           <div className="h-[500px] overflow-y-auto">
//             {messages.map((msg, idx) => (
//               <div key={idx} className="mb-4">
//                 <p className="text-xs font-medium text-gray-500 mb-1">
//                   {msg.role === 'user' ? 'Question' : 'Answer'}
//                 </p>
//                 <p className="text-sm whitespace-pre-wrap">
//                   {msg.content}
//                 </p>
//               </div>
//             ))}
//             {latestChainEndEvent && (
//               <div className="mt-2 p-2 bg-green-50 rounded">
//                 <p className="text-xs font-medium text-green-700">Latest Response</p>
//                 <p className="text-sm whitespace-pre-wrap">
//                   {latestChainEndEvent.data.data.output?.messages?.[0]?.content}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }