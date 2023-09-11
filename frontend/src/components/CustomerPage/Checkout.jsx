import React from 'react'
import Header from '../Layout/Header'

function Checkout() {
  return (
    <div>
        <Header />
        <section class="checkout">
            <div class="container">
                <div class="py-5 text-center">
                    <h2>Checkout form</h2>
                </div>

                <div class="row">
                    
                    <div class="col-md-12">
                        <div>
                            <h4 class="mb-3 text-center">Your Order</h4>
                            <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>
                                <div className='d-flex align-items-center p-2'>
                                    {/* <BsPlusSquare /> */}
                                    3
                                    {/* <PiMinusSquare /> */}
                                </div>
                            </td>
                            <td>3000</td>
                        </tr>
                    </tbody>
                </table>
                        </div>
                        <h4 class="mb-3 text-center">Billing address</h4>
                        <form class="needs-validation" novalidate>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="firstName">First name</label>
                                    <input type="text" class="form-control" id="firstName" name="firstName" placeholder="" value="" required />
                                    <div class="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="lastName">Last name</label>
                                    <input type="text" class="form-control" id="lastName" name="lastName" placeholder="" value="" required />
                                    <div class="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="email">Email <span class="text-muted">(Optional)</span></label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="you@example.com" />
                                <div class="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="address">Address</label>
                                <input type="text" class="form-control" id="address" name="address" placeholder="1234 Main St" required />
                                <div class="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <hr class="mb-4" />
                            <button class="actionBtn" type="submit">Checkout</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Checkout