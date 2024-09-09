import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/productDetails.css'

function ProductDetails() {
    const [data,setData]=React.useState([])
    const [loading,setLoading]=React.useState(false)
    const {id}=useParams()
  
   
    const fetchDetails = async (id) =>{
        setLoading(true)
        try {
            const RData = await fetch(`http://localhost:8080/Products/${id}`)
            if(!RData.ok){
                throw new Error ("Smothing is wrong>>!")
            }
            const result = await RData.json()
            setData([result])
        } catch (error) {   
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    } 
    React.useEffect(()=>{
        fetchDetails(id)
    },[id])
  return (
    <div>
        {
            loading ? <h1>Loading..</h1> : (
                data.map((item)=>
                    <div className='Product'>
                        <div className='product-img'><img src={item.image} alt="" /></div>
                        <h3>{item.name}</h3>
                        <h4>💲{item.price}</h4>
                        <p >{item.description}</p>
                    </div>
                )
            )
        }
    </div>
  )
}

export default ProductDetails