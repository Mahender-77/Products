import React from 'react'
import "../styles/filterMethod.css"
function FilterMethod({ setFilter, filter, setState, state }) {

    const handleChange = (e) => {
        setFilter(e.target.value)
        
        e.target.value==="Electronics" ||"Clothing" && state===false ? setState(!state) : e.target.value==="none" ? setState(!state) : setState(state)
     
    }
  
    return (
        <div>
            <div className='filter-box'>

                <div className='filter-name'><h4>Filter </h4></div>
                <label htmlFor=""> <input type="radio" name="category" value="Electronics" onChange={(e) => { handleChange(e) }} />Electronics</label>
                <label htmlFor=""><input type="radio" name="category" value="Clothing" onChange={(e) => { handleChange(e) }} />Cloths</label>
                <label htmlFor=""><input type="radio" name="category" checked={filter === "none"} value="none" onChange={(e) => { handleChange(e) }} />None</label>
            </div>
        </div>

    )
}

export default FilterMethod