import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import fingerprintImage from '../../assets/fingerprint.jpg'; // Update the import path accordingly
import gsap from 'gsap';

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [userId, setUserId] = useState("");

  const handleGetFingerPrint = async () => {
    try {
      await axios.get('https://admin-pp.onrender.com/getFingerprintData').then((response) => {
        console.log(response.data);
        setUserId(response.data.data);
      }).catch((error) => {
        console.error("Error fetching fingerprint data:", error);
      });
    } catch (error) {
      console.error("Error fetching fingerprint data:", error);
    }
  };

  useEffect(() => {
    handleGetFingerPrint();
    // Animation for fingerprint image
    gsap.fromTo(
      '.fingerprint-image',
      { opacity: 0, scale: 0.8 }, // Start state
      {
        opacity: 1,
        scale: 1, // End state
        duration: 1.5,
        ease: 'power2.out',
      }
    );
  }, []);

  const handleLogin = (id) => {
    navigate(`/dashboard/${id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <div className="flex items-center justify-center mb-4">
          {/* Fingerprint Image */}
          <img 
            src={fingerprintImage} 
            alt="Fingerprint" 
            className="w-24 h-24 fingerprint-image border-4 border-gray-300 rounded-full" 
          />
        </div>
        <button
          onClick={() => handleLogin(userId)}
          disabled={!userId}
          className="bg-blue-500 text-white rounded-md py-2 w-full mt-6 hover:bg-blue-600 transition duration-200"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
