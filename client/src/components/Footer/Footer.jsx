import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="foorter-content">
                <div className="foorter-content-left">
                    <img src={assets.logo} alt="" />
                    <p>We are dedicated to providing top-quality furniture solutions for every environment. Whether you're furnishing your home, setting up a productive office, designing a cozy library, equipping a hospital, or creating a welcoming restaurant atmosphere, we have everything you need.</p>
                </div>
                <div className="foorter-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+91 9773123472</li>
                        <li>jaymer412013@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 © jayfurniture.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer