import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function WarehouseCreate() {

  const [warehouse, setWarehouse] = useState({
    warehouseName: '',
    warehouseAddress: '',
    warehouseVolume: 0
  });
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setWarehouse( { ...warehouse, [input.name]: input.value });
    console.log(warehouse)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/createWarehouse", warehouse)
    .then(res => {
      if(res.data.Status === "Success") {
        navigate('/warehouse')
      } else {
        alert("Error")
      }
    });
  }

  return (
    <div className="products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>New Warehouse</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="inputForm">
        <form on onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="warehouseName" class="form-label">
              Warehouse Name
            </label>
            <input
              type="text"
              class="form-control"
              id="warehouseName"
              name="warehouseName"
              value={warehouse.warehouseName}
              onChange={handleChange}
              required
            />
          </div>

          <div class="mb-3">
            <label for="warehouseAddress" class="form-label">
              Warehouse Address
            </label>
            <input
              type="text"
              class="form-control"
              id="warehouseAddress"
              name="warehouseAddress"
              value={warehouse.warehouseAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div class="mb-3">
            <label for="warehouseVolume" class="form-label">
              Warehouse Volume
            </label>
            <input
              type="number"
              class="form-control"
              id="warehouseVolume"
              name="warehouseVolume"
              placeholder="Enter volume"
              value={warehouse.warehouseVolume}
              onChange={handleChange}
              required
            />
          </div>

          <div class="mb-3">
            <label for="warehouseImage" class="form-label">
              Warehouse Image
            </label>
            <input type="file" class="form-control" id="warehouseImage" />
          </div>

          <button
            type="submit"
            class="actionBtn"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
