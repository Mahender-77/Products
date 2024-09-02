// src/Navbar.js
import React from 'react';
import { Box, Flex, Button, Stack, Heading} from '@chakra-ui/react';
import {NavLink} from 'react-router-dom'


import DrawerButton from './DrawerButton';

const Navbar = () => {

  // const bgcolor=useBreakpointValue({
  //   md:"blue",
  //   sm:"red",

  // })
  const links=[
    {path:"/",title:"Home"},
    {path:"/About",title:"About"}
  ]
  

    return (
    <Box boxShadow='md' px={10}  fontFamily='mono'  >
      <Flex h={70} alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'} marginLeft={10}>
        <Heading size='xl' color='orange.400'>PRODUCTS</Heading>
        </Flex>
        <Box>
          <Stack direction={'row'} spacing={70} pr={50} align={'center'} >
            {/* <Link href="#" color="black" fontWeight="bold" textDecoration='none' fontSize={'larger'}></Link>
            <Link href="#" color="black" fontWeight="bold" textDecoration='none' fontSize={'larger'}>Contact</Link> */}
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
              
          <DrawerButton/>
         
         
            <Button  variant="solid" size='sm' borderRadius='5' border='0.5px solid black' color={'black'} colorScheme='whiteAlpha'>
              Login
            </Button>
          </Stack>
        </Box>
      
      </Flex>
    </Box>
  );
};

export default Navbar;
