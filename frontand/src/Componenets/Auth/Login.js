import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { loginUser } from "../Utils/ApiFunctions" // update with actual path
import AuthProvider, { AuthContext } from "./AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const {handleLogin}=useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      alert(token)
      handleLogin(token)

      navigate("/");
      window.location.reload();
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={login.email}
          onChange={handleInput}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={login.password}
          onChange={handleInput}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Click here to register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
