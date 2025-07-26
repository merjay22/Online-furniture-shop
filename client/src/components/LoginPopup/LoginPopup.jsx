import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken, setUser } = useContext(StoreContext);

    const [data, setData] = useState({
        name: '',
        mobileNumber: '',
        password: '',
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/login`, {
                name: data.name,
                mobileNumber: data.mobileNumber,
                password: data.password,
            });

            if (response.data.success) {
                setToken(response.data.token);
                setUser(response.data.user); // Set user data
                localStorage.setItem('token', response.data.token);
                setShowLogin(false);
                toast.success('Login successful', { autoClose: 2500 });
            } else {
                toast.error(response.data.message, { autoClose: 2500 });
            }
        } catch (error) {
            console.error('Login error:', error);

            if (error.response) {
                toast.error(error.response.data.message || 'An error occurred. Please try again.', { autoClose: 2500 });
            } else if (error.request) {
                toast.error('No response from the server. Please try again later.', { autoClose: 2500 });
            } else {
                toast.error('An error occurred. Please try again.', { autoClose: 2500 });
            }
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>Login</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.close_icon} alt='' />
                </div>
                <div className='login-popup-input'>
                    <input
                        name='name'
                        onChange={onChangeHandler}
                        value={data.name}
                        type='text'
                        placeholder='Your Name'
                        required
                    />
                    <input
                        name='mobileNumber'
                        onChange={onChangeHandler}
                        value={data.mobileNumber}
                        type='text'
                        placeholder='Your Mobile Number'
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type='password'
                        placeholder='Your Password'
                        required
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default LoginPopup;
