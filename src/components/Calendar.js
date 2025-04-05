import React, { useState, useRef, useEffect } from 'react';

function Calendar({ employees }) {
  // State for modals and dropdowns
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Refs for click-outside handling
  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const locationButtonRef = useRef(null);

  // For drag-and-drop, we simply rely on native events on the shift cards
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.dataset.id);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("dragging");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("active");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("active");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("active");
    const draggable = document.querySelector(".dragging");
    if (draggable) {
      e.currentTarget.appendChild(draggable);
    }
  };

  // Toggle functions for modals and dropdown
  const toggleLocationDropdown = () => setShowLocationDropdown(!showLocationDropdown);
  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);
  const openEditModal = () => setShowEditModal(true);
  const closeEditModal = () => setShowEditModal(false);

  // Click outside detection
  useEffect(() => {
    function handleClickOutside(event) {
      // Location dropdown
      if (
        showLocationDropdown && 
        locationDropdownRef.current && 
        !locationDropdownRef.current.contains(event.target) &&
        locationButtonRef.current &&
        !locationButtonRef.current.contains(event.target)
      ) {
        setShowLocationDropdown(false);
      }
      
      // Add Employee modal
      if (
        showAddModal && 
        addModalRef.current && 
        !addModalRef.current.contains(event.target)
      ) {
        closeAddModal();
      }
      
      // Edit Employee modal
      if (
        showEditModal && 
        editModalRef.current && 
        !editModalRef.current.contains(event.target)
      ) {
        closeEditModal();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLocationDropdown, showAddModal, showEditModal]);

  return (
    <div className="bg-[#16181a] text-gray-200 h-full overflow-auto">
      {/* Header Section */}
      <header className="bg-[#16181a] py-4 px-6 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-blue-400">Shift Scheduler</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <button 
                ref={locationButtonRef}
                id="locationDropdownBtn" 
                onClick={toggleLocationDropdown}
                className="flex items-center bg-[#1e2024] hover:bg-[#23252a] px-4 py-2 rounded-lg transition"
              >
                <i className="fas fa-store mr-2 text-blue-400"></i>
                <span>Downtown Location</span>
                <i className="fas fa-chevron-down ml-2 text-sm"></i>
              </button>
              {showLocationDropdown && (
                <div 
                  ref={locationDropdownRef}
                  id="locationDropdown" 
                  className="absolute z-10 mt-2 w-48 bg-[#1e2024] rounded-lg shadow-lg"
                >
                  <a href="#" className="block px-4 py-2 hover:bg-[#23252a] rounded-t-lg">Downtown Location</a>
                  <a href="#" className="block px-4 py-2 hover:bg-[#23252a]">Uptown Location</a>
                  <a href="#" className="block px-4 py-2 hover:bg-[#23252a] rounded-b-lg">Westside Location</a>
                </div>
              )}
            </div>

            <button className="flex items-center bg-[#1e2024] hover:bg-[#23252a] px-4 py-2 rounded-lg transition">
              <i className="fas fa-users mr-2 text-green-400"></i>
              <span>
                Team <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs ml-1">12</span>
              </span>
            </button>

            <button 
              id="addEmployeeBtn" 
              onClick={openAddModal}
              className="flex items-center bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition"
            >
              <i className="fas fa-plus mr-2"></i>
              <span>Add Employee</span>
            </button>
          </div>
        </div>
      </header>

      {/* Calendar Navigation */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center bg-[#1e2024] hover:bg-[#23252a] px-4 py-2 rounded-lg transition">
            <i className="fas fa-chevron-left mr-2"></i>
            Previous Week
          </button>

          <h2 className="text-xl font-semibold">June 11 - June 17, 2023</h2>

          <button className="flex items-center bg-[#1e2024] hover:bg-[#23252a] px-4 py-2 rounded-lg transition">
            Next Week
            <i className="fas fa-chevron-right ml-2"></i>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-[#1c1e22] rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-7 border border-[#2a2d32] divide-x divide-[#2a2d32]">
            {/* Day Headers */}
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, i) => (
              <div key={i} className="bg-[#1c1e22] p-3 text-center font-medium border-b border-[#2a2d32]">{day}</div>
            ))}

            {/* Day Cells */}
            <div className="bg-[#1c1e22] p-3 drop-zone min-h-40" data-day="sunday"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div 
                className="shift-card bg-blue-100 text-blue-800 p-2 mb-2 rounded-lg cursor-move draggable shadow" 
                data-id="shift1" 
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <div className="font-medium">John D.</div>
                <div className="text-xs">8:00 AM - 4:00 PM</div>
              </div>
            </div>

            <div className="bg-[#1c1e22] p-3 drop-zone min-h-40" data-day="monday"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div 
                className="shift-card bg-green-100 text-green-800 p-2 mb-2 rounded-lg cursor-move draggable shadow" 
                data-id="shift2" 
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <div className="font-medium">Sarah M.</div>
                <div className="text-xs">9:00 AM - 5:00 PM</div>
              </div>
              <div 
                className="shift-card bg-pink-100 text-pink-800 p-2 mb-2 rounded-lg cursor-move draggable shadow" 
                data-id="shift3" 
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <div className="font-medium">Mike T.</div>
                <div className="text-xs">12:00 PM - 8:00 PM</div>
              </div>
            </div>

            <div className="bg-[#1c1e22] p-3 drop-zone min-h-40" data-day="tuesday"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div 
                className="shift-card bg-purple-100 text-purple-800 p-2 mb-2 rounded-lg cursor-move draggable shadow" 
                data-id="shift4" 
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <div className="font-medium">Emma L.</div>
                <div className="text-xs">10:00 AM - 6:00 PM</div>
              </div>
            </div>

            <div className="bg-[#1c1e22] p-3 drop-zone min-h-40" data-day="wednesday"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div 
                className="shift-card bg-yellow-100 text-yellow-800 p-2 mb-2 rounded-lg cursor-move draggable shadow" 
                data-id="shift5" 
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <div className="font-medium">Alex K.</div>
                <div className="text-xs">7:00 AM - 3:00 PM</div>
              </div>
            </div>

            <div className="bg-[#1c1e22] p-3 drop-zone min-h-40" data-day="thursday"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            ></div>

            <div className="bg-[#1c1e22] p-3 drop-zone min-h-40" data-day="friday"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            ></div>

            <div className="bg-[#1c1e22] p-3 drop-zone min-h-40" data-day="saturday"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            ></div>
          </div>
        </div>

        {/* Employee List Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {employees && employees.map(emp => (
              <div key={emp.id} className="bg-[#1d1f23] rounded-lg p-4 shadow hover:shadow-lg transition">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3">
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{emp.name}</div>
                    <div className="text-sm text-gray-400">{emp.role}</div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    className="edit-employee-btn bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md text-sm transition" 
                    onClick={openEditModal}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
