import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/productDetails.css'
import {getDoc,doc} from 'firebase/firestore'
import { Text,Card,CardBody,Image,Stack,Heading, Center,Box, CardFooter,Button} from '@chakra-ui/react'
import { db } from './firebase'

function ProductDetails() {
    const [data,setData]=React.useState([])
    const [loading,setLoading]=React.useState(false)
  
    const {id}=useParams()
     
  
   
    const fetchDetails = async (id) =>{
      const data=doc(db,"Products",id)
      const getData= await getDoc(data)
      if(getData){
        const item=getData.data()
       setData([item])
      }
      else{
        setLoading(true)
        console.log("Smothing is Wrong")
      }
    } 
    React.useEffect(()=>{
        fetchDetails(id)
    },[id])
  return (
    <Center mt={"100px"}>
        {
            loading ? <Text>Loading..</Text> : (
                data.map((item)=>
                    <Box maxW={"400px"}>
                    <Card >
  <CardBody>
    <Image
      w={"400px"}
      src={item.image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='2'>
    
      <Heading size='md'>{item.name}</Heading>
      <Text textAlign={'left'}  height={"50px"}pb={'15px'} overflow="hidden"
      sx={{
        display: '-webkit-box',
        WebkitLineClamp: 2, // Limits the text to 2 lines
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}>
        {item.description}
      </Text>
      <Text color='blue.600' fontSize='2xl' textAlign={'left'}  height={"35px"}>
        ${item.price}
      </Text>
    </Stack>
    </CardBody>
    <CardFooter>
        <Button bg={'blue.600'} color={"White"}>Buy</Button>
    </CardFooter>
    </Card>
    </Box>
                )
            )
        }
    </Center>
  )
}

export default ProductDetails