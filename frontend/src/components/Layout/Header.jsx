import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header () {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
    const [auth, setAuth] = useState(false)
    const [msg, setMsg] = useState('')
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("user"))?.id || 0)
    const [name, setName] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        fetchUser()
    }, []);

    function fetchUser() {
        axios.get("http://localhost:4000")
        .then(res => {
            if(res.data.Status === "Success") {
                localStorage.setItem("user", JSON.stringify(res.data));
                console.log(res.data)
                setAuth(true)
                setUserId(res.data.id)
                setName(res.data.name)
                setRole(res.data.role)
            } else {
                localStorage.removeItem("user");
                localStorage.removeItem("cart");
                setAuth(false)
                setMsg(res.data.Error)
            }
        })
        .then(err => console.log(err))
    }

    const handleLogout = () => {
        axios.get("http://localhost:4000/logout")
        .then(res => {
            localStorage.removeItem("user");
            window.location.reload(true);
        }).catch(err => console.log(err));
    }
    return(
        <div class="headerLazada">
            <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
                <div class="container">
                    <a class="navbar-brand col-3" href="/"><img src={imageBasePath + "lazada-logo.jpg"} class="logo" alt="logo" /></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="form-inline my-2 my-lg-0 w-100">
                            <input class="form-control mr-sm-2 border-0 rounded w-100" style={{backgroundColor: "#F3F9FB"}} type="search" placeholder="Search" aria-label="Search" />
                            {/* <button class="btn btn-outline-blue my-2 my-sm-0" type="submit">Search</button> */}
                        </form>

                        <div class="col-3 d-flex justify-content-center align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person text-primary m-2" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                            </svg>
                            {name.toUpperCase()}
                        </div>
                    </div>

                    {
                        auth ? 
                        <div>
                            {/* <h3>You are authorized {name} Role: {role} Id: {userId}</h3> */}
                            <button className="btn btn-danger m-2" onClick={handleLogout}>Logout</button>
                            {
                                role === "seller" && (
                                <NavLink to={`/seller/${userId}/home`}>
                                    <button type="button" class="actionBtn m-2">Seller</button>
                                </NavLink>
                                )
                            }
                            
                            {
                                role === "admin" && (
                                <NavLink to='/admin/category'>
                                    <button type="button" class="actionBtn">Admin</button>
                                </NavLink>
                            )
                            }
                        </div>
                        :
                        <div>
                            {/* <h3>{msg}</h3> */}
                            <Link to="/login" className="btn btn-primary">Login</Link>
                        </div>
                    }
                </div>
            </nav>
        </div>
        
    )
}