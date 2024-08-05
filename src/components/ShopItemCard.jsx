import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/item-styles.css";

function ShopItemCard({ id, item, selectItem, addItemToCart }) {
  return (
    <div className="item-card">
      <Link to="/item" onClick={() => selectItem(item.id)}>
        <h3>{item.title}</h3>
        <img src={item.image} className="item-card-image"></img>
        <div className="flex-container-item">
          <h3>$ {item.price}</h3>
          <h6>
            Rated {item.rating.rate} stars from {item.rating.count} reviews{" "}
          </h6>
        </div>

        <h5>Category: {item.category}</h5>
        <p>{item.description}</p>
      </Link>

      <button className="addToCart" onClick={() => addItemToCart(item)}>
        Add To Cart
      </button>
    </div>
  );
}

export default ShopItemCard;
