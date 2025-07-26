import React from 'react'
import './Header.css'

const Header = () => {

  return (
    <div className='header'>
      <div className="header-content">
        <h2>Make Your Place Awesome</h2>
        <p>Here you can find many types of furniture for your home, office and other places to make the place bertter and awesome.</p>
        <a href='#explore-category'><button>Explore Products</button></a>
      </div>
    </div>
  )
}

export default Header