import propTypes from 'prop-types';
import { useState } from 'react';

const AdminTabTasks = ({ user }) => {
  const [tasks] = useState([
    {
      storyDetail: 'Implement login feature',
      ticketNumber: 'TCK-1234',
      storyPoint: 5,
      status: 'Completed',
      dateFinished: '2025-02-19',
    },
    {
      storyDetail: 'Fix bug in payment module',
      ticketNumber: 'TCK-5678',
      storyPoint: 3,
      status: 'In Progress',
      dateFinished: '-',
    },
  ]);

  const totalHoursRendered = tasks.reduce((total, task) => total + task.storyPoint * 2, 0);

  console.log("user", user);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5 h-full">
        <h1 className="flex text-2xl font-bold">User Tasks</h1>
        <div className="text-right">
          <p className="text-lg font-bold">Total Hours Rendered: {totalHoursRendered} hours</p>
          <p className="text-sm text-gray-600">1 Story Point = 2 Hours</p>
        </div>
      </div>

      <div className="gap-5">
        {/* Tasks Table */}
        <div className="">
          <table className="min-w-full bg-white mb-5">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Story Detail</th>
                <th className="py-2 px-4 border-b text-left">Ticket Number</th>
                <th className="py-2 px-4 border-b text-left">Story Point</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Date Finished</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{task.storyDetail}</td>
                  <td className="py-2 px-4 border-b">{task.ticketNumber}</td>
                  <td className="py-2 px-4 border-b">{task.storyPoint}</td>
                  <td className="py-2 px-4 border-b">{task.status}</td>
                  <td className="py-2 px-4 border-b">{task.dateFinished}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

AdminTabTasks.propTypes = {
  user: propTypes.object.isRequired,
};

export default AdminTabTasks;