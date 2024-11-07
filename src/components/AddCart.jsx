import { Box,Image,Text ,Card,CardBody,Stack,Heading,CardFooter,Button, Flex, Skeleton} from '@chakra-ui/react'
import React from 'react'
import { db} from './firebase'
import { doc,updateDoc } from "firebase/firestore";
import {SmallCloseIcon} from '@chakra-ui/icons'
import { collection ,where,query ,getDocs} from 'firebase/firestore'

function AddCart() {
    const [data ,setData]=React.useState([])
    const [msg,setMsg]=React.useState(false)
    const path=collection(db,"Products")
    const fetchData=async()=>{
      setMsg(true)
        const snapShot=query(path, where("state", "==", true))
        try {
            const qurySnap=await getDocs(snapShot)
            if(!qurySnap.empty){
                const collectedData= qurySnap.docs.map((item)=>({id:item.id,...item.data()}))
                // console.log(collectedData)
                setData(collectedData)
              }
              else{
                setData([])
             
              } 
            
        } catch (error) {
            console.log(error.message)
        } finally{
          setMsg(false)
        }

    }
    React.useEffect(()=>{
        fetchData()
    },[])
    const handleClick=async(id)=>{
      const collectionRef=doc(db,"Products",id)
      await updateDoc(collectionRef,{
       state:false
      })
      fetchData()
    }
    
  return  <>
  {data.length>0? <Flex mt={'100px'} flexDirection={"column"} gap={"20px"}>
   
   {
       data.map((item)=>(
        <Skeleton isLoaded={!msg} fadeDuration={1} w={'60%'}>
         <Card key={item.id}
 direction={{ base: 'column', sm: 'row' }}
 overflow='hidden'
 variant='outline'
 // border={"1px solid red"}
 padding={"10px"}
 width={"100%"}
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
     <Box onClick={()=>handleClick(item.id)} position={"absolute"}h={"20px"} right={"15px"} top={"13px"} cursor={"pointer"}><SmallCloseIcon boxSize={"25px"} color={'#A9A9A9'}/></Box>
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
         </Skeleton>
       ))
   }
   </Flex>:<Text  marginTop={"150px"}fontSize={"xxx-large"} fontWeight={"600"} textAlign={"center"}>Empty....😿</Text>}
  </>

  

  }
export default AddCart