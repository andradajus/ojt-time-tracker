import { useState } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import UserDetail from './UserDetail';
import Modal from '../components/Modal';

const AdminUserList = () => {
  const [isViewing, setIsViewing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Justin Marcus Andrada',
      email: 'justin@example.com',
      role: 'Admin',
      status: 'Active',
      type: 'OJT',
      paid: true,
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'User',
      status: 'Inactive',
      type: 'Others',
      paid: false,
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
      type: 'OJT',
      paid: true,
    },
  ]);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewing(true);
  };

  const handleClose = () => {
    setIsViewing(false);
    setSelectedUser(null);
  };

  const handleAddUser = (email) => {
    const newUser = {
      id: users.length + 1,
      name: 'New User',
      email,
      role: 'User',
      status: 'Active',
      type: 'OJT',
      paid: false,
      password: Math.random().toString(36).slice(-8), // Generate a random password
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
  };

  if (isViewing && selectedUser) {
    return <UserDetail user={selectedUser} onClose={handleClose} />;
  }

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-5">User List</h1>
        <button
            className="mb-5 bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:underline"
            onClick={() => setIsModalOpen(true)}
        >
            Add New User
        </button>
      </div>
      <table className="min-w-full bg-white mb-5">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Role</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Type</th>
            <th className="py-2 px-4 border-b text-left">Paid</th>
            <th className="py-2 px-4 border-b text-left">View</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.status}</td>
              <td className="py-2 px-4 border-b">{user.type}</td>
              <td className="py-2 px-4 border-b">{user.paid ? 'True' : 'False'}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  className="text-blue-500 hover:underline cursor-pointer duration-300"
                  onClick={() => handleView(user)}
                >
                  <MdOutlineRemoveRedEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export default AdminUserList;