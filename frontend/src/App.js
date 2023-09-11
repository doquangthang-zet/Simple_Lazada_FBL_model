import './App.css';
import { Route, Routes } from 'react-router-dom';
import Seller from './components/SellerPage/Seller';
import Customer from './components/CustomerPage/Customer';

import Register from './components/AuthPage/Register';
import Login from './components/AuthPage/Login';
import SellerRegister from './components/AuthPage/SellerRegister';
import AdminRegister from './components/AuthPage/AdminRegister';
import WHAdmin from './components/WH Admin/WHAdmin';
import axios from 'axios';

function App() {
  axios.defaults.withCredentials = true;
  return (
    <div>
      <Routes>
        <Route path='/' element={<Seller />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/sellerRegister' element={<SellerRegister />} />
        <Route path='/adminRegister' element={<AdminRegister />} />
        <Route path='/seller/*' element={<Seller />} />
        <Route path = '/customer/*' element={<Customer />} />
        <Route path="/admin/*" element={<WHAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
