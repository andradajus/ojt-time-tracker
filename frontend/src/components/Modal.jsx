import propTypes from 'prop-types';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-5">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="px-4 py-2 border rounded w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:underline duration-300 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:underline duration-300 cursor-pointer"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default Modal;