import './App.css';
import { Route, Routes } from 'react-router-dom';
import Seller from './components/SellerPage/Seller';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<Seller />} />
        <Route path='/seller/*' element={<Seller />} />
      </Routes>
    </div>
  );
}

export default App;
