
import './App.css'
import Home from './components/Home'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import {CartProvider} from './components/ContextReducer';
import MyOrder from './components/screens/Myorder';










function App() {
  return (
    <>
    
    
    {/* <Home></Home> */}
    <CartProvider>

     <Router>
      <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/CreateUser" element={<Signup />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/myOrder" element={<MyOrder />} />
        
        
      </Routes>
      </div>
    </Router>
    </CartProvider>
    </>
  );
}

export default App
