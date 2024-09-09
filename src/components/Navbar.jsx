// src/Navbar.js
import React from 'react';
import { Box, Flex, Button, Stack, Heading} from '@chakra-ui/react';
import {NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

const Navbar = () => {

  // const bgcolor=useBreakpointValue({
  //   md:"blue",
  //   sm:"red",

  // })
  const status=useSelector((store)=>store.status)
  const dispatch=useDispatch()
  const links=[
    {path:"/",title:"Home"},
    {path:"/About",title:"About"}
    
  ]
  const navigate=useNavigate()
const handleClick=()=>{
  navigate('/login')
}
    return (
    <Box boxShadow='md' px={10}  fontFamily='mono' position="fixed" top="0" zIndex="1"  width="100%" backgroundColor='white' >
      <Flex h={70} alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'} marginLeft={10}>
        <Heading size='xl' color='orange.400'>PRODUCTS</Heading>
        </Flex>
        <Box>
          <Stack direction={'row'} spacing={70} pr={50} align={'center'} >
            {
              links.map((link)=>(
                <NavLink style={({isActive})=>({
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
              color={status?"orange":""}
              cursor="pointer"
              onClick={()=>dispatch({type:"STATUS.",payload:!status})}
            >
              Filter
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
