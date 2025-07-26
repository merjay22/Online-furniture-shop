import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink
                    to='/add'
                    className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
                >
                    <img src={assets.add_icon} alt="Add Icon" />
                    <p>Add Product</p>
                </NavLink>
                <NavLink
                    to='/list'
                    className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
                >
                    <img src={assets.list_icon} alt="List Icon" />
                    <p>List Items</p>
                </NavLink>
                <NavLink
                    to='/orders'
                    className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
                >
                    <img src={assets.order_icon} alt="Order Icon" />
                    <p>Order List</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar;