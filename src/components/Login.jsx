import { FormControl,Input,FormLabel,Box, Container,Stack,Button,Text,useToast, FormHelperText} from '@chakra-ui/react'
import {WarningIcon} from '@chakra-ui/icons'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from './firebase'
import React from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
function Login() {
  const [email,setEmail]=React.useState("")
  const [password,setPassword]=React.useState("")
  const [valid,setValid]=React.useState(false)
  const toast = useToast()
  const navigate=useNavigate()
 
  const dispatch=useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
       try {
        await signInWithEmailAndPassword(auth,email,password)
        toast({
          position:"top",
          title:"Login successfull!"
        })
           navigate('/')
           dispatch({type:"AUTH_TRUE",payload:true})
       } catch (error) {
        // toast({
        //   position:"top",
        //   title:error.message
        // })
        setValid(true)
      
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
      
        <Stack spacing={3}>  <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={email} type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            {valid ? <FormHelperText  color='red'><WarningIcon/> invalid email.!</FormHelperText>:<></>}
            </FormControl>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input value={password} type='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            {valid ? <FormHelperText  color='red'><WarningIcon/> invalid password.!</FormHelperText>:<></>}
            </FormControl>
            <Button type='submit'>
              Login
            </Button>
            <Box h={8}>
            <Text fontStyle='xl'>Dont't have an account? <Link to='/register'style={{color:'blue'}}>Register.</Link></Text>
            </Box>
            
        </Stack>
        
        </form>
            
    </Box>
    </Container>
  )
}

export default Login