import {Route, Routes} from "react-router-dom";
import HeaderCustomer from "../Layout/HeaderCustomer";
// import SideBar from "../Layout/SideBar";
import CustomerPage from "./CustomerPage";
import Cart from "./Cart";

export default function Customer() {
    return (
        <div>
            <HeaderCustomer />
            {/* <SideBar /> */}
            <div>
                <Routes>
                    <Route path="/" element={<CustomerPage />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </div>
    )
}