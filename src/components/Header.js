import React from 'react';

function Header() {
  return (
    <header className="bg-[#16181a] shadow-md border-b border-gray-800 flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4">
        {/* Restaurant logo */}
        <div className="w-10 h-10 bg-gray-700 text-white rounded-full flex items-center justify-center font-bold">
          <span>R</span>
        </div>
        <h1 className="text-xl font-semibold text-white">Restaurant Name</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Location Dropdown */}
        <div className="relative">
          <button className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none">
            Location ▼
          </button>
          {/* Dropdown content can be added here */}
        </div>
        {/* Sign Out */}
        <button className="text-gray-300 hover:text-white">Sign Out</button>
      </div>
    </header>
  );
}

export default Header;
