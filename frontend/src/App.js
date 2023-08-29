import './App.css';
import { Route, Routes } from 'react-router-dom';
import Seller from './components/SellerPage/Seller';
import Customer from './components/CustomerPage/Customer';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<Seller />} />
        <Route path='/seller/*' element={<Seller />} />
        <Route path = '/customer/*' element={<Customer />} />
      </Routes>
    </div>
  );
}

export default App;
