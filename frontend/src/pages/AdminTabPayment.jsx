import { useState } from 'react';
import propTypes from 'prop-types';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";

const AdminTabPayment = ({ user }) => {
  const [payments, setPayments] = useState([
    {
      date: '2025-02-15',
      amount: '',
      bankName: '',
      accountNumber: '',
      status: 'Pending',
      datePaid: '-',
    },
    {
      date: '2025-02-28',
      amount: '',
      bankName: '',
      accountNumber: '',
      status: 'Pending',
      datePaid: '-',
    },
    {
      date: '2025-02-19',
      amount: 100,
      bankName: 'Bank of America',
      accountNumber: '123456789',
      status: 'Completed',
      datePaid: '2025-02-20',
    },
    {
      date: '2025-02-18',
      amount: 200,
      bankName: 'Chase Bank',
      accountNumber: '987654321',
      status: 'Pending',
      datePaid: '-',
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editPayment, setEditPayment] = useState({});

  console.log("user", user);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditPayment(payments[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditPayment({ ...editPayment, [name]: value });
  };

  const handleSave = () => {
    const updatedPayments = [...payments];
    updatedPayments[editIndex] = editPayment;
    setPayments(updatedPayments);
    setEditIndex(null);
    setEditPayment({});
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    console.log('Uploaded file:', file);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Payment Schedule</h1>
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
          {payments.map((payment, index) => (
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
                      name="bankName"
                      value={editPayment.bankName}
                      onChange={handleInputChange}
                      className="px-2 py-1 border rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="accountNumber"
                      value={editPayment.accountNumber}
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
                      name="datePaid"
                      value={editPayment.datePaid}
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
                  <td className="py-2 px-4 border-b">{payment.bankName || '-'}</td>
                  <td className="py-2 px-4 border-b">{payment.accountNumber || '-'}</td>
                  <td className="py-2 px-4 border-b">{payment.status}</td>
                  <td className="py-2 px-4 border-b">{payment.datePaid}</td>
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