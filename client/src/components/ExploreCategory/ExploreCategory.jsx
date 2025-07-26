import React from 'react'
import './ExploreCategory.css'
import { category_list } from '../../assets/assets'

const ExploreCategory = ({category,setCategory}) => {
  return (
    <div className='explore-category' id='explore-category'>
      <h1>Explore Different Category</h1>
      <p className='explore-category-text'>Choose from a Different category to decorate your place, Our mission is to satisfy you by our furniture...</p>
      <div className="explore-category-list">
        {category_list.map((item, index) => {
          return (
            <div onClick={()=>setCategory(prev=>prev===item.category_name?"All":item.category_name)} key={index} className='explore-category-list-item'>
              <img className={category===item.category_name?"active":""} src={item.category_img} alt="" />
              <p>{item.category_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreCategory