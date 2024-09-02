import React from 'react'
import style from '../styles/searchBox.css'
function SearchBox({handleUpdate}) {

    const handleChange=(e)=>{
      const textVal=(e.target.value).toLowerCase()
      handleUpdate(textVal)
    }
  return (
    <div className='input-box'>
        <input type="text" placeholder='search' onChange={(e)=>{handleChange(e)}}/>
    </div>
  )
}

export default SearchBox