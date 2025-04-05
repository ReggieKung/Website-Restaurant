import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help with scheduling today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    const newMsg = { sender: 'user', text: input };
    setMessages([...messages, newMsg]);
    setInput('');
    // Simulate a bot response for now
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: 'This is a placeholder response.' }]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-[#16181a]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <h2 className="font-semibold text-white">AI Chatbot</h2>
        <div className="text-gray-400 text-xl cursor-pointer">...</div>
      </div>
      
      {/* Messages container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`text-sm py-1 ${msg.sender === 'bot' ? 'text-gray-300' : 'text-white text-right'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div className="p-3 border-t border-gray-700 mt-auto">
        <div className="flex rounded bg-[#1e2124] overflow-hidden">
          <input 
            type="text" 
            className="flex-1 bg-transparent border-none p-2 text-sm text-white outline-none" 
            placeholder="Type a message..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage} 
            className="bg-blue-600 text-white px-4 font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
