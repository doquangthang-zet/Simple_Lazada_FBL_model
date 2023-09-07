import { NavLink } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WarehouseList() {
  const [warehouse, setWarehouse] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/warehouse`)
      .then((res) => res.json())
      .then((data) => {
        setWarehouse(data);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:4000/deleteWarehouse/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>Warehouse List</h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Volume</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouse.map((item) => (
              <tr>
                <th> {item.wId} </th>
                <td> {item.wName} </td>
                <td> {item.address} </td>
                <td> {item.volume} </td>
                <td>
                  <NavLink to={`/admin/editWarehouse/${item.wId}`}>
                    <button type="button" class="actionBtn editBtn">
                      Edit
                    </button>
                  </NavLink>

                  <NavLink to={`/admin/viewWarehouseProduct/${item.wId}`}>
                    <button type="button" class="actionBtn editBtn">
                      Product
                    </button>
                  </NavLink>

                  <button
                    type="button"
                    class="actionBtn deleteBtn"
                    onClick={() => handleDelete(item.wId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NavLink to="/admin/newWarehouse">
        <button type="button" class="actionBtn">
          Create
        </button>
      </NavLink>
    </div>
  );
}
