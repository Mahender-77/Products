// src/Navbar.js
import React from 'react';
import { Box, Flex, Button, Stack, Heading ,Input,InputGroup,InputLeftElement,Text} from '@chakra-ui/react';
import {NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {SearchIcon} from '@chakra-ui/icons'


const Navbar = () => {

  const dispatch=useDispatch()
  const count=useSelector((store)=>store.count)
  const setCart=useSelector((store)=>store.setCart)


  const links=[
    {path:"/",title:"Home"},
    {path:"/About",title:"About"}
    
  ]
  const navigate=useNavigate()
const handleClick=()=>{
  navigate('/login')
}
const handleClick1=()=>{
  navigate('/AddCart')
  dispatch({type:"SET_SIZE",payload:0})
}
    return (
    <Box boxShadow='md' px={10}  fontFamily='mono' position="fixed" top="0" zIndex="1"  width="100%" backgroundColor='white'  >
      <Flex h={70} alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'} marginLeft={10}>
        <Heading size='xl' color='orange.400'>SHOP now</Heading>
        </Flex>
        <Box w={'40%'}>
        <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <SearchIcon color='gray.300' />
    </InputLeftElement>
    <Input type='tel' placeholder='Product name' borderRadius={"15px"} border={"0.5px solid black"} onChange={(e)=>dispatch({type:"SETING_INPUTVALUE",payload:(e.target.value).toLowerCase()})}/>
  </InputGroup>
        </Box>
        <Box>
          <Stack direction={'row'} spacing={70} pr={50} align={'center'} >
            {
              links.map((link)=>(
                <NavLink key={link.title} style={({isActive})=>( {
                  color : isActive ? 'orange':"black",
                  // borderBottom:isActive?"2px solid teal":"none",
                  fontWeight:"bold",
                  fontSize:"larger"
                })}
               to={link.path}>{link.title}</NavLink>
              ))
            }
               <Box
              as="span"
              fontWeight="bold"
              fontSize="larger"
              cursor="pointer"
              onClick={handleClick1}
            
            >
             {count>0&&<Box w={"13px"} h={"13px"} borderRadius={"50%"}  position={"absolute"} bottom={"40px"} right={"220px"} backgroundColor={"red"} ><Text color={'white'} fontSize={"14px"} position={"relative"} bottom={'4px'} left={"3px"}>{count}</Text></Box>  } 
             <svg style={{height:"20px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

            </Box>
          {/* <DrawerButton/> */}
         
         
            <Button onClick={handleClick}  variant="solid" size='sm' borderRadius='5' border='0.5px solid black' color={'black'} colorScheme='whiteAlpha'>
              Login
            </Button>
          </Stack>
        </Box>
      
      </Flex>
    </Box>
  );
};

export default Navbar;
