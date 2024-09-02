import React from 'react'
import style from '../styles/product.css'
function Products({image,name,price,description}) {
   
  return (
    <div className='card'>
    <div className='card-img'>
    <img src={image} alt=""/>
    </div>
    <h4>{name}</h4>
    <h5>{price}</h5>
    <p >{description}</p>
    </div>
  )
}

export default Products