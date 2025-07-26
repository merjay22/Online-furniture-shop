import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        const response = await axios.post(`${url}/api/order/usersorder`, {}, { headers: { token } });
        setData(response.data.data);
        console.log(response.data.data);
    };

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`${url}/api/order/deleteOrder/${orderId}`, { headers: { token } });
            fetchOrders();
            toast.success("Order Cancled!")
        } catch (error) {
            console.error('Error deleting order', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }

        if (!token) {
            navigate('/');
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.package_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity;
                                } else {
                                    return item.name + " x " + item.quantity + ", ";
                                }
                            })}</p>
                            <p>${order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={() => deleteOrder(order._id)}>Cancel Order</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyOrders;