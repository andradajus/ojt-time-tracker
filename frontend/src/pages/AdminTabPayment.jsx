import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { API } from '../api/api';

const AdminTabPayment = ({ user }) => {
  const [payments, setPayments] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editPayment, setEditPayment] = useState({});
  const [newPaymentDate, setNewPaymentDate] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditPayment(payments[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditPayment({ ...editPayment, [name]: value });
  };

  const handleSave = async () => {
    try {
      await API.updatePayment(editPayment.id, {
        payment_schedule: {
          date: editPayment.date,
          amount: editPayment.amount,
          bank_name: editPayment.bank_name,
          account_number: editPayment.account_number,
          status: editPayment.status,
          date_paid: editPayment.date_paid,
        }
      });
      const updatedPayments = [...payments];
      updatedPayments[editIndex] = editPayment;
      setPayments(updatedPayments);
      setEditIndex(null);
      setEditPayment({});
      fetchCurrentPayments();
    } catch (error) {
      console.error('Failed to update payment:', error);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log('Uploaded file:', file);
  };

  const handleAddPayment = async () => {
    const newPayment = {
      date: newPaymentDate,
      amount: '',
      bank_name: '',
      account_number: '',
      status: 'Pending',
      date_paid: '-',
    };

    try {
      await API.createPayment({
        user_id: user.id,
        payment_schedules: [newPayment]
      });
      setPayments([...payments, newPayment]);
      setNewPaymentDate('');
      fetchCurrentPayments();
    } catch (error) {
      console.error('Failed to create payment:', error);
    }
  };

  const fetchCurrentPayments = async () => {
    try {
      const response = await API.getPayments(user.id);
      setPayments(response.data);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    }
  };

  useEffect(() => {
    fetchCurrentPayments();
  }, []);

  console.log("payments", payments);
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Payment Schedule</h1>
      <div className="mb-5">
        <input
          type="date"
          value={newPaymentDate}
          onChange={(e) => setNewPaymentDate(e.target.value)}
          className="px-2 py-1 border rounded mr-2"
        />
        <button
          onClick={handleAddPayment}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Payment
        </button>
      </div>
      <table className="min-w-full bg-white mb-5">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Amount</th>
            <th className="py-2 px-4 border-b text-left">Bank Name</th>
            <th className="py-2 px-4 border-b text-left">Account Number</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Date Paid</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="date"
                      name="date"
                      value={editPayment.date}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      name="amount"
                      value={editPayment.amount}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="bank_name"
                      value={editPayment.bank_name}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="account_number"
                      value={editPayment.account_number}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      name="status"
                      value={editPayment.status}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded w-full"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="date"
                      name="date_paid"
                      value={editPayment.date_paid}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-2">
                      <button
                        className="text-green-500 hover:underline cursor-pointer duration-300"
                        onClick={handleSave}
                      >
                        <IoIosSave />
                      </button>
                      <label className="text-blue-500 hover:underline cursor-pointer duration-300">
                        <MdOutlineFileUpload />
                        <input
                          type="file"
                          onChange={handleUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-b">{payment.date}</td>
                  <td className="py-2 px-4 border-b">{payment.amount || '-'}</td>
                  <td className="py-2 px-4 border-b">{payment.bank_name || '-'}</td>
                  <td className="py-2 px-4 border-b">{payment.account_number || '-'}</td>
                  <td className="py-2 px-4 border-b">{payment.status}</td>
                  <td className="py-2 px-4 border-b">{payment.date_paid}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-2">
                      {payment.status !== 'Pending' && (
                        <button className="text-blue-500 hover:underline cursor-pointer duration-300">
                          <MdOutlineRemoveRedEye />
                        </button>
                      )}
                      <button
                        className="text-green-500 hover:underline cursor-pointer duration-300"
                        onClick={() => handleEdit(index)}
                      >
                        <MdEdit />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

AdminTabPayment.propTypes = {
  user: propTypes.object.isRequired,
};

export default AdminTabPayment;