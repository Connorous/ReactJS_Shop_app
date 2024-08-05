import "../styles/item-styles.css";
import { useLocation } from "react-router-dom";

function ViewShopItem({ item, addItemToCart }) {
  //console.log("view item ", item);
  if (item !== null) {
    return (
      <div className="flex-container-foritem">
        <div className="description">
          <h2 aria-label="price">$ {item.price}</h2>
          <h3 aria-label="rating">
            Rated {item.rating.rate} stars from {item.rating.count} reviews
          </h3>
          <p aria-label="description">{item.description}</p>
          <button
            aria-label="addBtn"
            className="addToCart"
            onClick={() => addItemToCart(item)}
          >
            Add To Cart
          </button>
        </div>

        <div>
          <h2 aria-label="title">{item.title}</h2>
          <img
            src={item.image}
            className="item-view-image"
            aria-label="image"
          ></img>
        </div>
      </div>
    );
  } else {
    return <div>didn't work + {item}</div>;
  }
}

export default ViewShopItem;
