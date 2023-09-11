import {Route, Routes} from "react-router-dom";
import HeaderCustomer from "../Layout/HeaderCustomer";
// import SideBar from "../Layout/SideBar";
import CustomerPage from "./CustomerPage";
import CartPage from "./CartPage";
import Checkout from "./Checkout";

export default function Customer() {
    return (
        <div>
            {/* <HeaderCustomer /> */}
            <div>
                <Routes>
                    <Route path="/" element={<CustomerPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
        </div>
    )
}