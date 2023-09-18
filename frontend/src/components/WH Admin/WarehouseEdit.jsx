import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";


export default function  WarehouseEdit() {
  const [warehouse, setWarehouse] = useState(
    {
      wId: 0,
      wName: "",
      address: "",
      volume: 0,
    },
  );
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/getWarehouse/${id}`)
      .then((res) => res.json())
      .then((data) => {
      const newData = {}; 
      Object.assign(newData, data[0]);
        setWarehouse(newData)
      });
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setWarehouse({ ...warehouse, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sentId  = warehouse.wId
    try {
      await axios.put(`http://localhost:4000/editWarehouse/${sentId}`, warehouse)
      .then( (res) => 
      window.alert(res.data) );
      navigate("/admin/warehouse");
    } catch (err) {}
  };

  return (
    <div className="products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>Edit Warehouse</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="inputForm">
        <form>
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

          <button type="submit" class="actionBtn" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};