import { MdOutlineRemoveRedEye } from "react-icons/md";

const UserPayments = () => {
  const payments = [
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
  ];

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
          {payments.map((payment, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{payment.date}</td>
              <td className="py-2 px-4 border-b">{payment.amount || '-'}</td>
              <td className="py-2 px-4 border-b">{payment.bankName || '-'}</td>
              <td className="py-2 px-4 border-b">{payment.accountNumber || '-'}</td>
              <td className="py-2 px-4 border-b">{payment.status}</td>
              <td className="py-2 px-4 border-b">{payment.datePaid}</td>
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