import React from 'react'
import style from '../styles/product.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Box,Card,CardBody,Image,Stack,Heading,Text} from '@chakra-ui/react'
function Products({image,name,price,description,id}) {
   const navigate=useNavigate()
   const auth=useSelector((store)=>store.auth)
  
  const handleClick=(id)=>{

    navigate(auth ? `/productDetails/${id}` : '/login')
  }
 
  return (
    <Box  maxW='250px'  onClick={()=>handleClick(id)} cursor={'pointer'} >
      <Card >
  <CardBody>
    <Image
      w={"250px"}
      h={"120px"}
      src={image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      
    />
    <Stack mt='6' spacing='2'>
    
      <Heading size='md'>{name}</Heading>
      <Text textAlign={'left'}  height={"50px"}pb={'15px'} overflow="hidden"
      sx={{
        display: '-webkit-box',
        WebkitLineClamp: 2, // Limits the text to 2 lines
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}>
        {description}
      </Text>
      <Text color='blue.600' fontSize='2xl' textAlign={'left'}  height={"35px"}>
        ${price}
      </Text>
    </Stack>
    </CardBody>
    </Card>
    </Box>
  )
}

export default Products