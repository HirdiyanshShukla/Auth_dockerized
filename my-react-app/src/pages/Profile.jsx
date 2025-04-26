import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/Tokenchecker.js';
import { useNavigate } from 'react-router-dom';


export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL;;
  

  useEffect(() => {
    const fetchProfile = async () => {

      try {
        const response = await axiosInstance.get('/accounts/profile/');

        setProfile(response.data);
      } catch (err) {
        console.error("API error:", err);
        setError("Failed to load profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="space-y-2">
                <p><strong>ID:</strong> {profile.data.id}</p>
                <p><strong>Email:</strong> {profile.data.email}</p>
                <p><strong>Name:</strong> {profile.data.name}</p>
            </div>

          <button onClick={()=>{
            navigate('/Change-password')
          } }
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            ChangePassword
          </button>
          
  </div>
  );
}
