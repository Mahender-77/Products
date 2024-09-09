import React from 'react'
import { FormControl,Input,FormLabel,Box, Container,Stack,Button,useToast } from '@chakra-ui/react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth ,db } from './firebase'
import { setDoc ,doc } from 'firebase/firestore'
function Register() {
    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [name,setName]=React.useState("")
    const toast=useToast()
      const handleSubmit=async(e)=>{
          e.preventDefault()
          try {
           await createUserWithEmailAndPassword(auth,email,password)
           const user=auth.currentUser;
           if(user){
         
            await setDoc(doc(db,"Users",user.uid),{
                name:name,
                email:user.email
            })
            toast({
                position:'top',
                title:"Registration succefull!"
            })
           }
          } catch (error)
           {
            toast({
                position:'top',
                title:error.message
            })
          }
         
      }
   
  return (
    <Container maxW="md" centerContent>
    <Box
    p={6}
  mt={52}
    borderWidth={1}
    borderRadius="md"
    boxShadow="md"
    w="100%"
    bg="white"
    >  
    <form onSubmit={handleSubmit}>
      
        <Stack spacing={3}>
              <FormControl>
            <FormLabel>User name</FormLabel>
            <Input value={name} type='text' onChange={(e)=>{setName(e.target.value)}}/>
            </FormControl>
              <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={email} type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </FormControl>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input value={password} type='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </FormControl>
            <Button type='submit'>
              submit
            </Button>
            {/* <Box h={8}>
            <Text fontStyle='xl'>Dont't have an account? <Link to='/register'style={{color:'blue'}}>Register.</Link></Text>
            </Box> */}
            
        </Stack>
        
        </form>
            
    </Box>
    </Container>
  )
}

export default Register