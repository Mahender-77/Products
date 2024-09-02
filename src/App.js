// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ChakraProvider>
      <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          
       </Routes>
      </ChakraProvider>
    
      </BrowserRouter>
      
    </div>
  );
}

export default App;
