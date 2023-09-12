// import React, { useEffect, useState } from 'react';
// import { getOneProduct } from '../../api/app';
// import { useNavigate, useParams } from "react-router-dom";
// import {BsPlusSquare} from 'react-icons/bs'
// import {PiMinusSquare} from 'react-icons/pi'
// import axios from 'axios';

// const CartForm = () => {
//     var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
//     const [order, setOrders] = useState({
//         productId: 0,
//         title: '',
//         price: 0,
//         quantity: 1,
//         category: '',
//         sellerId: 0
//     })

//     const params = useParams();
//     const [productId, setProductId] = useState(params.id)

//     useEffect(()=> {
//         getOneProduct(productId).then(res => {
//             console.log(res[0].title)
//             setOrders({
//                 productId: res[0].id,
//                 title: res[0].title,
//                 price: res[0].price,
//                 quantity: 1,
//                 category: res[0].category,
//                 sellerId: res[0].sellerId
//             })
//             // setProduct(res[0])
//             console.log(order)
//         })
//     },[])
//     // console.log(params.id)
    
//     const config = {
//         headers: {
//             "Content-Type": 'multipart/form-data'
//         }
//     }

//     function fetchCart()  {
//         getOneProduct(productId).then(res => {
//             console.log(res[0].title)
//             setOrders({
//                 productId: res[0].id,
//                 title: res[0].title,
//                 price: res[0].price,
//                 quantity: 1,
//                 category: res[0].category,
//                 sellerId: res[0].sellerId
//             })
//         })
//         console.log(order)
//     }

//     const addToCart = async (e) => {
//         e.preventDefault();
//         console.log(order)
//         try {
//             await axios
//             .post("http://localhost:4000/addToCart", order, config)
//         } catch (err) {
//             console.log(err)
//         }
//     }


//     return (
//         <div className='products'>
//             <div class="container">
//                 <div class="row">
//                     <div class="col-md-12">
//                         <div class="titlepage">
//                             <h2>Add to Cart</h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='inputForm'>
//                 <form onSubmit={addToCart}>
//                     <label for="title">Product Name</label>
//                     <input type="text" class="form-control" name="title" placeholder={order.title} value={order.title} readOnly/>
//                     <label for="title">Price</label>
//                     <input type="text" class="form-control" name="title" placeholder={order.price} value={order.price} readOnly/>
//                     <label for="title">Quantity</label>
//                     {/* <BsPlusSquare /> */}
//                     <input type="text" class="form-control" name="title" placeholder={order.quantity} value={order.quantiy} readOnly/>
//                     {/* <PiMinusSquare /> */}
//                     <div className='total'>Total Price: {order.price}</div>
//                     <button type="button" class="btn btn-primary">Add to Cart</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default CartForm;
