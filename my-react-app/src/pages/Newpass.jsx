import React from 'react';
import { useState } from 'react';
import InputField from '../components/InputField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NewPassword() {


    const navigate = useNavigate()
    const { uid, token } = useParams();
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errors, setErrors] = useState({})
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    const apiBase = import.meta.env.VITE_API_URL;;

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const newErrors = {}

        if (!password)
        { 
        newErrors.password = "Password is required"
        }
        else if (!strongPassword.test(password)) 
        {
        newErrors.password = "Password must be 8+ chars, include upper/lowercase and a number"
        }
        
        if (password !== password2) {
            newErrors.password2 = "Password2 do not match Password1";
          }
    
       setErrors(newErrors)

       if (Object.keys(newErrors).length > 0) return 

    try {

        const response = await axios.post(`${apiBase}/reset/${uid}/${token}/`, {
            new_password : password
        })

        alert("Password has been reset!")
        // Return to login page
        navigate('/');


    }catch (error){
        if (error.response && error.response.data) {
            // Show message from backend if available
            const errorData = error.response.data.data;
            const errorList = Object.values(errorData);
            const backendMessage = errorList.join("\n");
            alert(backendMessage);
          } else {
            alert("Something went wrong. Please try again.");
          }

    }

    }

    return (
  
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} noValidate className="bg-white p-6 rounded-2xl shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">Reset Password Form</h2>

            <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}error={errors.password} />
    
            <InputField label="Confirm Password" type="password" value={password2} onChange={e => setPassword2(e.target.value)}error={errors.password2} />

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600">
            Reset Password
            </button>

        </form>
        </div>

       
    )

}