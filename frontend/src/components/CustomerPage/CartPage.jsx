import React, { useEffect, useState } from "react";
import { checkQuantity, deleteCartItemsByID, deleteOrderByID, updateCartItem } from "../../api/app";
import axios from "axios";
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
  const [userId, setUserId] = useState(
    JSON.parse(sessionStorage.getItem("user"))?.id || 0
  );

  useEffect(() => {
    fetchUser();
    fetchProduct();
    fecthCartItems();
  }, []);

  // Check if user logged in or not
  function fetchUser() {
    axios
      .get("http://localhost:4000")
      .then((res) => {
        if (res.data.Status === "Success") {
          setUserId(res.data.id);
        } else {
          navigate("/login")
        }
      })
      .then((err) => console.log(err));
  }

  // Get all products
  function fetchProduct() {
    fetch(`http://localhost:4000/product`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }

  // Get all items in cart
  function fecthCartItems() {
    axios
      .get("http://localhost:4000/cart", { params: { id: userId } })
      .then((res) => {
        setCartItems(res.data);
      });
  }

  // Delete an item in cart
  const handleDelete = (item) => {
    deleteCartItemsByID(item.id);
    window.location.reload();
  };

  // Calculate total price
  let total = 0;
  for (const proId of cartItems) {
    const price = products.find((p) => p.id === proId.productId)?.price * proId.quantity || 0;
    total += price;
  }

  // Increse item quantity in cart
  const addQuantity = (item) => {
    let newItem = {productId: item.productId, quantity: item.quantity + 1, customerId: item.customer_id}
    updateCartItem(item.id, newItem)
    window.location.reload();
  };

  // Decrese items quantity in cart
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

  // Check valid item quantity and remove invalid
  function checkout() {
    if (cartItems.length > 0) {
      checkQuantity(userId).then(res => console.log(res))
      sessionStorage.setItem("cart", JSON.stringify([cartItems, total]));
      alert("Successfully! System will remove some invalid product!")
      navigate("/checkout");
    } else {
      alert("Please buy something!")
    }
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

        <button type="button" class="actionBtn" onClick={() => checkout()}>
          Checkout
        </button>
      </div>
    </div>
  );
};
export default Cart;
