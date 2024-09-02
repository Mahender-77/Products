  import React from 'react'
  import {ChevronDownIcon} from '@chakra-ui/icons'
  
  import {Box,Heading, Button ,Drawer,DrawerOverlay,DrawerCloseButton,DrawerHeader,DrawerBody,DrawerFooter,DrawerContent,useDisclosure, Stack} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
  function DrawerButton() {
      const { isOpen, onOpen, onClose } = useDisclosure()
      
      // const [state, setState] = React.useState(false);
      
      const ele=useSelector((store)=>store.value)
      
      const price=useSelector((store)=>store.priceV)
      console.log(price)
      const dispatch=useDispatch()
      const handleToggel=(val)=>{
         dispatch({type:"SELECTED_VAL",payload:val})
      }

      
      const handleAdd=(val)=>{
        console.log(val)
         dispatch({type:"Filter_with_Price",payload:val})
      }
     
      
      return (
        <>
          <Button variant={'ghost'}  onClick={onOpen}>
          <Heading fontSize="larger">Filter</Heading>
          <ChevronDownIcon onClick={onOpen} boxSize={'2em'}/>
          </Button>
          {/* <ChevronDownIcon onClick={onOpen} boxSize={'2em'}/>  */}
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            // finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Filter</DrawerHeader>
    
              <DrawerBody>
              <Stack>
                {/* <Box  border='1px solid black'>Electronics</Box>
                <Box border='1px solid black'>Cloths</Box> */}
                {/* <Input value="Electronic"></Input><Input value="Clothing"></Input> */}
                {/* <Button size='md' w='90px'>Electronics</Button><Button size='md' w={20}>Clothing</Button> */}
                
        <Stack direction="row" spacing={5}>
          <Box
          
            border="2px solid"
            borderColor={ele === 'Electronics' ? 'gray.400' : 'gray.300'}
            borderRadius="md"
            h={8}  
            display="flex"  
            alignItems="center"  
            justifyContent="center" 
            cursor="pointer"
            p={2}  
           
            bg={ele === 'Electronics' ? 'gray.400' : 'white'}
            onClick={()=>handleToggel('Electronics')}
          >
          
            Electronics
          </Box>

          <Box
            
            border="2px solid"
            borderColor={ele === 'Clothing' ? 'gray.400' : 'gray.300'}
            borderRadius="md"
            h={8}  
            display="flex" 
            alignItems="center" 
            justifyContent="center"  
            cursor="pointer"
            p={2}  
            bg={ele === 'Clothing' ? 'gray.400' : 'white'}
            onClick={()=>handleToggel('Clothing')}
         
          >
            Clothing
          </Box>
        </Stack>
            {ele===""?<></>:
            // (<Text>Filter By Price</Text>)
           ( <Stack direction="row" spacing={5}>
            <Box
            
              border="2px solid"
              borderColor={price === '-price' ? 'gray.400' : 'gray.300'}
              borderRadius="md"
              h={8}  
              display="flex"  
              alignItems="center"  
              justifyContent="center" 
              cursor="pointer"
              p={2}  
             
              bg={price === '-price' ? 'gray.400' : 'white'}
              onClick={()=>handleAdd('-price')}
            >
            
          High-Low
            </Box>
  
            <Box
              
              border="2px solid"
              borderColor={price === 'price' ? 'gray.400' : 'gray.300'}
              borderRadius="md"
              h={8}  
              display="flex" 
              alignItems="center" 
              justifyContent="center"  
              cursor="pointer"
              p={2}  
              bg={price === 'price' ? 'gray.400' : 'white'}
              onClick={()=>handleAdd('price')}
           
            >
              Low-High
            </Box>
          </Stack>)
            } 
              </Stack>
              </DrawerBody>
    
              <DrawerFooter>
              <Button onClick={onClose}>Apply</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )
    }
    export default DrawerButton