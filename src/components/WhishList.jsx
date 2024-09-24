import { Box,Image,Text ,Card,CardBody,Stack,Heading,CardFooter,Button, Flex} from '@chakra-ui/react'
import React from 'react'
import { db } from './firebase'
import {SmallCloseIcon} from '@chakra-ui/icons'
import { collection ,where,query ,getDocs} from 'firebase/firestore'

function WhishList() {
    const [data ,setData]=React.useState([])
    const path=collection(db,"Products")
    const fetchData=async()=>{
        const snapShot=query(path, where("state", "==", true))
        try {
            const qurySnap=await getDocs(snapShot)
            if(!qurySnap.empty){
                const collectedData= qurySnap.docs.map((item)=>({id:item.id,...item.data()}))
                setData(collectedData)
              }
              console.log("Data is Not avilable")
            
        } catch (error) {
            console.log(error.message)
        }

    }
    React.useEffect(()=>{
        fetchData()
    })
    const handleClick=()=>{
        
    }
  return (
 <Flex mt={'100px'} flexDirection={"column"} gap={"20px"}>
   
    {
        data.map((item)=>(
          <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  // border={"1px solid red"}
  padding={"10px"}
  width={"60%"}
ml={"40px"}
position={"relative"}
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={item.image}
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody >
      <Box onClick={handleClick } position={"absolute"}h={"20px"} right={"15px"} top={"13px"} cursor={"pointer"}><SmallCloseIcon boxSize={"25px"} color={'#A9A9A9'}/></Box>
      <Heading size='md'>{item.name}</Heading>

      <Text py='2'>
       {item.description}
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Buy Latte
      </Button>
    </CardFooter>
  </Stack>
</Card>
          
        ))
    }
    </Flex>
  )
}

export default WhishList