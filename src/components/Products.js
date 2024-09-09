import React from 'react'
import style from '../styles/product.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Products({image,name,price,description,id}) {
   const navigate=useNavigate()
   const auth=useSelector((store)=>store.auth)
  
  const handleClick=(id)=>{
    console.log(auth)
    navigate(auth ? `/productDetails/${id}` : '/login')
  }
  return (
    <div className='card' onClick={()=>handleClick(id)}>
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