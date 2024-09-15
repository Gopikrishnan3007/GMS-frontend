import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock } from 'react-icons/fa';

const UpdatePasswordComponent = () => {
    const [userName, setUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8006/portDirector/updatePassword', {
                userName,
                newPassword
            });

            if (response.data === 'Password updated successfully') {
                navigate('/dashboard'); // Redirect to the appropriate dashboard
            } else {
                setError('Failed to update password');
            }
        } catch (error) {
            setError('Error updating password');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Update Password</h2>
                {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{error}</div>}
                <form onSubmit={handleUpdatePassword}>
                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="userName"
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <div className="relative">
                            <FaLock className="absolute top-3 left-3 text-gray-500" />
                            <input
                                id="newPassword"
                                type="password"
                                className="mt-1 block w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordComponent;
