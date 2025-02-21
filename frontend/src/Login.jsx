import { useState, useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { API } from "./api/api";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    general: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: null,
      general: null
    });
  };

  const validateForm = () => {
    let emailError = null;
    let passwordError = null;

    if (!formData.email) {
      emailError = 'Email is required';
    }

    if (!formData.password) {
      passwordError = 'Password is required';
    }

    setErrors({
      email: emailError,
      password: passwordError,
      general: null
    });

    if (emailError || passwordError) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await API.login({ user: formData });
      let token = response.headers['authorization'];
      if (token) {
        if (token.startsWith('Bearer ')) {
          token = token.slice(7);
        }
        Cookies.set('Authorization', token);
      }
      console.log(response);
      navigate('/dashboard');
    } catch (error) {
      if (error && error.errors) {
        setErrors({
          ...errors,
          general: error.errors.join(', ')
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

  useEffect(() => {
    const token = Cookies.get('Authorization');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <div className='flex w-screen justify-center items-center h-screen'>
        <div className='flex flex-col bg-gray-300 p-5 rounded-md'>
          <span>
            <h1 className="text-4xl font-semibold text-center mb-2">LOGIN</h1>
          </span>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col">
              <input
                value={formData.email}
                name="email"
                type="email"
                placeholder="Email"
                className="border p-2 min-w-md bg-white rounded-sm"
                onChange={handleChange}
              />
              {errors.email && (
                <div className="flex gap-2 items-center text-red-500">
                  <MdErrorOutline />
                  <span>{errors.email}</span>
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

            {errors.general && (
              <div className="flex gap-2 items-center text-red-500">
                <MdErrorOutline />
                <span>{errors.general}</span>
              </div>
            )}

            <button
              className="font-semibold text-lg bg-red-500 p-2 mt-2 cursor-pointer hover:bg-red-700 ease-in-out transition rounded-md hover:underline"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;