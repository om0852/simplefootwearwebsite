"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState({ email: "", password: "" });
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setPendingOrders(JSON.parse(localStorage.getItem("pendingOrders")) || []);
    setCompletedOrders(
      JSON.parse(localStorage.getItem("completedOrders")) || []
    );
    setProducts(
      JSON.parse(localStorage.getItem("products")) || [
        { name: 'BLUE SHOES', price: 150, image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ajio.com%2Fasian--textured-running-sports-shoes%2Fp%2F464108798_blue&psig=AOvVaw0IdR6N_ZVUk0cXef11GNEU&ust=1722875473354000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLCqmrbh24cDFQAAAAAdAAAAABAE' },
        { name: 'BROWN GIRL SLIPPER', price: 250, image: 'https://example.com/brown-girl-slipper.jpg' },
        { name: 'GIRL SLIPPER', price: 200, image: 'https://example.com/girl-slipper.jpg' },
        { name: 'BLUE SLIPPER', price: 100, image: 'https://example.com/blue-slipper.jpg' }
      ]
    );
    setCustomerOrders(JSON.parse(localStorage.getItem("customerOrders")) || []);
  }, []);

  const handleLogin = async (email, password) => {
    if (email && password) {
      try {
        await axios
          .post("/api/login", { email, password })
          .then(async (res) => {
            console.log(res.data.data.type);
            setUserRole(res.data.data.type);
            console.log("data", res);
            alert("Login successful!");
          });
      } catch (error) {
        alert("Invalid Login Attempt");
      }
    } else {
      alert("Invalid email or password");
    }
  };

  const handleSignup = async (email, password) => {
    if (email && password) {
      try {
        await axios
          .post("/api/signup", { email, password })
          .then(async (res) => {
            alert("Account Created successful!");
          });
      } catch (error) {
        alert("Invalid Login Attempt");
      }
    } else {
      alert("Invalid email or password");
    }
  };

  const handleAddToCart = (index) => {
    const product = products[index];
    setCart([...cart, product]);
    displayCartCommand("Item added to cart!");
  };

  const handlePlaceOrder = (name, address, phone) => {
    if (name && address && phone && cart.length > 0) {
      const orderDate = new Date().toLocaleString();
      const newOrder = {
        customerName: name,
        customerAddress: address,
        customerPhone: phone,
        orderDate,
        cart: [...cart],
      };
      setPendingOrders([...pendingOrders, newOrder]);
      setCustomerOrders([...customerOrders, newOrder]);
      localStorage.setItem(
        "pendingOrders",
        JSON.stringify([...pendingOrders, newOrder])
      );
      localStorage.setItem(
        "customerOrders",
        JSON.stringify([...customerOrders, newOrder])
      );
      setCart([]);
      alert("Order placed successfully!");
    } else {
      alert("Please fill all the details and add items to cart.");
    }
  };

  const displayCartCommand = (message) => {
    const cartCommandDiv = document.getElementById("cart-command");
    cartCommandDiv.innerText = message;
    cartCommandDiv.classList.remove("hidden");

    setTimeout(() => {
      cartCommandDiv.classList.add("hidden");
    }, 2000);
  };

  return (
    <>
      <div className="container">
        <h1 id="main-title">NEW BHARAT FOOTWEAR</h1>
        {!userRole && (
          <div id="login-form">
            <input
              type="text"
              id="email"
              className="form-input"
              placeholder="Email"
              required
            />
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Password"
              required
            />
            <button
              id="login-btn"
              className="form-button"
              onClick={() =>
                handleLogin(
                  document.getElementById("email").value,
                  document.getElementById("password").value
                )
              }
            >
              LOGIN
            </button>
            <p>
              New user?{" "}
              <a
                href="#"
                id="signup-link"
                onClick={() => {
                  document
                    .getElementById("signup-form")
                    .classList.remove("hidden");
                  document.getElementById("login-form").classList.add("hidden");
                }}
              >
                Sign Up
              </a>
            </p>
          </div>
        )}
        <div id="signup-form" className="hidden">
          <input
            type="text"
            id="new-email"
            className="form-input"
            placeholder="Email"
            required
          />
          <input
            type="password"
            id="new-password"
            className="form-input"
            placeholder="Password"
            required
          />
          <button
            id="signup-btn"
            className="form-button"
            onClick={() =>
              handleSignup(
                document.getElementById("new-email").value,
                document.getElementById("new-password").value
              )
            }
          >
            SIGN UP
          </button>
        </div>
        {userRole === "customer" && (
          <>
            <div id="products">
              <div id="product-list">
                {products.map((product, index) => (
                  <div key={index} className="product">
                    <img
                      src={product.img}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                    <div>
                      <h3>{product.name}</h3>
                      <p>Price: ₹{product.price}</p>
                      <button
                        onClick={() => handleAddToCart(index)}
                        className="form-button"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                id="cart-btn"
                className="form-button"
                onClick={() =>
                  document.getElementById("cart").classList.remove("hidden")
                }
              >
                CART
              </button>
            </div>
            <div id="cart" className="hidden">
              <h2>Order Summary</h2>
              <div id="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div>
                      <img
                        src={item.img}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                      <h4>{item.name}</h4>
                    </div>
                    <div>
                      <p>Price: ₹{item.price}</p>
                      <button
                        onClick={() =>
                          setCart(cart.filter((_, i) => i !== index))
                        }
                        className="form-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <h3>
                Total: ₹{cart.reduce((total, item) => total + item.price, 0)}
              </h3>
              <button
                id="checkout-btn"
                className="form-button"
                onClick={() =>
                  document
                    .getElementById("order-form")
                    .classList.remove("hidden")
                }
              >
                PLACE ORDER
              </button>
              <div id="cart-command" className="cart-command hidden"></div>
            </div>
            <div id="order-form" className="hidden">
              <input
                type="text"
                id="customer-name"
                className="form-input"
                placeholder="Name"
                required
              />
              <input
                type="text"
                id="customer-address"
                className="form-input"
                placeholder="Address"
                required
              />
              <input
                type="text"
                id="customer-phone"
                className="form-input"
                placeholder="Phone"
                required
              />
              <button
                id="place-order-btn"
                className="form-button"
                onClick={() =>
                  handlePlaceOrder(
                    document.getElementById("customer-name").value,
                    document.getElementById("customer-address").value,
                    document.getElementById("customer-phone").value
                  )
                }
              >
                PLACE ORDER
              </button>
            </div>
          </>
        )}
        {userRole === "admin" && (
          <>
            <h2>Admin Dashboard</h2>
            <div id="orders">
              <h3>Pending Orders</h3>
              {pendingOrders.map((order, index) => (
                <div key={index} className="order-item">
                  <p>
                    Customer: {order.customerName} - {order.customerAddress} -{" "}
                    {order.customerPhone}
                  </p>
                  <p>Date: {order.orderDate}</p>
                  <button
                    onClick={() => {
                      setPendingOrders(
                        pendingOrders.filter((_, i) => i !== index)
                      );
                      setCompletedOrders([...completedOrders, order]);
                      localStorage.setItem(
                        "pendingOrders",
                        JSON.stringify(
                          pendingOrders.filter((_, i) => i !== index)
                        )
                      );
                      localStorage.setItem(
                        "completedOrders",
                        JSON.stringify([...completedOrders, order])
                      );
                    }}
                    className="form-button"
                  >
                    Mark as Completed
                  </button>
                </div>
              ))}
              <h3>Completed Orders</h3>
              {completedOrders.map((order, index) => (
                <div key={index} className="order-item">
                  <p>
                    Customer: {order.customerName} - {order.customerAddress} -{" "}
                    {order.customerPhone}
                  </p>
                  <p>Date: {order.orderDate}</p>
                </div>
              ))}
            </div>
            <h3>Add Product</h3>
            <input
              type="text"
              id="product-name"
              className="form-input"
              placeholder="Product Name"
              required
            />
            <input
              type="number"
              id="product-price"
              className="form-input"
              placeholder="Product Price"
              required
            />
            <input
              type="text"
              id="product-img"
              className="form-input"
              placeholder="Product img URL"
              required
            />
            <button
              id="add-product-btn"
              className="form-button"
              onClick={() => {
                const newProduct = {
                  name: document.getElementById("product-name").value,
                  price: document.getElementById("product-price").value,
                  img: document.getElementById("product-img").value,
                };
                setProducts([...products, newProduct]);
                localStorage.setItem(
                  "products",
                  JSON.stringify([...products, newProduct])
                );
                alert("Product added successfully!");
              }}
            >
              ADD PRODUCT
            </button>
          </>
        )}
      </div>
    </>
  );
}
