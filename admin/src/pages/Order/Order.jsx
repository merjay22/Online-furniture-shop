import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/all`, {
        headers: { token: localStorage.getItem('token') },
      });
      if (response.data.success) {
        const sortedOrders = response.data.orders.sort((a, b) => {
          if (a.status === 'Delivered' && b.status !== 'Delivered') return 1;
          if (a.status !== 'Delivered' && b.status === 'Delivered') return -1;
          return 0;
        });
        setOrders(sortedOrders);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const updateOrderStatus = async (orderId, currentStatus) => {
    const newStatus = currentStatus === 'Shipped' ? 'Delivered' : 'Shipped';
    try {
      const response = await axios.put(`${url}/api/order/update/${orderId}`, {
        status: newStatus,
      }, {
        headers: { token: localStorage.getItem('token') },
      });
      if (response.data.success) {
        const updatedOrders = orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ).sort((a, b) => {
          if (a.status === 'Delivered' && b.status !== 'Delivered') return 1;
          if (a.status !== 'Delivered' && b.status === 'Delivered') return -1;
          return 0;
        });
        setOrders(updatedOrders);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders">
      <h2>All Orders</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>User Name</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId ? order.userId.name : 'Unknown'}</td>
                <td>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name} - {item.quantity}</li>
                    ))}
                  </ul>
                </td>
                <td>₹ {order.amount}</td>
                <td>{order.status}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  {order.status !== 'Delivered' && (
                    <button
                      className="update-button"
                      onClick={() => updateOrderStatus(order._id, order.status)}
                    >
                      {order.status === 'Shipped' ? 'Mark as Delivered' : 'Mark as Shipped'}
                    </button>
                  )}
                  {order.status === 'Delivered' && (
                    <button
                      className="update-button"
                      disabled
                    >
                      Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
