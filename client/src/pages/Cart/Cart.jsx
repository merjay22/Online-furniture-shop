import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, product_list, removeFromCart, clearCart, getTotalCartAmount, url, token, removeAllOfProductFromCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isBuyNow = location.state?.buyNow || false;
  const buyNowProduct = location.state?.product || null;

  const handleClearCart = () => {
    clearCart();
    toast.info("Cart has been cleared!");
  };

  const handleCheckout = async () => {
    const items = product_list.filter(item => cartItems[item._id] > 0).map(item => ({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: cartItems[item._id]
    }));
    if (items.length === 0) {
      toast.warning("Please add items before proceeding to checkout.", { autoClose: 3000 });
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/order/placed`,
        { items, amount: getTotalCartAmount() + 150 },
        { headers: { token } }
      );

      if (response.data.success) {
        const orderData = {
          orderNumber: response.data.orderNumber,
          items,
          amount: getTotalCartAmount() + 150
        };
        clearCart();
        navigate(`/thankyou/${response.data.orderNumber}`, { state: { orderData } });
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error placing order.");
    }
  };

  const handleBuyNowCheckout = async () => {
    if (!buyNowProduct) return;

    try {
      const response = await axios.post(
        `${url}/api/order/placed`,
        { items: [buyNowProduct], amount: (buyNowProduct.price * buyNowProduct.quantity) + 150 },
        { headers: { token } }
      );

      if (response.data.success) {
        const orderData = {
          orderNumber: response.data.orderNumber,
          items: [buyNowProduct],
          amount: (buyNowProduct.price * buyNowProduct.quantity) + 150
        };
        navigate(`/thankyou/${response.data.orderNumber}`, { state: { orderData } });
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error placing order.");
    }
  };

  const handleDeleteAll = async (productId) => {
    try {
      await removeAllOfProductFromCart(productId);
      toast.info("All items of this product have been removed from cart!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove all items from cart.");
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {product_list.map((item) => {
          const itemQuantity = cartItems[item._id];
          if (itemQuantity && itemQuantity > 0) {
            return (
              <React.Fragment key={item._id}>
                <div className="cart-items-title cart-item-items">
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{itemQuantity}</p>
                  <p>₹ {item.price * itemQuantity}</p>
                  <div className="cart-item-actions">
                    <button onClick={() => { removeFromCart(item._id); toast.info("Item removed from cart!") }} className='delete-one-btn'>Remove One</button>
                    <button onClick={() => handleDeleteAll(item._id)} className='delete-all-btn'>Remove All</button>
                  </div>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : 150}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p className='total-amm-text'>Total Amount</p>
              <b className='total-amm'>₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 150}</b>
            </div>
          </div>
          {isBuyNow ? (
            <button onClick={handleBuyNowCheckout} className='checkout-btn'>PROCEED TO CHECKOUT</button>
          ) : (
            <>
              <button onClick={handleCheckout} className='checkout-btn'>PROCEED TO CHECKOUT</button>
              <button className='clear-cart-btn' onClick={handleClearCart}>Clear Cart</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
