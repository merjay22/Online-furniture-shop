import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [product_list, setProductList] = useState([]);
    const [order, setOrder] = useState(null);
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null); 

    const url = "http://localhost:5000";

    const addToCart = async (itemId, quantity = 1) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + quantity
        }));

        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId, quantity }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    };

    const removeAllOfProductFromCart = async (itemId) => {
        if (token) {
            await axios.post(`${url}/api/cart/removeAll`, { itemId }, { headers: { token } });
        }
        setCartItems((prev) => {
            const newCartItems = { ...prev };
            delete newCartItems[itemId];
            return newCartItems;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = product_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchProductList = async () => {
        const response = await axios.get(`${url}/api/product/list`);
        setProductList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    useEffect(() => {
        async function loadData() {
            await fetchProductList();
            if (localStorage.getItem("token")) {
                const storedToken = localStorage.getItem("token");
                setToken(storedToken);
                await loadCartData(storedToken);

                // Fetch user data
                try {
                    const response = await axios.get(`${url}/api/user/me`, { headers: { token: storedToken } });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        }
        loadData();
    }, []);

    const clearCart = () => {
        setCartItems({});
    };

    return (
        <StoreContext.Provider value={{ product_list, cartItems, addToCart, removeFromCart, removeAllOfProductFromCart, clearCart, getTotalCartAmount, url, token, setToken, order, user, setUser }}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
