import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/item-styles.css";
import "../styles/cart-styles.css";

function Cart({ cart, addItemToCart, removeItemFromCart, selectItem }) {
  if (cart.length !== 0) {
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].item.price * cart[i].count;
    }

    return (
      <>
        <div className="cart-page">
          <h1>Cart Details</h1>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Image</th>
                <th>Category</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th className="button-column">Increase Quantity</th>
                <th className="button-column">Decrease Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem) => (
                <tr>
                  <td>
                    <Link to="/item" onClick={() => selectItem(cartItem.id)}>
                      <h3>{cartItem.item.title}</h3>
                    </Link>
                  </td>
                  <td>
                    <Link to="/item" onClick={() => selectItem(cartItem.id)}>
                      <img
                        src={cartItem.item.image}
                        className="item-cart-image"
                      ></img>
                    </Link>
                  </td>
                  <td>
                    <p>{cartItem.item.category}</p>
                  </td>
                  <td>
                    <p>${cartItem.item.price}</p>
                  </td>
                  <td>
                    <p>{cartItem.count}</p>
                  </td>
                  <td>
                    <p>${(cartItem.item.price * cartItem.count).toFixed(2)}</p>
                  </td>
                  <td className="button-column">
                    <button
                      className="add"
                      onClick={() => addItemToCart(cartItem.item)}
                    >
                      <img
                        src="/cart-plus-svgrepo-com.svg"
                        className="btn-icon"
                      ></img>
                    </button>
                  </td>
                  <td className="button-column">
                    <button
                      className="sub"
                      onClick={() => removeItemFromCart(cartItem.item)}
                    >
                      <img
                        src="/cart-minus-svgrepo-com.svg"
                        className="btn-icon"
                      ></img>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <div className="flex-container-cart">
            <h1>Total: $ {total.toFixed(2)}</h1>

            <Link to="/checkout">
              <button className="checkout-btn">Checkout</button>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>Cart is empty.</h2>
      </>
    );
  }
}

export default Cart;
