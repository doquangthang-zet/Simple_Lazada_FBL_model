import React from 'react'
import Header from './Layout/Header'
import { Link } from 'react-router-dom'
import {BsPlusSquare} from 'react-icons/bs'
import {PiMinusSquare} from 'react-icons/pi'

function Cart() {
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
    </div>
  )
}

export default Cart