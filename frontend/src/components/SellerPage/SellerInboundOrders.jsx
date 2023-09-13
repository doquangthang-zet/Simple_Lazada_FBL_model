import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SellerInboundOrders() {
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const [product, setProduct] = useState([]);
  const [inbound, setInbound] = useState({
    productId: null,
    quantity: null,
  });


  useEffect(() => {
    fetch(`http://localhost:4000/getSellerProduct/${sellerId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setInbound({ ...inbound, [input.name]: input.value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(inbound);
      try {
        await axios
          .post(`http://localhost:4000/createInbound`, inbound)
          .then((res) => {
            if (res.data[0].message) {
              window.alert(res.data[0].message);
            }
          });

        navigate(`/seller/${sellerId}/products`);
      } catch (err) {
        window.alert(err);
      }
    };

  return (
    // <div>params: {sellerId}</div>
    <div className="products">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="titlepage">
              <h2>Inbound Orders</h2>
            </div>
          </div>
        </div>
      </div>

      <div>
        <form>
          <div class="mb-3">
            <label for="product" class="form-label">
              Product
            </label>
          </div>

          {product == null ? (
            <div> You have no product</div>
          ) : (
            <div class="mb-3">
              <select name="productId" onChange={handleChange} required>
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                {product.map((item) => (
                  <option value={item.id}> {item.title} </option>
                ))}
              </select>

              <div class="mb-3">
                <label for="quantity" class="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="quantity"
                  name="quantity"
                  placeholder="Enter quantity"
                  value={inbound.quantity}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" class="actionBtn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
