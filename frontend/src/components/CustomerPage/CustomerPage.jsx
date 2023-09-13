import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { getAllCates, getOneCartItems, getProductByCate, saveNewCartItem, updateCartItem } from '../../api/app';
import { Link, NavLink, useNavigate } from "react-router-dom";

const CustomerPage = () => {
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
    const [cateId, setCateId] = useState("")
    const [order, setOrders] = useState({
        productId: 0,
        quantity: 1,
        customerId: 0
    })

    const [products, setProducts] = useState([])

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const [dataParams, setDataPrams] = useState({
        category: '',
        search: '',
        filter: '',
        sort: '',
    })
    const [cartItems, setCartItems] = useState([]);

    const [auth, setAuth] = useState(false)
    const [msg, setMsg] = useState('')
    const [userId, setUserId] = useState(JSON.parse(sessionStorage.getItem("user"))?.id || 0)
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const handleLogout = () => {
        axios.get("http://localhost:4000/logout")
        .then(res => {
            sessionStorage.removeItem("user");
            window.location.reload(true);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        fetchUser()
        fetchProduct()
        fetchCategories()
        fecthCartItems()
    }, []);

    useEffect(() => {
        browserProduct()
    }, [dataParams]);
    
      function fetchUser() {
        axios.get("http://localhost:4000")
        .then(res => {
            if(res.data.Status === "Success") {
                sessionStorage.setItem("user", JSON.stringify(res.data));
                console.log(res.data)
                setAuth(true)
                setUserId(res.data.id)
                setName(res.data.name)
                setRole(res.data.role)
            } else {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("cart");
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
        });
    } 
    function fetchCategories() {
        getAllCates().then(res => {
            setCategories(res.cate)
        })
    }

    function fecthCartItems() {
        console.log(userId)
        axios.get('http://localhost:4000/cart', {params: {id: userId}})
        .then((res) => {
            setCartItems(res.data);
        })
    }

    const config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }
    const add = (id) => {
        // console.log(id)
        let item = {productId: id, quantity: 1, customerId: userId}
        // console.log(item)
        setOrders({
            productId: id,
            quantity: 1,
            customerId: userId
        })
        getOneCartItems(userId, id).then(res => {
            if (res.length > 0) {
                item.quantity = res[0].quantity + 1
                updateCartItem(res[0].id, item)
        fecthCartItems()
            } else {
                saveNewCartItem(item)
                fecthCartItems()
            }
        })
        // console.log(order)
        
        // addToCart()
    }

    const handleChange = ({ currentTarget: input }) => {
        setDataPrams( { ...dataParams, [input.name]: input.value });
        console.log(dataParams)
    };

    const browserProduct = () => {
        console.log(userId)
        axios.get('http://localhost:4000/filteredData', {params: dataParams})
        .then((res) => {
            setProducts(res.data);
            console.log(res.data)
        })
    }

    return (
        <div className='products'>
            <div class="headerLazada">
                <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
                    <div class="container">
                        <a class="navbar-brand col-3" href="/customer"><img src={imageBasePath + "lazada-logo.jpg"} class="logo" alt="logo" style={{width: 6.5+ 'em', height: 4 + 'em'}}/></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <form class="form-inline my-2 my-lg-0 w-100">
                                <input class="form-control mr-sm-2 border-0 rounded w-100" style={{backgroundColor: "#F3F9FB"}} type="search" placeholder="Search" aria-label="Search" name="search" value={dataParams.search} onChange={handleChange} />
                                {/* <button class="btn btn-outline-blue my-2 my-sm-0" type="submit">Search</button> */}
                            </form>

                            <div class="col-3 d-flex justify-content-center align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person text-primary m-2" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                </svg>
                                {name}
                            </div>
                            <NavLink to={'/cart'} class="col-3 d-flex justify-content-right align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart text-primary m-2" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                Cart ({cartItems.length})
                            </NavLink>
                        </div>

                        {
                            auth ? 
                            <div>
                                {/* <h3>You are authorized {name} Role: {role} Id: {userId}</h3> */}
                                <button className="btn btn-danger m-2" onClick={handleLogout}>Logout</button>
                                {
                                    role === "seller" && (
                                    <NavLink to={`/seller/${userId}/home`}>
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
                                {/* <h3>{msg}</h3> */}
                                <Link to="/login" className="btn btn-primary">Login</Link>
                            </div>
                        }
                    </div>
                </nav>
            </div>

            <div class = "container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="homepage btn-group" role="group">

                            <label for="category">Choose a cartegory:  </label>
                            <select name="category" id="category" value={dataParams.category} onChange={handleChange}>
                                <option value="">Un-categorized</option>
                                {categories.length > 0 && categories.map(cate => (
                                    <option value={cate._id}>{cate.name}</option>
                                ))}
                            </select>

                            <label for="filter">Filter by Price:  </label>
                            <select name="filter" id="filter" value={dataParams.filter} onChange={handleChange}>
                                <option value="">None filter</option>
                                <option value="smaller1000">Smaller than $1000</option>
                                <option value="larger1000less2000">From $1000 to $2000</option>
                                <option value="larger2000">Larger than $2000</option>
                            </select>

                            <label for="sort">Sort data:  </label>
                            <select name="sort" id="sort" value={dataParams.sort} onChange={handleChange}>
                                <option value="">No Sorting</option>
                                <option value="newest">Newest Product</option>
                                <option value="oldest">Oldest Product</option>
                                <option value="cheapest">Cheapest Product</option>
                                <option value="expensive">Most Expensive Product</option>
                            </select>
                            {/* {categories && categories.map(cate => (
                                <button type="button" class="btn btn-outline-info">{cate.name}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                    </svg>
                                </button>
                            ))} */}
                            {/* <input type="button" onClick={() => browserProduct()} value='Browser' class="btn btn-primary" /> */}
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row g-2">
                    {products && products?.map(item => (
                         <div class="card col-xl-3 col-lg-3 col-md-3 col-sm-6 product-card" style={{width: 18+'rem'}}>
                         {/* <a class="card-block stretched-link text-decoration-none " href> */}
                             <img class="card-img-top" src={imageBasePath + item.image} alt="Card image cap" />
                             <div class="card-body">
                                 <h5 class="card-title">{item.title}</h5>
                                 <p class = "card-text">{item.description}</p>
                                 <p class="card-text">{item.price}</p>
                                 {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                             </div>
                             <input type="button" onClick={() => add(item.id)} value='Add to cart' class="btn btn-primary" />
                             {/* <form onSubmit={add(item.id)}>
                                <input type="hidden" name="id" value={item.id} />
                                <input type="hidden" name="name" value={item.title} />
                                <input type="hidden" name="price" value={item.price} />
                                <input type="hidden" name="categrory" value={item.category} />
                                <input type="hidden" name="sellerid" value={item.sellerId} />
                                <input type="hidden" name="quantity" value="1" />

                                <input type="submit" onClick={() => console.log("hello")} value='Add to cart' class="btn btn-primary" />
                             </form> */}
                         {/* </a> */}
                     </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CustomerPage;
