import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function WarehouseCreate() {

  const [warehouse, setWarehouse] = useState({
    wId: '',
    wName: '',
    address: '',
    volume: 0
  });
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setWarehouse( { ...warehouse, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/createWarehouse", warehouse)
      navigate("/admin/warehouse");
    } catch (err) {
    } 
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
            <label for="wId" class="form-label">
              Warehouse ID
            </label>
            <input
              type="text"
              class="form-control"
              id="wId"
              name="wId"
              value={warehouse.wId}
              onChange={handleChange}
              required
            />
          </div>

          <div class="mb-3">
            <label for="wName" class="form-label">
              Warehouse Name
            </label>
            <input
              type="text"
              class="form-control"
              id="wName"
              name="wName"
              value={warehouse.wName}
              onChange={handleChange}
              required
            />
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">
              Warehouse Address
            </label>
            <input
              type="text"
              class="form-control"
              id="address"
              name="address"
              value={warehouse.address}
              onChange={handleChange}
              required
            />
          </div>

          <div class="mb-3">
            <label for="volume" class="form-label">
              Warehouse Volume
            </label>
            <input
              type="number"
              class="form-control"
              id="volume"
              name="volume"
              placeholder="Enter volume"
              value={warehouse.volume}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" class="actionBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
