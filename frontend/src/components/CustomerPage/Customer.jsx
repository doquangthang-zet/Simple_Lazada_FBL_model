import {Route, Routes} from "react-router-dom";
import HeaderCustomer from "../Layout/HeaderCustomer";
// import SideBar from "../Layout/SideBar";
import CustomerPage from "./CustomerPage";

export default function Customer() {
    return (
        <div>
            <HeaderCustomer />
            {/* <SideBar /> */}
            <div>
                <Routes>
                    <Route path="/home" element={<CustomerPage />} />
                </Routes>
            </div>
        </div>
    )
}