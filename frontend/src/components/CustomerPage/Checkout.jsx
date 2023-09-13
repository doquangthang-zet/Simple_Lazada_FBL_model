import Header from "../Layout/Header";
import React, { useEffect, useState } from "react";
import { deleteCartItemsByID, deleteOrderByID } from "../../api/app";
import axios from "axios";
// import Header from './Layout/Header'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";
import { PiMinusSquare } from "react-icons/pi";

function Checkout() {
  var imageBasePath =
    window.location.protocol + "//" + window.location.host + "/images";
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const [auth, setAuth] = useState(false);
  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("user")).id
  );
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [outboundOrder, setOutboundOrder] = useState([]);
  let total = 0;
  const [order, setOrder] = useState({
    total: JSON.parse(localStorage.getItem("cart"))[1],
    customer_id: userId,
    f_name: "",
    l_name: "",
    email: "",
    address: "",
    delivery_status: false,
  });

  const handleLogout = () => {
    axios
      .get("http://localhost:4000/logout")
      .then((res) => {
        localStorage.removeItem("user");
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  // axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchUser();
    fetchProduct();
    fecthCartItems();
    fecthcurrentOrder();
    console.log(outboundOrder);
  }, []);

  function fetchUser() {
    axios
      .get("http://localhost:4000")
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log(res.data);
          setAuth(true);
          // setUserId(res.data.id)
          setName(res.data.name);
          setRole(res.data.role);
        } else {
          setAuth(false);
          setMsg(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  }
  function fetchProduct() {
    fetch(`http://localhost:4000/product`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      });
  }

  function fecthCartItems() {
    axios
      .get("http://localhost:4000/cart", { params: { id: userId } })
      .then((res) => {
        setCartItems(res.data);
      });
  }

  function fecthcurrentOrder() {
    axios.get("http://localhost:4000/getOneOrder/" + userId).then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        setOutboundOrder(res.data);
        setOrder({
          total: JSON.parse(localStorage.getItem("cart"))[1],
          customer_id: userId,
          f_name: res.data[0].f_name,
          l_name: res.data[0].l_name,
          email: res.data[0].email,
          address: res.data[0].address,
          delivery_status: false,
        });
      }
    });
  }

  const handleChange = ({ currentTarget: input }) => {
    setOrder({ ...order, [input.name]: input.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      if (outboundOrder.length > 0) {
        await axios.put("http://localhost:4000/editOrder", order);
        navigate("/placedOrder");
      } else {
        await axios.post("http://localhost:4000/createOrder", order);
        navigate("/placedOrder");
      }
    } catch (err) {
      console.log(err);
    } // fetchProduct()
  };

  for (const proId of cartItems) {
    const price =
      products.find((p) => p.id === proId.productId)?.price * proId.quantity ||
      0;
    total += price;
  }

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
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems &&
                      cartItems.map((item) => (
                        <tr>
                          <th scope="row">{item.id}</th>
                          <td>
                            {
                              products?.filter(
                                (p) => p.id === item.productId
                              )[0]?.title
                            }
                          </td>
                          <td>{item.quantity}</td>
                          <td>
                            {
                              products?.filter(
                                (p) => p.id === item.productId
                              )[0]?.price
                            }
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="total">Total Price: ${order.total}</div>

              <h4 class="mb-3 text-center">Billing address</h4>
              <form class="needs-validation" novalidate onSubmit={placeOrder}>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName">First name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      name="f_name"
                      placeholder="Enter first name"
                      value={order.f_name}
                      onChange={handleChange}
                      required
                    />
                    <div class="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName">Last name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      name="l_name"
                      placeholder="Enter last name"
                      value={order.l_name}
                      onChange={handleChange}
                      required
                    />
                    <div class="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email">
                    Email <span class="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    value={order.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  <div class="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div class="mb-3">
                  <label for="address">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    name="address"
                    value={order.address}
                    onChange={handleChange}
                    placeholder="1234 Main St"
                    required
                  />
                  <div class="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <hr class="mb-4" />
                <button class="actionBtn" type="submit">
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
