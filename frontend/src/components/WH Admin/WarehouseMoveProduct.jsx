import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function WarehouseMoveProduct() {
  const [product, setProduct] = useState({
    id: null,
    title: "",
    product_id: null,
    warehouse_id: null,
    quantity: null,
  });
  const [warehouseList, setWarehouseList] = useState([]);
  const [oldWarehouse, setOldWarehouse] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [maxQuantity, setMaxQuantity] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:4000/getWarehouseProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const newData = {};
        Object.assign(newData, data[0]);
        setProduct(newData);
        setOldWarehouse(newData.warehouse_id);
        setMaxQuantity(newData.quantity);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/warehouse`)
      .then((res) => res.json())
      .then((data) => {
        setWarehouseList(data);
      });
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setProduct({ ...product, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`http://localhost:4000/moveProduct/${oldWarehouse}`, product)
        .then((res) => {
          if (res.data[0].message) {
            window.alert(res.data[0].message);
          }
        });

      navigate(`/admin/viewWarehouseProduct/${oldWarehouse}`);
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <div className="products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>Move Product: {product.title}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="inputForm">
        <form>
          <div class="mb-3">
            <label for="wName" class="form-label">
              Product is currently in warehouse {product.wName}
            </label>
          </div>

          <div class="mb-3">
            <label for="warehouse_id" class="form-label">
              Move to warehouse: &nbsp;
            </label>
            <select name="warehouse_id" onChange={handleChange} required>
              <option value="" selected disabled hidden>
                Choose here
              </option>
              {warehouseList.map((item) => (
                <option value={item.wId}> {item.wName} </option>
              ))}
            </select>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">
              Choose the quantity you want to move (max value {maxQuantity}
              ): &nbsp;
            </label>
            <input
              type="number"
              class="form-control"
              id="quantity"
              name="quantity"
              value={parseInt(product.quantity)}
              onChange={handleChange}
              max={parseInt(maxQuantity)}
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
}
