import React from 'react'
// import style from '../styles/product.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Box,Card,CardBody,Image,Stack,Heading,Text,Flex} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { db } from './firebase'
import { doc,updateDoc } from "firebase/firestore";

function Products({image,name,price,description,id,state,fetchData}) {
  const [stateHeart,setStateHeart]=React.useState(state)
   const navigate=useNavigate()
   const auth=useSelector((store)=>store.auth)

  const handleClick=(id)=>{

    navigate(auth ? `/productDetails/${id}` : '/login')
  }

  const handleUpdate1= async(id)=>{
     const collectionRef=doc(db,"Products",id)
     await updateDoc(collectionRef,{
      state:!stateHeart
     })
     setStateHeart(!stateHeart)
     fetchData()
  }
 
  return (
    <Box  maxW='250px' >
      <Card >
  <CardBody>
    <Box onClick={()=>handleClick(id)} cursor={'pointer'}>
    <Image
      w={"250px"}
      h={"120px"}
      src={image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      
    />
    <Stack mt='6' spacing='2'>
    
      <Heading size='md' >{name}</Heading>
      <Text textAlign={'left'}  height={"50px"} pb={'15px'} overflow="hidden"
      sx={{
        display: '-webkit-box',
        WebkitLineClamp: 2, // Limits the text to 2 lines
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}>
        {description}
      </Text>
      </Stack>
    </Box>
   
      <Flex justifyContent={"space-between"} placeItems={"center"} mt={"10px"}>
      <Text color='blue.600' fontSize='2xl' textAlign={'left'}  height={"35px"}>
        ${price}
      </Text>
 <Box onClick={()=>handleUpdate1(id)}>{ stateHeart?<FontAwesomeIcon style={{color:"red" ,fontSize:"20px"}} icon={fasHeart}/> :<FontAwesomeIcon  style={{ color: 'black', fontSize: '20px' ,opacity:"0.7"}}  icon={farHeart} />}</Box>
    
      </Flex>
    

    </CardBody>
    </Card>
    </Box>
  )
}

export default Products