import React, {useEffect, useState} from 'react';
import { deleteCartItemsByID, deleteOrderByID } from '../../api/app';
import axios from 'axios';
// import Header from './Layout/Header'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {BsPlusSquare} from 'react-icons/bs'
import {PiMinusSquare} from 'react-icons/pi'
import Header from '../Layout/Header';

const Cart = () => {
    var imageBasePath = window.location.protocol+ "//" + window.location.host + "/images";
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([])

    const [auth, setAuth] = useState(false)
    const [msg, setMsg] = useState('')
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("user"))?.id || 0)
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const handleLogout = () => {
        axios.get("http://localhost:4000/logout")
        .then(res => {
            localStorage.removeItem("user");
            window.location.reload(true);
        }).catch(err => console.log(err));
    }
    // axios.defaults.withCredentials = true;

    useEffect(() => {
        fetchUser()
        fetchProduct()
        fecthCartItems()
    },[]) 

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
                setAuth(false)
                setMsg(res.data.Error)
            }
        })
        .then(err => console.log(err))
    }
    function fetchProduct() {
        fetch(`http://localhost:4000/product`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          console.log(data)
        });
    } 

    function fecthCartItems() {
        console.log(userId)
        axios.get('http://localhost:4000/cart', {params: {id: userId}})
        .then((res) => {
            setCartItems(res.data);
        })
    }

    const handleDelete = (item) => {
        deleteCartItemsByID(item.id)
        window.location.reload();
      }

      let total = 0;
      for(const proId of cartItems) {
        const price = products.find(p => p.id === proId.productId)?.price || 0;
        total += price
      }
    
    function checkout() {
        localStorage.setItem("cart", JSON.stringify([cartItems, total]))
        navigate("/checkout")
    }
    
    return (
        <div>
            <Header />
            <div className='container cart'>
                <h2>Your cart</h2>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems && cartItems.map(item => (
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{products?.filter(p => p.id == item.productId)[0]?.title}</td>
                                    <td>{products?.filter(p => p.id == item.productId)[0]?.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button type="button" class="actionBtn deleteBtn" onClick={() => handleDelete(item)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='total'>Total Price: ${total}</div>
                </div>

                {/* <Link to="/checkout"> */}
                    <button type="button" class="actionBtn" onClick={() => checkout()}>Checkout</button>
                {/* </Link> */}
                
            </div>
            {
                auth ? 
                <div>
                    <h3>You are authorized {name} Role: {role} Id: {userId}</h3>
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
    );
}
export default Cart;