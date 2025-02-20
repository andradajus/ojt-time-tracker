import { useState } from 'react';
import { MdErrorOutline } from "react-icons/md";

const UserTasks = () => {
  const [tasks, setTasks] = useState([
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

  const [newTask, setNewTask] = useState({
    storyDetail: '',
    ticketNumber: '',
    storyPoint: '',
    status: '',
    dateFinished: '',
  });

  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newTask.storyDetail) newErrors.storyDetail = 'Story Detail is required';
    if (!newTask.ticketNumber) {
      newErrors.ticketNumber = 'Ticket Number is required';
    } else if (!/^QAOMS-.+/.test(newTask.ticketNumber)) {
      newErrors.ticketNumber = 'Ticket Number must be in the format QAOMS-<Story details here>';
    }
    if (!newTask.storyPoint) newErrors.storyPoint = 'Story Point is required';
    if (!newTask.status) newErrors.status = 'Status is required';
    if (newTask.status === 'Completed' && !newTask.dateFinished) newErrors.dateFinished = 'Date Finished is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTask = () => {
    if (validateForm()) {
      setTasks([...tasks, newTask]);
      setNewTask({
        storyDetail: '',
        ticketNumber: '',
        storyPoint: '',
        status: '',
        dateFinished: '',
      });
      setErrors({});
    }
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setNewTask(tasks[index]);
  };

  const handleSaveTask = () => {
    if (validateForm()) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
      setNewTask({
        storyDetail: '',
        ticketNumber: '',
        storyPoint: '',
        status: '',
        dateFinished: '',
      });
      setErrors({});
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const totalHoursRendered = tasks.reduce((total, task) => total + task.storyPoint * 2, 0);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5 h-full ">
        <h1 className="flex text-2xl font-bold">User Tasks</h1>
        <div className="text-right">
          <p className="text-lg font-bold">Total Hours Rendered: {totalHoursRendered} hours</p>
          <p className="text-sm text-gray-600">1 Story Point = 2 Hours</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {/* Tasks Table */}
        <div className="col-span-3">
          <table className="min-w-full bg-white mb-5">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Story Detail</th>
                <th className="py-2 px-4 border-b text-left">Ticket Number</th>
                <th className="py-2 px-4 border-b text-left">Story Point</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Date Finished</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    {editIndex === index ? (
                      <textarea
                        name="storyDetail"
                        value={newTask.storyDetail}
                        onChange={handleInputChange}
                        className="px-2 p-1 border rounded w-full"
                      />
                    ) : (
                      task.storyDetail
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="ticketNumber"
                        value={newTask.ticketNumber}
                        onChange={handleInputChange}
                        className="px-2 p-1 border rounded w-full"
                      />
                    ) : (
                      task.ticketNumber
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editIndex === index ? (
                      <input
                        type="number"
                        name="storyPoint"
                        value={newTask.storyPoint}
                        onChange={handleInputChange}
                        className="px-2 p-1 border rounded w-full"
                      />
                    ) : (
                      task.storyPoint
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editIndex === index ? (
                      <select
                        name="status"
                        value={newTask.status}
                        onChange={handleInputChange}
                        className="px-2 p-1 border rounded w-full"
                      >
                        <option value="">Select Status</option>
                        <option value="Done">Done</option>
                        <option value="In Progress">In Progress</option>
                      </select>
                    ) : (
                      task.status
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editIndex === index ? (
                      <input
                        type="date"
                        name="dateFinished"
                        value={newTask.dateFinished}
                        onChange={handleInputChange}
                        className="px-2 p-1 border rounded w-full"
                      />
                    ) : (
                      task.dateFinished
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {editIndex === index ? (
                      <button
                        onClick={handleSaveTask}
                        className="text-xs bg-green-500 text-white py-1 px-2 rounded w-full cursor-pointer hover:underline duration-300 ease-in-out"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditTask(index)}
                        className="text-xs bg-yellow-500 text-white py-1 px-2 rounded mr-2 w-full cursor-pointer hover:underline duration-300 ease-in-out"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="text-xs bg-red-500 text-white py-1 px-2 rounded w-full cursor-pointer hover:underline duration-300 ease-in-out"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Task Form */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-3">{editIndex === null ? 'Add New Task' : 'Edit Task'}</h2>
          <div className="grid grid-cols-1 gap-4 mb-5">
            <div>
              <textarea
                name="storyDetail"
                value={newTask.storyDetail}
                onChange={handleInputChange}
                placeholder="Story Detail"
                className="px-2 p-1 border rounded w-full"
              />
              {errors.storyDetail && (
                <div className="text-red-500 text-sm flex items-center mt-1">
                  <MdErrorOutline className="mr-1" /> {errors.storyDetail}
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="ticketNumber"
                value={newTask.ticketNumber}
                onChange={handleInputChange}
                placeholder="Ticket Number"
                className="px-2 p-1 border rounded w-full"
              />
              {errors.ticketNumber && (
                <div className="text-red-500 text-sm flex items-center mt-1">
                  <MdErrorOutline className="mr-1" /> {errors.ticketNumber}
                </div>
              )}
            </div>
            <div>
              <input
                type="number"
                name="storyPoint"
                value={newTask.storyPoint}
                onChange={handleInputChange}
                placeholder="Story Point"
                className="px-2 p-1 border rounded w-full"
              />
              {errors.storyPoint && (
                <div className="text-red-500 text-sm flex items-center mt-1">
                  <MdErrorOutline className="mr-1" /> {errors.storyPoint}
                </div>
              )}
            </div>
            <div>
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
                className="px-2 p-1 border rounded w-full"
              >
                <option value="">Select Status</option>
                <option value="Done">Done</option>
                <option value="In Progress">In Progress</option>
              </select>
              {errors.status && (
                <div className="text-red-500 text-sm flex items-center mt-1">
                  <MdErrorOutline className="mr-1" /> {errors.status}
                </div>
              )}
            </div>

            {newTask.status === 'Done' && (
              <div>
                <input
                  type="date"
                  name="dateFinished"
                  value={newTask.dateFinished}
                  onChange={handleInputChange}
                  placeholder="Date Finished"
                  className="px-2 p-1 border rounded w-full"
                />
                {errors.dateFinished && (
                  <div className="text-red-500 text-sm flex items-center mt-1">
                    <MdErrorOutline className="mr-1" /> {errors.dateFinished}
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            onClick={editIndex === null ? handleAddTask : handleSaveTask}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full cursor-pointer hover:underline ease-in-out duration-300"
          >
            {editIndex === null ? 'Add Task' : 'Update Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTasks;