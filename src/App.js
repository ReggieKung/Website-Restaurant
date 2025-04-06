import React, { useState } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="flex flex-col h-screen bg-[#16181a] text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-grow overflow-auto">
          <Calendar />
        </div>
        <div className="w-64 flex-shrink-0 border-l border-gray-700">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}

export default App;
