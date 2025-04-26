import React from 'react';
import { useState } from 'react';
import InputField from '../components/InputField';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PasswordReset() {

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState(null)
    const apiBase = import.meta.env.VITE_API_URL;;

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if (!email) setErrors("Email is required")
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        setErrors("Enter a valid email address")}
        else setErrors(null)
    
    if (errors) return

    try {

        const response = await axios.post(`${apiBase}/reset-password-link/`, {
            email
        })

        alert(`Password reset link sent to ${email}`)
        setEmail('')

    }catch (error){
        if (error.response && error.response.data) {
            // Show message from backend if available
            const backendMessage = error.response.data.data.email || "Unknown error";
            alert(backendMessage);
          }
           else {
            alert("Something went wrong. Please try again.");
          }

    }

    }

    return (
  
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} noValidate className="bg-white p-6 rounded-2xl shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">Login</h2>

            <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} error={errors}/>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600">
            Generate Link
            </button>


            <p className="mt-3 text-sm text-center">
            Yaad aa gaya? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
            </p>
        </form>
        </div>

       
    )

}