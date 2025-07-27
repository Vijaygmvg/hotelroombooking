import React, { useState } from 'react';
import { registerUser } from '../Utils/ApiFunctions';

function Registration() {
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        setRegistration({ ...registration, [e.target.name]: e.target.value });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(registration);
            setSuccessMessage(response);
            setErrorMessage("");
            setRegistration({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            });
        } catch (err) {
            setErrorMessage(err.message || "Registration failed.");
            setSuccessMessage("");
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 4000);
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Register</h2>

            {successMessage && (
                <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleRegistration} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={registration.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={registration.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={registration.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={registration.password}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Registration;
