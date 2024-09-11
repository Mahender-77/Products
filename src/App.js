// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
function App() {
  return (
    <div style={{backgroundColor:"whitesmoke", border:"0.5px solid whitesmoke",minHeight:"100vh"}}>
      <BrowserRouter>
      <ChakraProvider>
      <Navbar />
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/productDetails/:id' element={<ProductDetails/>}/>
       </Routes>
      </ChakraProvider>
    
      </BrowserRouter>
      
    </div>
  );
}

export default App;
