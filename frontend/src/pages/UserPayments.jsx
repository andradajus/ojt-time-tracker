import { useState, useEffect } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { API } from '../api/api';

const UserPayments = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await API.getPaymentsByCurrentUser();
      setPayments(response.data.payment_schedules);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

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
            <th className="py-2 px-4 border-b text-left">View</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{payment.date}</td>
              <td className="py-2 px-4 border-b">{payment.amount || '-'}</td>
              <td className="py-2 px-4 border-b">{payment.bank_name || '-'}</td>
              <td className="py-2 px-4 border-b">{payment.account_number || '-'}</td>
              <td className="py-2 px-4 border-b">{payment.status}</td>
              <td className="py-2 px-4 border-b">{payment.date_paid}</td>
              <td className="py-2 px-4 border-b">
                {payment.status !== 'Pending' && (
                  <button className="text-blue-500 hover:underline cursor-pointer duration-300">
                    <MdOutlineRemoveRedEye />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPayments;