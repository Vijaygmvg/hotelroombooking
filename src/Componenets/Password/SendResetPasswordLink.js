import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { resetPassword } from '../Utils/ApiFunctions';

export default function SendResetPasswordLink() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await resetPassword(email)

      if (response) {
        alert("Email sent successfully. Please check your inbox.");
        navigate('/login');
      }
    } catch (error) {
      console.log(error)
     // alert(error.message)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};


