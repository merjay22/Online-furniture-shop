import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = ({ onLogin, url }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            onLogin();
        }
    }, [onLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Remove leading zeros from mobile number
        const sanitizedMobileNumber = mobileNumber.replace(/^0+/, '');

        try {
            const response = await fetch(`${url}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobileNumber: sanitizedMobileNumber, password }),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('token', data.token);
                toast.success('Login successful!');
                onLogin();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Enter your mobile number"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
