import { useState } from 'react'
import InputField from '../components/InputField'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL;;

  const handleSubmit = async (e) => {
    e.preventDefault()
    

    const newErrors = {}
    if (!email) newErrors.email = "Email is required"
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Enter a valid email address"
    }

    if (!password){ 
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    try {
      const response = await axios.post(`${apiBase}/login/`, {
        email,
        password,
      }
      );
  
      // Success: store token and clear fields
      localStorage.setItem('access_token', response.data.data.token.access);
      localStorage.setItem('refresh_token', response.data.data.token.refresh);

      alert(`Welcome back, ${response.data.data.message}`)
      setEmail('');
      setPassword('');
      navigate('userprofile');
    } catch (error) {
      if (error.response && error.response.data) {
        // Show message from backend if available
        const backendMessage = error.response.data.data.error || "Null response from server";
        alert(backendMessage);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} noValidate className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>


        <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} error={errors.email}/>

        <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} error={errors.password}/>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600">
          Login
        </button>
        <p className="mt-3 text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>

        <p className="mt-3 text-sm text-center">
          Forgot Password? <Link to="/password-reset" className="text-blue-500 hover:underline">generate link</Link>
        </p>
      </form>
    </div>
  )
}




// {
//     "success": false,
//     "data": {
//         "error": "Invalid credentials"
//     },
//     "message": "An error occurred"
// }


// {
//     "success": true,
//     "data": {
//         "token": {
//             "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NDUyMjU5MiwiaWF0IjoxNzQ0NDM2MTkyLCJqdGkiOiI4ZWJmODk1ZGJlMTg0NWZjYTBlYjEzZWYyMGQ5YjFlYSIsInVzZXJfaWQiOjZ9.wwtNKWeyBq4fkJQEBjFV7gfOGoth9-cizwltNGlswV4",
//             "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0NDM3MzkyLCJpYXQiOjE3NDQ0MzYxOTIsImp0aSI6ImE5NDY2Y2NmZTA4MjRkNjY5ODg5ZTNmMjEwNjQzOTU4IiwidXNlcl9pZCI6Nn0.BkDZZGiFvk_X3hhcEwvVhQRoGfepUtBWB_qTcDC7vfA"
//         },
//         "message": "Login successful"
//     },
//     "message": "Request was successful"
// }