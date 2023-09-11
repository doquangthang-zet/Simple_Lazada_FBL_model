import React, {useEffect, useState} from 'react';
import { deleteOrderByID } from '../../api/app';

const Cart = () => {
    var imageBasePath = window.location.protocol+ "//" + window.location.host + "/images";
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fecthCart()
    },[])
    function fecthCart() {
        fetch('http://localhost:4000/cart')
        .then((res)=> res.json())
        .then((data) => {
            setCart(data);
        })
    }

    const handleDelete = (order) => {
        deleteOrderByID(order.id)
        window.location.reload();
      }
    return (
        <div className='products'>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="titlepage">
                            <h2>Product's Table</h2>
                        </div>
                    </div>
                </div>
            </div>
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
                            {cart && cart.map(item => (
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button type="button" class="actionBtn">Check Out</button>
                                        <button type="button" class="actionBtn deleteBtn" onClick={() => handleDelete(item)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

    );
}
export default Cart;