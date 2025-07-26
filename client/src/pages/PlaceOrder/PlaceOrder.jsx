import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXX');

const CheckoutForm = ({ orderData, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [cardComplete, setCardComplete] = useState(false);

  // Form fields
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Validation states
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    card: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value
    });

    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {
      name: '',
      email: '',
      phone: '',
      card: ''
    };

    // Name validation
    if (!billingDetails.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!billingDetails.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(billingDetails.email)) {
      errors.email = 'Please enter a valid email';
      valid = false;
    }

    // Phone validation (optional but if provided should be valid)
    if (billingDetails.phone.trim() && !/^\d{10}$/.test(billingDetails.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit phone number';
      valid = false;
    }

    // Card validation
    if (!cardComplete) {
      errors.card = 'Please complete your card details';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    if (event.error) {
      setPaymentError(event.error.message);
    } else {
      setPaymentError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // In a real implementation, you would create a payment intent on your server
    // and confirm the payment with customer details
    try {
      // Simulate API call
      setTimeout(() => {
        setIsProcessing(false);
        toast.success("Order placed successfully!");
        onPaymentSuccess();
      }, 1500);
    } catch (err) {
      setPaymentError('An error occurred while processing your payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h3>Billing Details</h3>

      <div className="form-row">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={billingDetails.name}
          onChange={handleInputChange}
          className={formErrors.name ? 'input-error' : ''}
        />
        {formErrors.name && <div className="error-message">{formErrors.name}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={billingDetails.email}
          onChange={handleInputChange}
          className={formErrors.email ? 'input-error' : ''}
        />
        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="phone">Phone (Optional)</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={billingDetails.phone}
          onChange={handleInputChange}
          className={formErrors.phone ? 'input-error' : ''}
        />
        {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
      </div>

      <div className="form-row">
        <label htmlFor="address">Address (Optional)</label>
        <textarea
          id="address"
          name="address"
          placeholder="Enter your address"
          value={billingDetails.address}
          onChange={handleInputChange}
        />
      </div>

      <h3>Payment Information</h3>
      <div className="form-row">
        <label>
          Card Details
          <CardElement
            onChange={handleCardChange}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            className={formErrors.card ? 'input-error' : ''}
          />
        </label>
        {formErrors.card && <div className="error-message">{formErrors.card}</div>}
      </div>

      <div className="order-summary">
        <h4>Order Summary</h4>
        <p>Total Amount: ₹{orderData?.amount || 0}</p>
      </div>

      {paymentError && <div className="error-message">{paymentError}</div>}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="payment-button"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const PlaceOrder = () => {
  const { product_list, url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const { orderNumber } = useParams();
  const { state } = useLocation();
  const [seconds, setSeconds] = useState(5);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (paymentCompleted && seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (paymentCompleted && seconds === 0) {
      navigate('/');
    }
  }, [seconds, navigate, paymentCompleted]);

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
  };

  // Payment Form View
  if (!paymentCompleted) {
    return (
      <div className="container">
        <div className="place-order">
          <h1>Complete Your Order</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              orderData={state?.orderData} 
              onPaymentSuccess={handlePaymentSuccess} 
            />
          </Elements>
        </div>
      </div>
    );
  }

  // Order Success View
  return (
    <div className="container">
      <div className="place-order">
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
        <div className="order-number">
          Order Number: {orderNumber}
        </div>
        <div className="order-details">
          <h3>Order Details</h3>
          {state && state.orderData ? (
            <>
              <p>Amount: ₹{state.orderData.amount}</p>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {state.orderData.items.map((item, index) => (
                  <li key={index}>{item.name} - {item.quantity} - ₹{item.price * item.quantity}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading order details...</p>
          )}
        </div>
        <p className="redirect-message">
          You will be redirected to the main page in <span>{seconds}</span> seconds.
        </p>
      </div>
    </div>
  );
};

export default PlaceOrder;