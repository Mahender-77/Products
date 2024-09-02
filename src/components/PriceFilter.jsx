import React from 'react'
import '../styles/priceSelect.css'
function PriceFilter({ setOrder }) {
    const arry = [
        {
                 value:"",
                 name:"--select--"

        },
        {
            value:"-price",
            name: "High-Low"
        },
        {
            value: "price",
            name: "Low-High"
        }
    ]
    
    const handleClick = (e) => {
        
        setOrder(e.target.value)
    }
    return (
    <div>
        <div className='select'>
            <div className='sort-name'><h4>Sort By Price</h4></div>
            <select name="" id="" onChange={(e) => { handleClick(e) }}>
                {
                    arry.map((item) =>
                        (<option value={item.value}>{item.name}</option>)
                    )
                }
            </select>
        </div>
    </div>
        
    )
}

export default PriceFilter