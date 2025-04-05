import React from 'react';

function Sidebar({ employees, onAddEmployee, onEditEmployee }) {
  return (
    <aside className="w-64 bg-[#16181a] p-4 border-r border-gray-700 h-full">
      <div className="mb-4">
        <button 
          onClick={onAddEmployee}
          className="bg-green-600 text-white px-4 py-2 rounded-md w-full mb-2"
        >
          Add Employee
        </button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2 text-white">Restaurant Team</h2>
        <ul className="space-y-2">
          {employees.map(emp => (
            <li 
              key={emp.id} 
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md cursor-pointer text-white"
              onClick={() => onEditEmployee(emp)}
            >
              <div className="font-medium">{emp.name}</div>
              <div className="text-sm text-gray-400">{emp.role}</div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
