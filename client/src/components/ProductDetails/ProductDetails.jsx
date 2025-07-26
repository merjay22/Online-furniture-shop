import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import "./ProductDetail.css";
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const ProductDetail = ({ setShowLogin }) => {
    const { id } = useParams();
    const { product_list, addToCart, url, token } = useContext(StoreContext);
    const [itemCount, setItemCount] = useState(1);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = () => {
            const foundProduct = product_list.find(item => item._id === id);
            if (foundProduct) {
                setProduct(foundProduct);
            } else {
                console.error('Product not found');
            }
        };

        if (product_list.length > 0) {
            fetchProduct();
        }
    }, [product_list, id]);

    const handleAddToCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowLogin(true);
            return;
        }

        if (itemCount > 0) {
            addToCart(id, itemCount);
            toast.success(`Added ${itemCount} ${product.name} to cart!`);
            setItemCount(1);
        }
    };

    const handleBuyNow = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowLogin(true);
            return;
        }

        navigate('/cart', {
            state: {
                buyNow: true,
                product: {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: itemCount,
                }
            }
        });
    };

    const handleViewCart = () => {
        navigate('/cart');
    };

    return (
        <div className='product-detail'>
            {product ? (
                <>
                    <img className='p-img' src={`${url}/images/${product.image}`} alt={product.name} />
                    <div className='product-detail-content'>
                        <h2>{product.name}</h2>
                        <p className='product-price'>₹{product.price}</p>
                        <p className='product-description'>{product.description}</p>
                        <h3>Select Quantity</h3>
                        <div className='quantity-control'>
                            <img className='quantity-btn' onClick={() => setItemCount(prev => prev > 1 ? prev - 1 : 1)} src={assets.remove_icon_red} alt="Remove" />
                            <p className='quantity-display'>{itemCount}</p>
                            <img className='quantity-btn' onClick={() => setItemCount(prev => prev + 1)} src={assets.add_icon_green} alt="Add" />
                        </div>
                        <div className='product-action'>
                            <button onClick={handleAddToCart}>Add to Cart</button>
                            <button onClick={handleViewCart} className='view-cart-btn'>View Cart</button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Product not found</p>
            )}
        </div>
    );
};

export default ProductDetail;
