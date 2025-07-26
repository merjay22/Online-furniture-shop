import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from '../src/pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import ProductDetail from './components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import MyOrders from './pages/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showLogin]);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail setShowLogin={setShowLogin} />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorder' element={<MyOrders />} />
          <Route path="/thankyou/:orderNumber" element={<PlaceOrder />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
          toastClassName="custom-toast" />
      </div>
      <Footer />
    </>
  );
}

export default App;
