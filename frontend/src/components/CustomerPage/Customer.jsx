import {Route, Routes} from "react-router-dom";
// import HeaderCustomer from "../Layout/HeaderCustomer";
// import SideBar from "../Layout/SideBar";
import CustomerPage from "./CustomerPage";
import CartPage from "./CartPage";
import Checkout from "./Checkout";
import CategoryPage from "./CategoryPage";
import CartForm from "./CartForm";

export default function Customer() {
    return (
        <div>
            {/* <HeaderCustomer /> */}
            <div>
                <Routes>
                    <Route path="/" element={<CustomerPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/getProductByCate/:id" element={<CategoryPage />} />
                    <Route path="/cartForm/:id" element={<CartForm/>} />
                </Routes>
            </div>
        </div>
    )
}