import React, { useContext } from 'react'
import './ProductItem.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const ProductItem = ({ id, name, price, description, image }) => {
    
    const {url} = useContext(StoreContext)
    
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate(`/product/${id}`)
    }

    return (
        <div className='product-item'>
            <div className="product-item-img-container">
                <img className='product-item-image' src={url+"/images/"+image} alt="" />
            </div>
            <div className="product-item-info">
                <p>{name}</p>
            </div>
            <p className="product-item-description">{description}</p>
            <p className="product-item-price">₹{price}</p>
            <button onClick={handleButtonClick} className='product'>View</button>
        </div>
    )
}

export default ProductItem
