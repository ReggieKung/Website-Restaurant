import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import Chatbot from './components/Chatbot';
import AddEmployeeModal from './components/AddEmployeeModal';
import EditEmployeeModal from './components/EditEmployeeModal';

function App() {
  // Hard-coded employee data for demonstration
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', role: 'Server', availability: 'Mon-Fri' },
    { id: 2, name: 'Jane Smith', role: 'Chef', availability: 'Wed-Sun' },
    { id: 3, name: 'Emily Johnson', role: 'Host', availability: 'Sat-Sun' },
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Modal functions
  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setSelectedEmployee(null);
    setShowEditModal(false);
  };

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#16181a] text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          employees={employees} 
          onAddEmployee={openAddModal}
          onEditEmployee={openEditModal}
        />
        <div className="flex-grow overflow-auto">
          <Calendar employees={employees} />
        </div>
        <div className="w-64 flex-shrink-0 border-l border-gray-700">
          <Chatbot />
        </div>
      </div>
      {showAddModal && (
        <AddEmployeeModal onClose={closeAddModal} onAdd={addEmployee} />
      )}
      {showEditModal && selectedEmployee && (
        <EditEmployeeModal employee={selectedEmployee} onClose={closeEditModal} />
      )}
    </div>
  );
}

export default App;
