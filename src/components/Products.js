import React from 'react'
// import style from '../styles/product.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Box,Card,CardBody,Image,Stack,Text,Flex,Button} from '@chakra-ui/react'
import {BeatLoader} from 'react-spinners'
import { db } from './firebase'
import { doc,updateDoc } from "firebase/firestore";
import CartIcon from './CartIcon';
import { useDispatch } from 'react-redux'
import { fetchSizeFromFirestore } from './middleware/fetchSizeFromFirestore'
function Products({image,name,price,description,id,state}) {
  const [stateHeart,setStateHeart]=React.useState(state)
  const [loader,setLoader]=React.useState(false)
   const navigate=useNavigate()
   const auth=useSelector((store)=>store.auth)
  
   const dispatch=useDispatch()
  const handleClick=(id)=>{

    navigate(auth ? `/productDetails/${id}` : '/login')
  }

  const handleUpdate1= async(id)=>{
    setLoader(true)
     const collectionRef=doc(db,"Products",id)
     await updateDoc(collectionRef,{
      state:!stateHeart
     })
     setStateHeart(!stateHeart)
     dispatch(fetchSizeFromFirestore())
     setLoader(false)
  }

  
 
  return (
    <Box  maxW='300px'  >
      <Card >
  <CardBody>
    <Box onClick={()=>handleClick(id)} cursor={'pointer'}>
    <Image
      w={"300px"}
      h={"150px"}
      src={image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      
    />
    <Stack mt='6' spacing='2'>
    
      <Text fontSize={'xl'}  fontWeight={'670'}  overflow="hidden" sx={{
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }} >{name}</Text>
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
 <Box >{!stateHeart?<Button  isLoading={loader}
  colorScheme='blue'
  spinner={<BeatLoader size={8} color='white' />}
 
 onClick={()=>handleUpdate1(id)} size={"sm"}>Add to cart</Button>:<CartIcon handleUpdate1={handleUpdate1} id={id}/>}</Box>
    
      </Flex>

    </CardBody>
    </Card>
    </Box>
  )
}

export default Products