import "../styles/app-styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar({ cartCount }) {
  return (
    <section className="top-section">
      <h1 className="top">Fake Shop App</h1>
      <div className="top-bar">
        <div className="top-bar-left">
          <Link to="/" className="top">
            <h3 className="nav">Home</h3>
          </Link>
          <Link to="/shop" className="top">
            <h3 className="nav">Shop</h3>
          </Link>
        </div>
        <div className="top-bar-right">
          <Link to="/cart" className="top">
            <div className="cart">
              <img src="/cart-shopping-svgrepo-com.svg" className="icon"></img>

              {cartCount}
            </div>
          </Link>
          <Link to="/checkout" className="top">
            <h3 className="nav">Checkout</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NavBar;
