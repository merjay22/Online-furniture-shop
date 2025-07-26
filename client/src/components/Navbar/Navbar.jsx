import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { token, setToken, cartItems = {}, user } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleCartButtonClick = () => {
        navigate(`/cart`);
    };

    const handleOrderButtonClick = () => {
        navigate(`/myorder`);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const navigateHome = () => {
        navigate("/");
    };

    const cartHasItems = Object.values(cartItems).some(quantity => quantity > 0);

    return (
        <div className='navbar'>
            <img src={assets.logo} alt="" onClick={navigateHome} className='logo' />
            <ul className="navbar-menu">
                <li>
                    <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                </li>
                <li>
                    <a href='#explore-category' onClick={() => setMenu("recommanded")} className={menu === "recommanded" ? "active" : ""}>Category</a>
                </li>
                <li>
                    <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
                </li>
                <li>
                <a href='#footer' onClick={() => setMenu("about-us")} className={menu === "about-us" ? "active" : ""}>About us</a>
                </li>
            </ul>
            <div className="navbar-right">
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>SignIn</button>
                ) : (
                    <div className='navbar-profile'>
                        <p className='user-name'>Hello! {user?.name} <img src={assets.dropdown_icon} alt="" /></p>
                        <ul className="nav-profile-dropdown">
                            <li onClick={handleCartButtonClick}>
                                <img src={assets.cart_icon} alt="" />
                                <p>Cart {cartHasItems && <span className="dot"></span>}</p>
                            </li>
                            <hr />
                            <li onClick={handleOrderButtonClick}>
                                <img src={assets.order_icon} alt="" />
                                <p>Order</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
