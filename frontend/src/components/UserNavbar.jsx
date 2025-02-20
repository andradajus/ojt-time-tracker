import { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { TbCurrencyPeso } from "react-icons/tb";
import { BsListTask } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const NavbarConstants = [
    {
      id: 1,
      icon: MdDashboard,
      name: 'Dashboard',
      link: '/dashboard'
    },
    {
      id: 2,
      icon: TbCurrencyPeso,
      name: 'Payments',
      link: '/dashboard/payments'
    },
    {
      id: 3,
      icon: BsListTask,
      name: 'Tasks',
      link: '/dashboard/tasks'
    },
  ];

  const handleLogout = () => {
    // Remove the Authorization cookie
    document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Navigate to the root path
    navigate('/');
    console.log('User logged out');
  };

  return (
    <div className="bg-gray-200 flex w-full justify-between p-5 border-t-4 border-red-500 shadow-b-xl">
      <span className="font-bold text-lg">Justin&lsquo;s Team Tracker</span>
      <div className="flex gap-10">
        {NavbarConstants.map((item) => (
          <span 
            key={item.id} 
            className="flex gap-1 items-center hover:underline cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            <item.icon />
            <span>{item.name}</span>
          </span>
        ))}
      </div>
      <div className="relative">
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

export default UserNavbar;