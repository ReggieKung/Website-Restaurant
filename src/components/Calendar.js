import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStore, 
  faUsers, 
  faPlus, 
  faChevronDown, 
  faChevronLeft, 
  faChevronRight, 
  faTimes, 
  faEdit, 
  faBan 
} from '@fortawesome/free-solid-svg-icons';

function Calendar() {
  // State for modals
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  
  // Setup drag and drop functionality
  useEffect(() => {
    const draggables = document.querySelectorAll('.draggable');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });
      
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });
    
    dropZones.forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('active');
      });
      
      zone.addEventListener('dragleave', () => {
        zone.classList.remove('active');
      });
      
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('active');
        
        const draggable = document.querySelector('.dragging');
        if (draggable) {
          zone.appendChild(draggable);
        }
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      draggables.forEach(draggable => {
        draggable.removeEventListener('dragstart', () => {});
        draggable.removeEventListener('dragend', () => {});
      });
      
      dropZones.forEach(zone => {
        zone.removeEventListener('dragover', () => {});
        zone.removeEventListener('dragleave', () => {});
        zone.removeEventListener('drop', () => {});
      });
    };
  }, []);

  // Handle form submission
  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    alert('Employee added successfully!');
    setIsAddEmployeeModalOpen(false);
    setIsTeamModalOpen(false);
  };

  // Custom styles to be included directly in the component
  const styles = {
    pastelBlue: {
      backgroundColor: '#a7c7e7',
      color: '#1e3a8a'
    },
    pastelGreen: {
      backgroundColor: '#b5ead7',
      color: '#166534'
    },
    pastelPink: {
      backgroundColor: '#ffb7b2',
      color: '#9f1239'
    },
    pastelPurple: {
      backgroundColor: '#d8b4fe',
      color: '#5b21b6'
    },
    pastelYellow: {
      backgroundColor: '#fdfd96',
      color: '#854d0e'
    },
    shiftCard: {
      transition: 'all 0.2s ease'
    },
    shiftCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    modal: {
      transition: 'opacity 0.2s ease, visibility 0.2s ease'
    },
    dragging: {
      opacity: 0.5
    },
    dropZone: {
      minHeight: '100px',
      transition: 'background-color 0.2s ease'
    },
    dropZoneActive: {
      backgroundColor: 'rgba(74, 85, 104, 0.3)'
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-800 py-4 px-6 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-blue-400">Shift Scheduler</h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <button 
                id="locationDropdownBtn" 
                className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              >
                <FontAwesomeIcon icon={faStore} className="mr-2 text-blue-400" />
                <span>Downtown Location</span>
                <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-sm" />
              </button>
              <div 
                id="locationDropdown" 
                className={`absolute z-10 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg ${isLocationDropdownOpen ? '' : 'hidden'}`}
              >
                <a href="#" className="block px-4 py-2 hover:bg-gray-600 rounded-t-lg">Downtown Location</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-600">Uptown Location</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-600 rounded-b-lg">Westside Location</a>
              </div>
            </div>
            
            <button 
              id="teamBtn" 
              className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
              onClick={() => setIsTeamModalOpen(true)}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2 text-green-400" />
              <span>Team <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs ml-1">12</span></span>
            </button>
            
            <button 
              id="addEmployeeBtn" 
              className="flex items-center bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition"
              onClick={() => setIsAddEmployeeModalOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>
      </header>

      {/* Calendar Navigation */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            Previous Week
          </button>
          
          <h2 className="text-xl font-semibold">June 11 - June 17, 2023</h2>
          
          <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition">
            Next Week
            <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-7 gap-px bg-gray-700">
            {/* Day Headers */}
            <div className="bg-gray-800 p-3 text-center font-medium">Sunday</div>
            <div className="bg-gray-800 p-3 text-center font-medium">Monday</div>
            <div className="bg-gray-800 p-3 text-center font-medium">Tuesday</div>
            <div className="bg-gray-800 p-3 text-center font-medium">Wednesday</div>
            <div className="bg-gray-800 p-3 text-center font-medium">Thursday</div>
            <div className="bg-gray-800 p-3 text-center font-medium">Friday</div>
            <div className="bg-gray-800 p-3 text-center font-medium">Saturday</div>
            
            {/* Day Cells */}
            <div className="bg-gray-800 p-3 drop-zone min-h-40" data-day="sunday">
              <div className="shift-card draggable" draggable="true" style={{...styles.shiftCard, ...styles.pastelBlue, padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.5rem', cursor: 'move'}}>
                <div className="font-medium">John D.</div>
                <div className="text-xs">8:00 AM - 4:00 PM</div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 drop-zone min-h-40" data-day="monday">
              <div className="shift-card draggable" draggable="true" style={{...styles.shiftCard, ...styles.pastelGreen, padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.5rem', cursor: 'move'}}>
                <div className="font-medium">Sarah M.</div>
                <div className="text-xs">9:00 AM - 5:00 PM</div>
              </div>
              <div className="shift-card draggable" draggable="true" style={{...styles.shiftCard, ...styles.pastelPink, padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.5rem', cursor: 'move'}}>
                <div className="font-medium">Mike T.</div>
                <div className="text-xs">12:00 PM - 8:00 PM</div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 drop-zone min-h-40" data-day="tuesday">
              <div className="shift-card draggable" draggable="true" style={{...styles.shiftCard, ...styles.pastelPurple, padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.5rem', cursor: 'move'}}>
                <div className="font-medium">Emma L.</div>
                <div className="text-xs">10:00 AM - 6:00 PM</div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 drop-zone min-h-40" data-day="wednesday">
              <div className="shift-card draggable" draggable="true" style={{...styles.shiftCard, ...styles.pastelYellow, padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.5rem', cursor: 'move'}}>
                <div className="font-medium">Alex K.</div>
                <div className="text-xs">7:00 AM - 3:00 PM</div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 drop-zone min-h-40" data-day="thursday">
              <div className="shift-card draggable" draggable="true" style={{...styles.shiftCard, ...styles.pastelBlue, padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.5rem', cursor: 'move'}}>
                <div className="font-medium">John D.</div>
                <div className="text-xs">8:00 AM - 4:00 PM</div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 drop-zone min-h-40" data-day="friday">
              <div className="shift-card draggable" draggable="true" style={{...styles.shiftCard, ...styles.pastelGreen, padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.5rem', cursor: 'move'}}>
                <div className="font-medium">Sarah M.</div>
                <div className="text-xs">9:00 AM - 5:00 PM</div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 drop-zone min-h-40" data-day="saturday">
              <div className="shift-card draggable" draggable="true" style={{...styles.shiftCard, ...styles.pastelPink, padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.5rem', cursor: 'move'}}>
                <div className="font-medium">Mike T.</div>
                <div className="text-xs">12:00 PM - 8:00 PM</div>
              </div>
              <div className="shift-card draggable" draggable="true" style={{...styles.shiftCard, ...styles.pastelPurple, padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '0.5rem', cursor: 'move'}}>
                <div className="font-medium">Emma L.</div>
                <div className="text-xs">10:00 AM - 6:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      <div 
        id="addEmployeeModal" 
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition ${isAddEmployeeModalOpen ? 'opacity-100' : 'opacity-0 invisible'}`}
        style={styles.modal}
      >
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Add New Employee</h3>
            <button 
              id="closeAddEmployeeModal" 
              className="text-gray-400 hover:text-white"
              onClick={() => setIsAddEmployeeModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <form id="addEmployeeForm" onSubmit={handleAddEmployeeSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input type="email" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Position</label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="">Select Position</option>
                <option value="cashier">Cashier</option>
                <option value="manager">Manager</option>
                <option value="barista">Barista</option>
                <option value="cook">Cook</option>
                <option value="server">Server</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Employment Type</label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="employmentType" value="full-time" className="text-blue-500" defaultChecked />
                  <span className="ml-2">Full-time</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="employmentType" value="part-time" className="text-blue-500" />
                  <span className="ml-2">Part-time</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                id="cancelAddEmployee" 
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                onClick={() => setIsAddEmployeeModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition">
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Team Members Modal */}
      <div 
        id="teamModal" 
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition ${isTeamModalOpen ? 'opacity-100' : 'opacity-0 invisible'}`}
        style={styles.modal}
      >
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-6 mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Team Members (12)</h3>
            <button 
              id="closeTeamModal" 
              className="text-gray-400 hover:text-white"
              onClick={() => setIsTeamModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Employee Cards */}
            {['John Doe', 'Sarah Miller', 'Mike Taylor', 'Emma Lee', 'Alex Kim', 'Robert Johnson'].map((name, index) => {
              const initials = name.split(' ').map(n => n[0]).join('');
              const role = ['Manager', 'Cashier', 'Barista', 'Cook', 'Server', 'Manager'][index];
              const type = index % 2 === 0 ? 'Full-time' : 'Part-time';
              const days = [
                'Mon, Wed, Fri', 
                'Tue, Thu, Sat', 
                'Mon, Fri', 
                'Tue, Thu, Sat', 
                'Wed, Sun', 
                'Sat, Sun'
              ][index];
              const hours = [
                '8AM-4PM', 
                '9AM-5PM', 
                '12PM-8PM', 
                '10AM-6PM', 
                '7AM-3PM', 
                '9AM-5PM'
              ][index];
              const colors = ['blue', 'green', 'pink', 'purple', 'yellow', 'red'];
              
              return (
                <div 
                  key={index}
                  className="team-member-card bg-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer" 
                  data-employee-id={index + 1}
                  onClick={() => setIsEditEmployeeModalOpen(true)}
                >
                  <div className="flex items-center mb-3">
                    <div className={`w-10 h-10 rounded-full bg-${colors[index]}-500 flex items-center justify-center text-white font-medium mr-3`}>
                      {initials}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{name}</div>
                      <div className="text-sm text-gray-400">{role} - {type}</div>
                    </div>
                    <button 
                      className="edit-employee-btn text-gray-400 hover:text-blue-400 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditEmployeeModalOpen(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={`bg-${colors[index]}-900 bg-opacity-50 px-2 py-1 rounded`}>{days}</span>
                    <span className="text-gray-400">{hours}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-end">
            <button 
              id="addEmployeeFromTeamBtn" 
              className="flex items-center bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition"
              onClick={() => {
                setIsAddEmployeeModalOpen(true);
                setIsTeamModalOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Employee Modal */}
      <div 
        id="editEmployeeModal" 
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition ${isEditEmployeeModalOpen ? 'opacity-100' : 'opacity-0 invisible'}`}
        style={styles.modal}
      >
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Edit Employee Schedule</h3>
            <button 
              id="closeEditEmployeeModal" 
              className="text-gray-400 hover:text-white"
              onClick={() => setIsEditEmployeeModalOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-xl mr-4">JD</div>
            <div>
              <div className="font-bold text-lg">John Doe</div>
              <div className="text-gray-400">Manager - Full-time</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Current Schedule</h4>
            <div className="grid grid-cols-7 gap-1 bg-gray-700 rounded-lg p-1">
              <div className="bg-gray-800 p-2 text-center text-sm">Sun</div>
              <div className="bg-gray-800 p-2 text-center text-sm">Mon</div>
              <div className="bg-gray-800 p-2 text-center text-sm">Tue</div>
              <div className="bg-gray-800 p-2 text-center text-sm">Wed</div>
              <div className="bg-gray-800 p-2 text-center text-sm">Thu</div>
              <div className="bg-gray-800 p-2 text-center text-sm">Fri</div>
              <div className="bg-gray-800 p-2 text-center text-sm">Sat</div>
              
              <div className="bg-gray-800 p-3 text-center">
                <div className="text-xs bg-blue-500 bg-opacity-20 text-blue-300 p-1 rounded">8AM-4PM</div>
              </div>
              <div className="bg-gray-800 p-3 text-center">
                <div className="text-xs">OFF</div>
              </div>
              <div className="bg-gray-800 p-3 text-center">
                <div className="text-xs bg-blue-500 bg-opacity-20 text-blue-300 p-1 rounded">8AM-4PM</div>
              </div>
              <div className="bg-gray-800 p-3 text-center">
                <div className="text-xs">OFF</div>
              </div>
              <div className="bg-gray-800 p-3 text-center">
                <div className="text-xs bg-blue-500 bg-opacity-20 text-blue-300 p-1 rounded">8AM-4PM</div>
              </div>
              <div className="bg-gray-800 p-3 text-center">
                <div className="text-xs">OFF</div>
              </div>
              <div className="bg-gray-800 p-3 text-center">
                <div className="text-xs bg-blue-500 bg-opacity-20 text-blue-300 p-1 rounded">8AM-4PM</div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Add/Edit Shift</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Day</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Start Time</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="8:00">8:00 AM</option>
                  <option value="9:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">End Time</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition">
              <FontAwesomeIcon icon={faBan} className="mr-2" /> Day Off
            </button>
            
            <div className="flex space-x-3">
              <button 
                type="button" 
                id="cancelEditEmployee" 
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                onClick={() => setIsEditEmployeeModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
                onClick={() => setIsEditEmployeeModalOpen(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
