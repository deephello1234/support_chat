import React, { useState } from "react";
import Chat from "./chat";
import "./styles/chat.css";
function App() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Laptop", price: 999,src:"/product_images/laptop.jpeg" },
    { id: 2, name: "Headphones", price: 199,src:"/product_images/headphone.jpg" },
    { id: 3, name: "Smartphone", price: 699,src:"/product_images/smartphone.jpg" },
    { id: 4, name: "Keyboard", price: 99,src:"/product_images/keyboard.jpg" },
    { id: 5, name: "Mouse", price: 49,src:"/product_images/mouse.jpeg" },
    { id: 6, name: "Monitor", price: 299,src:"/product_images/monitor.jpeg" },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">MyShop</div>

        <input
          className="search"
          placeholder="Search products..."
        />

        <div className="nav-right">
          <span>Account</span>
          <span>Cart 🛒 ({cart.length})</span>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Categories</h3>
          <ul>
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home</li>
            <li>Books</li>
          </ul>
        </aside>

        {/* Products */}
        <section className="products">
          {products.map((p) => (
            <div key={p.id} className="card">
              <div className="image">
                <img src={p.src} alt={p.name}/>
              </div>
              <h4>{p.name}</h4>
              <p>${p.price}</p>
              <button onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))}
        </section>
      </div>

      {/* Floating Chat */}
      <Chat />
    </div>
  );
}

export default App;