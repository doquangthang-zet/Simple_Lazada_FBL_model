import { NavLink } from "react-router-dom";

export default function SellerProducts () {
    return (
        <div className="products">
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
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                            <th scope="col">Length</th>
                            <th scope="col">Width</th>
                            <th scope="col">Height</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>
                                <NavLink to="/seller/editProduct">
                                    <button type="button" class="actionBtn editBtn">Edit</button>
                                </NavLink>
                                
                                <button type="button" class="actionBtn deleteBtn">Delete</button>
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
                            <td>sdlfslskfsklfnslm.,cmlskfsldfsknclklsfkjlamdmclasdd</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <NavLink to="/seller/newProduct">
                <button type="button" class="actionBtn">Create</button>
            </NavLink>
        </div>  
    )
}