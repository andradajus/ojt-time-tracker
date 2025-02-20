import { useState } from 'react';
import propTypes from 'prop-types';
import AdminTabProfile from './AdminTabProfile';
import AdminTabPayment from './AdminTabPayment';
import AdminTabTasks from './AdminTabTasks';

const UserDetail = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('Profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <AdminTabProfile user={user} />;
      case 'Payment':
        return <AdminTabPayment user={user} />;
      case 'Tasks':
        return <AdminTabTasks user={user}/>;
      default:
        return null;
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold">User Details</h2>
        <button 
          className="cursor-pointer hover:underline duration-300 ease-in-out"
          onClick={onClose}
        >
          Back
        </button>
      </div>
      <div className="mb-5">
        <button
          className={`cursor-pointer px-4 py-2 ${activeTab === 'Profile' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Profile')}
        >
          Profile
        </button>
        <button
          className={`cursor-pointer px-4 py-2 ${activeTab === 'Payment' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Payment')}
        >
          Payment
        </button>
        <button
          className={`cursor-pointer px-4 py-2 ${activeTab === 'Tasks' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Tasks')}
        >
          Tasks
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};

UserDetail.propTypes = {
  user: propTypes.object.isRequired,
  onClose: propTypes.func.isRequired,
};

export default UserDetail;