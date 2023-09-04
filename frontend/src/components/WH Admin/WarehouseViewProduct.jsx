import { NavLink, useParams } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WarehouseViewProduct() {
    const [product, setProduct] = useState([]);
    const [warehouseName, setWarehouseName] = useState("")

      useEffect(() => {
        fetch(`http://localhost:4000/viewWarehouseProduct/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setProduct(data);
            setWarehouseName(data[0].wName)
          });
      }, []);

        const { id } = useParams();

        return (
          <div className="products">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="titlepage">
                    <h2>Product List of Warehouse {warehouseName}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Product Id</th>
                    <th scope="col">Product Quantity</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item) => (
                    <tr>
                      <th> {item.product_id} </th>
                      <td> {item.quantity} </td>
                      <td>
                        <NavLink to={`/admin/moveWarehouseProduct/${item.id}`}>
                          <button type="button" class="actionBtn editBtn">
                            Move Product
                          </button>
                        </NavLink>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
}