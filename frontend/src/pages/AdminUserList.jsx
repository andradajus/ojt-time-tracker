import { useState, useEffect } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import UserDetail from './UserDetail';
import Modal from '../components/Modal';
import { API } from '../api/api';

const AdminUserList = () => {
  const [isViewing, setIsViewing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewing(true);
  };

  const handleClose = () => {
    setIsViewing(false);
    setSelectedUser(null);
  };

  const handleAddUser = async (email) => {
    try {
      await API.createUser(email);
      setIsModalOpen(false);
      getUsers();
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await API.getUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-5">
      {isViewing ? (
        <UserDetail user={selectedUser} onClose={handleClose} />
      ) : (
        <>
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
                <th className="py-2 px-4 border-b text-left">Paid</th>
                <th className="py-2 px-4 border-b text-left">View</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.last_name}, {user.first_name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">{user.is_active ? 'Active' : 'Inactive'}</td>
                  <td className="py-2 px-4 border-b">{user.is_paid ? 'Yes' : 'No'}</td>
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
        </>
      )}
    </div>
  );
};

export default AdminUserList;