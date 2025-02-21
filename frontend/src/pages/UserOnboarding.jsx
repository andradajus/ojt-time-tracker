import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { MdErrorOutline } from "react-icons/md";
import { API } from "../api/api";

const UserOnboarding = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    preferred_name: '',
    contact_number: '',
    emergency_contact_name: '',
    emergency_contact_number: '',
    role: '',
    password: '',
    is_paid: false,
    payment_profile: {
      mode_of_payment: '',
      bank_or_wallet_name: '',
      account_name: '',
      account_number: '',
      first_monthly_payment: '',
      second_monthly_payment: '',
      monthly_payment: ''
    }
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        middle_name: user.middle_name || '',
        last_name: user.last_name || '',
        preferred_name: user.preferred_name || '',
        contact_number: user.contact_number || '',
        emergency_contact_name: user.emergency_contact_name || '',
        emergency_contact_number: user.emergency_contact_number || '',
        role: user.role || '',
        password: '',
        is_paid: user.is_paid || false,
        payment_profile: {
          mode_of_payment: user.payment_profile?.mode_of_payment || '',
          bank_or_wallet_name: user.payment_profile?.bank_or_wallet_name || '',
          account_name: user.payment_profile?.account_name || '',
          account_number: user.payment_profile?.account_number || '',
          first_monthly_payment: user.payment_profile?.first_monthly_payment || '',
          second_monthly_payment: user.payment_profile?.second_monthly_payment || '',
          monthly_payment: user.payment_profile?.monthly_payment || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.payment_profile) {
      setFormData({
        ...formData,
        payment_profile: {
          ...formData.payment_profile,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    setErrors({
      ...errors,
      [name]: null
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.preferred_name) newErrors.preferred_name = 'Preferred name is required';
    if (!formData.contact_number) newErrors.contact_number = 'Contact number is required';
    if (!formData.emergency_contact_name) newErrors.emergency_contact_name = 'Emergency contact name is required';
    if (!formData.emergency_contact_number) newErrors.emergency_contact_number = 'Emergency contact number is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (formData.password.toLowerCase() === 'password') {
      newErrors.password = 'Password cannot be "password"';
    }

    if (formData.is_paid) {
      if (!formData.payment_profile.mode_of_payment) newErrors.mode_of_payment = 'Mode of payment is required';
      if (!formData.payment_profile.bank_or_wallet_name) newErrors.bank_or_wallet_name = 'Bank or wallet name is required';
      if (!formData.payment_profile.account_name) newErrors.account_name = 'Account name is required';
      if (!formData.payment_profile.account_number) newErrors.account_number = 'Account number is required';
      if (!formData.payment_profile.first_monthly_payment) newErrors.first_monthly_payment = 'First monthly payment is required';
      if (!formData.payment_profile.second_monthly_payment) newErrors.second_monthly_payment = 'Second monthly payment is required';
      if (!formData.payment_profile.monthly_payment) newErrors.monthly_payment = 'Monthly payment is required';

      const firstPayment = parseInt(formData.payment_profile.first_monthly_payment, 10);
      const secondPayment = parseInt(formData.payment_profile.second_monthly_payment, 10);

      if (secondPayment - firstPayment < 15) {
        newErrors.second_monthly_payment = 'There must be at least 15 days between the first and second monthly payments';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await API.updateUser({ user: formData });
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors({
          ...errors,
          general: error.response.data.errors.join(', ')
        });
      } else {
        setErrors({
          ...errors,
          general: 'An unexpected error occurred. Please try again.'
        });
      }
      console.log(error);
    }
  };

  return (
    <div className="flex w-screen justify-center items-center">
      <div className="flex flex-col bg-gray-300 p-5 rounded-md">
        <h1 className="text-4xl font-semibold text-center mb-2">User Onboarding</h1>
        <p className="text-center mb-4">Email: {user.email}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 overflow-auto">
          <div className="flex flex-col">
            <input
              value={formData.first_name}
              name="first_name"
              type="text"
              placeholder="First Name"
              className="border p-2 min-w-md bg-white rounded-sm"
              onChange={handleChange}
            />
            {errors.first_name && (
              <div className="flex gap-2 items-center text-red-500">
                <MdErrorOutline />
                <span>{errors.first_name}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <input
              value={formData.middle_name}
              name="middle_name"
              type="text"
              placeholder="Middle Name"
              className="border p-2 min-w-md bg-white rounded-sm"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <input
              value={formData.last_name}
              name="last_name"
              type="text"
              placeholder="Last Name"
              className="border p-2 min-w-md bg-white rounded-sm"
              onChange={handleChange}
            />
            {errors.last_name && (
              <div className="flex gap-2 items-center text-red-500">
                <MdErrorOutline />
                <span>{errors.last_name}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <input
              value={formData.preferred_name}
              name="preferred_name"
              type="text"
              placeholder="Preferred Name"
              className="border p-2 min-w-md bg-white rounded-sm"
              onChange={handleChange}
            />
            {errors.preferred_name && (
              <div className="flex gap-2 items-center text-red-500">
                <MdErrorOutline />
                <span>{errors.preferred_name}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <input
              value={formData.contact_number}
              name="contact_number"
              type="text"
              placeholder="Contact Number"
              className="border p-2 min-w-md bg-white rounded-sm"
              onChange={handleChange}
            />
            {errors.contact_number && (
              <div className="flex gap-2 items-center text-red-500">
                <MdErrorOutline />
                <span>{errors.contact_number}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <input
              value={formData.emergency_contact_name}
              name="emergency_contact_name"
              type="text"
              placeholder="Emergency Contact Name"
              className="border p-2 min-w-md bg-white rounded-sm"
              onChange={handleChange}
            />
            {errors.emergency_contact_name && (
              <div className="flex gap-2 items-center text-red-500">
                <MdErrorOutline />
                <span>{errors.emergency_contact_name}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <input
              value={formData.emergency_contact_number}
              name="emergency_contact_number"
              type="text"
              placeholder="Emergency Contact Number"
              className="border p-2 min-w-md bg-white rounded-sm"
              onChange={handleChange}
            />
            {errors.emergency_contact_number && (
              <div className="flex gap-2 items-center text-red-500">
                <MdErrorOutline />
                <span>{errors.emergency_contact_number}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <select
              value={formData.role}
              name="role"
              className="border p-2 min-w-md bg-white rounded-sm"
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="OJT - Developer">OJT - Developer</option>
              <option value="OJT - QA/BA">OJT - QA/BA</option>
              <option value="Others">Others</option>
            </select>
            {errors.role && (
              <div className="flex gap-2 items-center text-red-500">
                <MdErrorOutline />
                <span>{errors.role}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <input
              value={formData.password}
              name="password"
              type="password"
              placeholder="Password"
              className="border p-2 min-w-md bg-white rounded-sm"
              onChange={handleChange}
            />
            {errors.password && (
              <div className="flex gap-2 items-center text-red-500">
                <MdErrorOutline />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          {formData.is_paid && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-2">Payment Details</h2>

              <div className="flex justify-around">
                <div className="flex flex-col">
                  <input
                    value={formData.payment_profile.first_monthly_payment}
                    name="first_monthly_payment"
                    type="number"
                    placeholder="First Monthly Payment"
                    className="border p-2 min-w-md bg-white rounded-sm"
                    onChange={handleChange}
                  />
                  {errors.first_monthly_payment && (
                    <div className="flex gap-2 items-center text-red-500">
                      <MdErrorOutline />
                      <span>{errors.first_monthly_payment}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    value={formData.payment_profile.second_monthly_payment}
                    name="second_monthly_payment"
                    type="number"
                    placeholder="Second Monthly Payment"
                    className="border p-2 min-w-md bg-white rounded-sm"
                    onChange={handleChange}
                  />
                  {errors.second_monthly_payment && (
                    <div className="flex gap-2 items-center text-red-500">
                      <MdErrorOutline />
                      <span>{errors.second_monthly_payment}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <input
                  value={formData.payment_profile.monthly_payment}
                  name="monthly_payment"
                  type="number"
                  placeholder="Monthly Payment"
                  className="border p-2 min-w-md bg-white rounded-sm"
                  onChange={handleChange}
                />
                {errors.monthly_payment && (
                  <div className="flex gap-2 items-center text-red-500">
                    <MdErrorOutline />
                    <span>{errors.monthly_payment}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <select
                  value={formData.payment_profile.mode_of_payment}
                  name="mode_of_payment"
                  className="border p-2 min-w-md bg-white rounded-sm"
                  onChange={handleChange}
                >
                  <option value="">Select Mode of Payment</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="E-Wallet">E-Wallet</option>
                </select>
                {errors.mode_of_payment && (
                  <div className="flex gap-2 items-center text-red-500">
                    <MdErrorOutline />
                    <span>{errors.mode_of_payment}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  value={formData.payment_profile.bank_or_wallet_name}
                  name="bank_or_wallet_name"
                  type="text"
                  placeholder="Bank or Wallet Name"
                  className="border p-2 min-w-md bg-white rounded-sm"
                  onChange={handleChange}
                />
                {errors.bank_or_wallet_name && (
                  <div className="flex gap-2 items-center text-red-500">
                    <MdErrorOutline />
                    <span>{errors.bank_or_wallet_name}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  value={formData.payment_profile.account_name}
                  name="account_name"
                  type="text"
                  placeholder="Account Name"
                  className="border p-2 min-w-md bg-white rounded-sm"
                  onChange={handleChange}
                />
                {errors.account_name && (
                  <div className="flex gap-2 items-center text-red-500">
                    <MdErrorOutline />
                    <span>{errors.account_name}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  value={formData.payment_profile.account_number}
                  name="account_number"
                  type="text"
                  placeholder="Account Number"
                  className="border p-2 min-w-md bg-white rounded-sm"
                  onChange={handleChange}
                />
                {errors.account_number && (
                  <div className="flex gap-2 items-center text-red-500">
                    <MdErrorOutline />
                    <span>{errors.account_number}</span>
                  </div>
                )}
              </div>
            </>
          )}

          {errors.general && (
            <div className="flex gap-2 items-center text-red-500">
              <MdErrorOutline />
              <span>{errors.general}</span>
            </div>
          )}

          <button
            className="font-semibold text-lg bg-blue-500 p-2 mt-2 cursor-pointer hover:bg-blue-700 ease-in-out transition rounded-md hover:underline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserOnboarding;