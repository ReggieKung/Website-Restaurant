import React, { useState } from 'react';

function EditEmployeeModal({ employee, onClose }) {
  // Use local state for editing (simulate updating employee info)
  const [name, setName] = useState(employee.name);
  const [role, setRole] = useState(employee.role);
  const [availability, setAvailability] = useState(employee.availability);

  const handleSave = () => {
    // In a real application, you would update the employee record here.
    console.log('Saved changes:', { name, role, availability });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit Employee Schedule</h3>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input 
            type="text" 
            className="w-full border rounded p-2" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Role</label>
          <input 
            type="text" 
            className="w-full border rounded p-2" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Availability</label>
          <input 
            type="text" 
            className="w-full border rounded p-2" 
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={handleSave} 
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeeModal;
