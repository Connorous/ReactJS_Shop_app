import { Link } from "react-router-dom";
import "../styles/item-styles.css";
import "../styles/cart-styles.css";

function Checkout({ cart, selectItem, payForOrder, setOrderTotal }) {
  if (cart.length !== 0) {
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].item.price * cart[i].count;
    }
    setOrderTotal(total);

    return (
      <>
        <div className="cart-page">
          <h1>Order Details</h1>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Image</th>
                <th>Category</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
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
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <div className="edit-div">
            <Link to="/cart">
              <button className="edit-btn">Edit Order</button>
            </Link>
          </div>

          <div className="flex-container-cart">
            <h1>Total: $ {total.toFixed(2)}</h1>

            <Link to="/home" onClick={() => payForOrder()}>
              <button className="checkout-btn">Pay Now</button>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>No items in order. Add some items to your cart first.</h2>
      </>
    );
  }
}

export default Checkout;
