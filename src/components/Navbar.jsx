// src/Navbar.js
import React from 'react';
import { Box, Flex, Button, Stack, Heading ,Input,InputGroup,InputLeftElement,Text} from '@chakra-ui/react';
import {NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {SearchIcon} from '@chakra-ui/icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {

  const size=useSelector((store)=>store.size)
  
  const dispatch=useDispatch()
  const links=[
    {path:"/",title:"Home"},
    {path:"/About",title:"About"}
    
  ]
  const navigate=useNavigate()
const handleClick=()=>{
  navigate('/login')
}
const handleClick1=()=>{
  navigate('/wishlist')
}
    return (
    <Box boxShadow='md' px={10}  fontFamily='mono' position="fixed" top="0" zIndex="1"  width="100%" backgroundColor='white' >
      <Flex h={70} alignItems={'center'} justifyContent={'space-between'}>
      <Flex alignItems={'center'} marginLeft={10}>
        <Heading size='xl' color='orange.400'>PRODUCTS</Heading>
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
             {size!==0 && <Box w={"13px"} h={"13px"} borderRadius={"50%"}  position={"absolute"} bottom={"40px"} right={"220px"} backgroundColor={"red"} ><Text color={'white'} fontSize={"14px"} position={"relative"} bottom={'4px'} left={"3px"}>{size}</Text></Box>  } 
           <FontAwesomeIcon icon={farHeart}/>
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
