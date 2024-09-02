import React from 'react'
import Products from './Products'
import '../styles/home.css'
import SearchBox from './SearchBox'

import { useSelector } from 'react-redux'
const getData = (ele,price) => {
  if (ele === "none") {
    return fetch(`http://localhost:8080/Products`)
    // return fetch(`https://productdisplay-acd37-default-rtdb.firebaseio.com/Products.json`)
  }
  return fetch(`http://localhost:8080/Products?category=${ele}&_sort=${price}`)
  // return fetch(`https://productdisplay-acd37-default-rtdb.firebaseio.com/Products.json?orderBy="${ele}"`)
}
function Home() {
  const [data, setData] = React.useState([])
  const [rawData, setRawData] = React.useState([])
 
  const [loading, setLoading] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const ele=useSelector((store)=> store.value)
  const price=useSelector((store)=>store.priceV)

  const featchData = async (ele,price) => {
 
    setLoading(true)
    await getData(ele,price).then((res) => res.json()).then((result) => {

      let updatedData = result
    
      setData(updatedData)
      setRawData(updatedData)

      setLoading(false)
    }).catch((error) => {
      setErr(true)
      console.log(error)
    }).finally(() => {
      setErr(false)
      console.log("featching the data completed")
    })
  }
  React.useEffect(() => {
    featchData(ele,price)
   
  }, [ele, price])

  const handleUpdate = (text) => {
    
    if (!text) {
      featchData(ele,price)
      return;
    }
    const d = rawData.filter((elem) => {
      const searchElem1 = elem.name.toLowerCase();
      if (searchElem1.includes(text))
        return true;
      return false;
    });
   
    setData(d);
    
  };
 
  // console.log(filter)
  return (
    <div className='container'>
      <div className='filter'>
      
        <SearchBox handleUpdate={handleUpdate} />


      </div>

      {loading ? <section class="dots-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </section> : err ? (<h1>Something went Wrong!...</h1>) :
        <div className='box'>  {data.length > 0 ? data.map((item) => (
          <Products key={item.id} {...item} />
        )

        ) : <h1>Data Notfound!</h1>}    </div>
      }

    </div>


  )
}

export default Home