  import React from 'react'
  // import {ChevronDownIcon} from '@chakra-ui/icons'
  
  import {Box,Button ,Drawer,DrawerCloseButton,DrawerHeader,DrawerBody,DrawerFooter,DrawerContent,useDisclosure, Stack} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
  function DrawerButton() {
      const { isOpen, onOpen, onClose } = useDisclosure()

      console.log(isOpen,onOpen,onClose)
      
      // const [state, setState] = React.useState(false);
      
      const ele=useSelector((store)=>store.value)
      const status=useSelector((store)=>store.status)
      const price=useSelector((store)=>store.priceV)
     
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
         
          <Drawer
          isOpen={status}
            placement='right'
            onClose={onClose}
          bg={'black'}
          >
         
            <DrawerContent mt="75px" >
              <DrawerCloseButton onClick={()=>dispatch({type:"STATUS.",payload:!status})}/>
              {/* <DrawerHeader>Filter</DrawerHeader> */}
    
              <DrawerBody>
              <Stack>
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