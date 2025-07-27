import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { resetPasswordWithToken } from  '../Utils/ApiFunctions'

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
   // assuming token is passed in URL as /reset-password/:token
 const location=useLocation()
 const[passwordToken,setPasswordToken]=useState()
 useEffect(()=>{
 
       const query=new URLSearchParams(location.search)
       setPasswordToken(query.get("passwordToken"))

 },[location])
  const handleReset = async () => {
    
    if (!password) {
      alert('Please enter a new password.'+passwordToken);
      return;
    }

    try {
      const success = await resetPasswordWithToken(passwordToken, password);

      if (success) {
        alert('Password reset successful.');
        navigate('/login');
      } else {
        alert('Error in resetting password. Please try again.');
      }
    } catch (err) {
      console.log(err)
      alert(err.message || 'An unexpected error occurred.');
       navigate("/forget-password")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
