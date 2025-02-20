import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
    console.log('User logged out');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-200 flex w-full justify-between p-5 border-t-4 border-red-500 shadow-b-xl">
      <span className="font-bold text-lg">Justin&lsquo;s Team Tracker</span>
      <div className="relative" ref={dropdownRef}>
        <div 
          className="flex gap-1 font-semibold cursor-pointer hover:underline"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>Andrada,</span>
          <span>Justin Marcus</span>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
            <button 
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;