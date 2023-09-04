import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function WarehouseMoveProduct() {
      const [product, setProduct] = useState({
        id: 0,
        product_id: 0,
        warehouse_id: 0,
        quantity: 0,
      });
      const [warehouseList, setWarehouseList] = useState([])
      const [oldWarehouse, setOldWarehouse] = useState(0);
      const { id } = useParams();
      const navigate = useNavigate();

      useEffect(() => {
        fetch(`http://localhost:4000/getWarehouseProduct/${id}`)
          .then((res) => res.json())
          .then((data) => {
            const newData = {};
            Object.assign(newData, data[0]);
            setProduct(newData);
            setOldWarehouse(newData.warehouse_id);

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
            const sentId = product.id;
            try {
              await axios.put(
                `http://localhost:4000/moveProduct`,
                product
              );
              navigate(`/admin/viewWarehouseProduct/${oldWarehouse}`);
            } catch (err) {}
          };

      return (
    <div className="products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>Move Product No.{product.product_id}</h2>
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
            <select name="warehouse_id" onChange={handleChange}>
                {warehouseList.map( (item) => (
                    <option value = {item.wId}> {item.wName} </option>
                ))}
            </select>
          </div>

          <button type="submit" class="actionBtn" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}