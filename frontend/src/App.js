import './App.css';
import { Route, Routes } from 'react-router-dom';
import Seller from './components/SellerPage/Seller';
import WHAdmin from './components/WH Admin/WHAdmin';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Seller />} />
        <Route path="/seller/*" element={<Seller />} />
        <Route path="/admin/*" element={<WHAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
