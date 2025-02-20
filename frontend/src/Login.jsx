import { useState } from "react"
import { MdErrorOutline } from "react-icons/md";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: null,
    password: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: null
    })
  }

  const validateForm = () => {
    let emailError = null
    let passwordError = null

    if (!formData.email) {
      emailError = 'Email is required'
    }

    if (!formData.password) {
      passwordError = 'Password is required'
    }

    setErrors({
      email: emailError,
      password: passwordError
    })

    if (emailError || passwordError) {
      return false
    }

    return true
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    } else {
      console.log('Form is valid')
    }
  }


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

            <button 
              className="font-semibold text-lg bg-red-500 p-2 mt-2 cursor-pointer hover:bg-red-700 ease-in-out transition rounded-md hover:underline"
            >
              LOGIN
            </button>
          </form> 
        </div>
      </div>
    </>
  )
}

export default Login
