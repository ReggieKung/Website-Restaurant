import React, { useState } from 'react';

function AddEmployeeModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [availability, setAvailability] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, role, availability });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Add Employee</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Name</label>
            <input 
              type="text" 
              className="w-full border rounded p-2" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Role</label>
            <input 
              type="text" 
              className="w-full border rounded p-2" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Availability (e.g., "Mon-Fri")</label>
            <input 
              type="text" 
              className="w-full border rounded p-2" 
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required 
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeModal;
