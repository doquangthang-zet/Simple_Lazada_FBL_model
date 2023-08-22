import { Route, Routes } from "react-router-dom";
import Header from "../Layout/Header";
import SellerPage from "./SellerPage";
import SideBar from "../Layout/SideBar";
import SellerProducts from "./SellerProducts";
import SellerInboundOrders from "./SellerInboundOrders";
import SellerCreateProduct from "./SellerCreateProduct";
import SellerEditProduct from "./SellerEditProduct";

export default function Seller() {
    return (
        <div>
            <Header />
            <SideBar />
            <div>
                <Routes>
                    <Route path='/home' element={<SellerPage />} />
                    <Route path='/products' element={<SellerProducts />} />
                    <Route path='/orders' element={<SellerInboundOrders />} />
                    <Route path='/newProduct' element={<SellerCreateProduct />} />
                    <Route path='/editProduct' element={<SellerEditProduct />} />
                </Routes>
            </div>
            
        </div>
    )
}