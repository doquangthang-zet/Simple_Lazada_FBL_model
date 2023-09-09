import React from 'react'
import Header from './Layout/Header'
import { Link, NavLink } from 'react-router-dom'
import {BsPlusSquare} from 'react-icons/bs'
import {PiMinusSquare} from 'react-icons/pi'
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
    const [auth, setAuth] = useState(false)
    const [msg, setMsg] = useState('')
    const [id, setId] = useState()
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const handleLogout = () => {
        axios.get("http://localhost:4000/logout")
        .then(res => {
            window.location.reload(true);
        }).catch(err => console.log(err));
    }
    // axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get("http://localhost:4000")
        .then(res => {
            if(res.data.Status === "Success") {
                console.log(res.data)
                setAuth(true)
                setId(res.data.id)
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
        <div className='container cart'>
            <h2>Your cart</h2>
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>
                                <div className='d-flex align-items-center p-2'>
                                    <BsPlusSquare />
                                    3
                                    <PiMinusSquare />
                                </div>
                            </td>
                            <td>@mdo</td>
                            <td>
                                <button type="button" class="actionBtn deleteBtn">Remove</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <div className='total'>Total Price: $1000</div>
            </div>

            <Link to="/checkout">
                <button type="button" class="actionBtn">Checkout</button>
            </Link>
            
        </div>
        {
            auth ? 
            <div>
                <h3>You are authorized {name} Role: {role} Id: {id}</h3>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                {
                    role === "seller" && (
                    <NavLink to='/seller/home'>
                        <button type="button" class="actionBtn">Seller</button>
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
                <h3>{msg}</h3>
                <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
        }
    </div>
  )
}

export default Cart