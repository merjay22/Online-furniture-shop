import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Order from './pages/Order/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home/Home';
import EditProduct from './pages/Edit/EditProduct';
import Login from './pages/Login/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const url = "http://localhost:5000";

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        toastClassName="custom-toast"
      />
      <Navbar />
      <hr />
      <div className="app-content">
        {isAuthenticated ? (
          <>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Home url={url} />} />
              <Route path='/add' element={<Add url={url} />} />
              <Route path='/list' element={<List url={url} />} />
              <Route path="/edit/:id" element={<EditProduct url={url} />} />
              <Route path='/orders' element={<Order url={url} />} />
            </Routes>
          </>
        ) : (
          <Login onLogin={handleLogin} url={url} />
        )}
      </div>
    </div>
  );
};

export default App;