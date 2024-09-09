import React from 'react'
import Products from './Products'
import '../styles/home.css'
import SearchBox from './SearchBox'
import { useSelector } from 'react-redux'
import DrawerButton from './DrawerButton'
import {ChevronDownIcon,ChevronUpIcon} from '@chakra-ui/icons'
import debounce from 'lodash.debounce'
const getData = (ele, price) => {
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
  const [con, setCon] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [dropdownCategory,setDropdownCategory]=React.useState(false)
  const [dropdownPrice,setDropdownPrice]=React.useState(false)
  const [ele,setEle]=React.useState("")
  const [priceLimit,setPriceLimit]=React.useState("")
  // const ele = useSelector((store) => store.value)
  const price = useSelector((store) => store.priceV)
  // const status=useSelector((store)=>store.status)

  const debounceMethod= React.useCallback(
    debounce(async (ele, price) => {
      setLoading(true);
      try {
        const response = await getData(ele, price);
        const result = await response.json();
        setData(result);
        setRawData(result);
        setErr(false);
      } catch (error) {
        setErr(true);
        console.log(error);
      } finally {
        setLoading(false);
        console.log("Fetching the data completed");
      }
    }, 300),
    []
  );
   
  const debouncedHandleUpdate = React.useCallback(
    debounce((text) => {
      if (!text) {
        setData(rawData);
        return;
      }
      const filteredData = rawData.filter((elem) =>
        elem.name.toLowerCase().includes(text.toLowerCase())
      );
      setData(filteredData);
    }, 1000), 
    [rawData]
  );


  React.useEffect(() => {
    debounceMethod(ele, price)

  }, [ele, price,debounceMethod])

  const handleUpdate = (text) => {
    debouncedHandleUpdate(text)
    // if (!text) {
    //   setData(rawData)
    //   return;
    // }
    // const d = rawData.filter((elem) => {
    //   const searchElem1 = elem.name.toLowerCase();
    //   if (searchElem1.includes(text))
    //     return true;
    //   return false;
    // });

    // setData(d);

  };

  const handleClick = () => {
    setCon(!con)
  }
  const handleCategory=(val)=>{
     setEle(val===ele?"":val)
  }
  const handlePrice=(val)=>{
    setPriceLimit(val)
    
  }

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
        <div style={{ display: "flex", flexDirection: "column", width: "80%", margin: "auto", gap: "10px" }}>
          <button style={{ border: "1px solid black", width: "6%", padding: "auto", fontSize: "large", fontWeight: "600", borderRadius: "4px" }} onClick={handleClick}>Filter</button>
         <div style={{ display: "flex" }}>
        { con && ( <div style={{display:"flex",flexDirection:"column", width: "300px", height:"600px", backgroundColor:"white",position:"sticky",top:"70px",overflow:"hidden",marginTop:"10px",opacity:con?1:0,transform:con?"translateY(0)":"translateY(-20)", transition:"all 0.5s ease, transform 0.5s ease", }}>
             <div style={{backgroundColor:"#DCDCDC",padding:"10px",margin:"5px 5px 0 5px",borderRadius:"4px",display:"flex",justifyContent:"space-between"}} onClick={()=>setDropdownCategory(!dropdownCategory)}>
              <span style={{fontWeight:"500"}}>Category</span>
              <span> {dropdownCategory ?<ChevronDownIcon boxSize={'1.5rem'}/>:<ChevronUpIcon boxSize={'1.5rem'}/>} </span>
             </div>
               {
                dropdownCategory ? <div style={{margin:"0 5px 10px 5px",display:"flex",flexDirection:"column"}}>
                 <p style={{backgroundColor: ele ==="Electronics" ?"white":"whitesmoke",textAlign:"left",height:"40px",padding:"5px",fontWeight:ele==="Electronics"?"500":"400",cursor:"pointer"}} onClick={()=>handleCategory('Electronics')}>Electronics</p>
                 <p  style={{backgroundColor:ele ==="Clothing" ?"white":"whitesmoke",textAlign:"left",height:"40px",padding:"5px",fontWeight:ele==="Clothing"?"500":"400",cursor:"pointer",marginTop:"3px" }}onClick={()=>handleCategory('Clothing')}>Clothing</p>
                </div>:<></>
               }
                <div style={{backgroundColor:"#DCDCDC",padding:"10px",margin:"5px 5px 0 5px",borderRadius:"4px",display:"flex",justifyContent:"space-between"}} onClick={()=>setDropdownPrice(!dropdownPrice)}>
              <span style={{fontWeight:"500"}}>Price</span>
              <span> {dropdownPrice ?<ChevronDownIcon boxSize={'1.5rem'}/>:<ChevronUpIcon boxSize={'1.5rem'}/>} </span>
             </div>
               {
                dropdownPrice ? <div style={{margin:"0 5px 10px 5px",display:"flex",flexDirection:"column"}}>
                  <div style={{display:"flex",justifyContent:"flex-start",placeItems:"center", gap:"10px",height:"40px",padding:"5px",backgroundColor:"whitesmoke"}}> <input type="checkbox" name=""/> <label htmlFor="" style={{fontSize:"16px"}}>0 to 50</label></div>
                  <div style={{display:"flex",justifyContent:"flex-start",placeItems:"center", gap:"10px",height:"40px",padding:"5px",backgroundColor:"whitesmoke",marginTop:"3px"}}> <input type="checkbox"  onChange={()=>setPriceLimit("51-100")} /> <label htmlFor="" style={{fontSize:"16px"}}>51 to 100</label></div>
                 
                
                </div>:<></>
               }
            </div> )}
            <div className='box' >  {data.length > 0 ? data.map((item) => (
              <Products key={item.id} {...item} />
            )

            ) : <h1>Data Notfound!</h1>}    </div>
          </div>

        </div>

      }

    </div>
    //  {status ? (<div style={{ width: '250px', transition: 'width 0.5s',postion:"fixed",zIndex:"-10"}}><DrawerButton/></div>):<></>}


  )
}

export default Home