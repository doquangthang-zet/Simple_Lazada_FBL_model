import React, { useEffect, useState } from "react";
import { checkQuantity, deleteCartItemsByID, deleteOrderByID, updateCartItem } from "../../api/app";
import axios from "axios";
// import Header from './Layout/Header'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";
import { PiMinusSquare } from "react-icons/pi";
import Header from "../Layout/Header";

const Cart = () => {
  var imageBasePath =
    window.location.protocol + "//" + window.location.host + "/images";
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const [auth, setAuth] = useState(false);
  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState(
    JSON.parse(sessionStorage.getItem("user"))?.id || 0
  );
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const handleLogout = () => {
    axios
      .get("http://localhost:4000/logout")
      .then((res) => {
        sessionStorage.removeItem("user");
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  // axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchUser();
    fetchProduct();
    fecthCartItems();
  }, []);

  function fetchUser() {
    axios
      .get("http://localhost:4000")
      .then((res) => {
        if (res.data.Status === "Success") {
          sessionStorage.setItem("user", JSON.stringify(res.data));
          console.log(res.data);
          setAuth(true);
          setUserId(res.data.id);
          setName(res.data.name);
          setRole(res.data.role);
        } else {
          sessionStorage.removeItem("user");
          setAuth(false);
          setMsg(res.data.Error);
          navigate("/login")
        }
      })
      .then((err) => console.log(err));
  }
  function fetchProduct() {
    fetch(`http://localhost:4000/product`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
          console.log(data)
      });
  }

  function fecthCartItems() {
    console.log(userId);
    axios
      .get("http://localhost:4000/cart", { params: { id: userId } })
      .then((res) => {
        setCartItems(res.data);
        console.log(res.data);
      });
  }

  const handleDelete = (item) => {
    deleteCartItemsByID(item.id);
    window.location.reload();
  };

  let total = 0;
  for (const proId of cartItems) {
    const price = products.find((p) => p.id === proId.productId)?.price * proId.quantity || 0;
    total += price;
  }

  const addQuantity = (item) => {
    let newItem = {productId: item.productId, quantity: item.quantity + 1, customerId: item.customer_id}
    updateCartItem(item.id, newItem)
    window.location.reload();
  };

  const minusQuantity = (item) => {
    let newItem = {productId: item.productId, quantity: item.quantity - 1, customerId: item.customer_id}

    if(newItem.quantity === 0) {
      deleteCartItemsByID(item.id)
      updateCartItem(item.id, newItem)
      window.location.reload();
    } else {
      updateCartItem(item.id, newItem)
      window.location.reload();
    }
  };

  function checkout() {
    checkQuantity(userId).then(res => console.log(res))
    sessionStorage.setItem("cart", JSON.stringify([cartItems, total]));
    navigate("/checkout");
  }

  return (
    <div>
      <Header />
      <div className="container cart">
        <h2>Your cart</h2>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Product ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems &&
                cartItems.map((item) => (
                  <tr>
                    <th scope="row">{item.productId}</th>
                    <td>
                      {
                        products?.filter((p) => p.id == item.productId)[0]
                          ?.title
                      }
                    </td>
                    <td>
                      {
                        products?.filter((p) => p.id == item.productId)[0]
                          ?.price
                      }
                    </td>
                    <td>
                      <div className='d-flex align-items-center p-2'>
                          <BsPlusSquare className="m-2" onClick={() => addQuantity(item)} />
                          {item.quantity}
                          <PiMinusSquare className="m-2" onClick={() => minusQuantity(item)} />
                      </div>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="actionBtn deleteBtn"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="total">Total Price: ${total}</div>
        </div>

        {/* <Link to="/checkout"> */}
        <button type="button" class="actionBtn" onClick={() => checkout()}>
          Checkout
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};
export default Cart;
