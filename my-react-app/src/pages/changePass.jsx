import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import InputField from '../components/InputField';
import axios from 'axios';
import axiosInstance from '../utils/Tokenchecker.js';

export default function ChangePass() {

    const navigate = useNavigate();
    const [oldpassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errors, setErrors] = useState({})
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const newErrors = {};

        if (!oldpassword) newErrors.oldpassword = "Old Password is required";
        
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
        
            setErrors(newErrors);

            if (Object.keys(newErrors).length > 0) return
        
            try{
                const response = await axiosInstance.post(`/accounts/change-password/`, {
                    old_password : oldpassword,
                    new_password : password,
                    confirm_password : password2,
                } )

                alert("Password changed successfully!");
                setOldPassword('');
                setPassword('');
                setPassword2('');
            }
            catch (error){

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
    return(

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} noValidate className="bg-white p-6 rounded-2xl shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>

            <InputField label="Old Password" type="password" value={oldpassword} onChange={e => setOldPassword(e.target.value)}error={errors.oldpassword} />

            <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}error={errors.password} />
    
            <InputField label="Confirm Password" type="password" value={password2} onChange={e => setPassword2(e.target.value)}error={errors.password2} />


            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600">
            Change Password
            </button>

        <button
        onClick={() => navigate(-1)}
        className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 mt-2 mr-4">
        Go Back
        </button>
        </form>


        </div>


        
    )
}