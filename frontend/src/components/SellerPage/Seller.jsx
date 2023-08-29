import { Link, Route, Routes } from "react-router-dom";
import Header from "../Layout/Header";
import SellerPage from "./SellerPage";
import SideBar from "../Layout/SideBar";
import SellerProducts from "./SellerProducts";
import SellerInboundOrders from "./SellerInboundOrders";
import SellerCreateProduct from "./SellerCreateProduct";
import SellerEditProduct from "./SellerEditProduct";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Seller() {
    const [auth, setAuth] = useState(false)
    const [msg, setMsg] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const handleLogout = () => {
        axios.get("http://localhost:4000/logout")
        .then(res => {
            window.location.reload(true);
        }).catch(err => console.log(err));
    }
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get("http://localhost:4000")
        .then(res => {
            if(res.data.Status === "Success") {
                console.log(res.data)
                setAuth(true)
                setName(res.data.name)
                setRole(res.data.role)
            } else {
                setAuth(false)
                setMsg(res.data.Error)
            }
        })
        .then(err => console.log(err))
    }, [])

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
            <div className="fixed-bottom">
                {
                    auth ? 
                    <div>
                        <h3>You are authorized {name} Role: {role}</h3>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                    :
                    <div>
                        <h3>{msg}</h3>
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    </div>
                }
            </div>
        </div>
    )
}