import './App.css';
import { Route, Routes } from 'react-router-dom';
import Seller from './components/SellerPage/Seller';
import Register from './components/AuthPage/Register';
import Login from './components/AuthPage/Login';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SellerRegister from './components/AuthPage/SellerRegister';
import AdminRegister from './components/AuthPage/AdminRegister';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Seller />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/sellerRegister' element={<SellerRegister />} />
        <Route path='/adminRegister' element={<AdminRegister />} />
        <Route path='/seller/*' element={<Seller />} />
      </Routes>
    </div>
  );
}

export default App;
