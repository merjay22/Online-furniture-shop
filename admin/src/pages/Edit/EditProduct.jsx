import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const EditProduct = ({ url }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Home',
        image: ''
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${url}/api/product/${id}`);
                if (response.data.success) {
                    setProduct(response.data.data);
                    setImage(response.data.data.image);
                } else {
                    toast.error('Error fetching product details');
                }
            } catch (error) {
                toast.error('Error fetching product details');
            }
        };

        fetchProduct();
    }, [id, url]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        if (image instanceof File) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post(`${url}/api/product/update/${id}`, formData);
            if (response.data.success) {
                toast.success('Product updated successfully');
                navigate('/list');
            } else {
                toast.error('Error updating product');
            }
        } catch (error) {
            toast.error('Error updating product');
        }
    };

    return (
        <div className='add'> {/* Reusing the same class as Add.jsx */}
            <form className='flex-col' onSubmit={handleSubmit}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? (image instanceof File ? URL.createObjectURL(image) : `${url}/images/${image}`) : `${url}/images/${product.image}`}
                            alt=""
                        />
                    </label>
                    <input onChange={handleImageChange} type="file" id='image' hidden />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={handleChange} value={product.name} type="text" name='name' autoComplete='off' placeholder='Enter Product Name' required />
                </div>
                <div className="product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={handleChange} value={product.description} name="description" rows='6' placeholder='Write Product Description' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={handleChange} name="category" value={product.category}>
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Library">Library</option>
                            <option value="Hospital">Hospital</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price (₹)</p>
                        <input onChange={handleChange} value={product.price} type="number" name='price' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
