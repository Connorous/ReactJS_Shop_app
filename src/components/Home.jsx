import { Link } from "react-router-dom";
import "../styles/app-styles.css";
import ShopItemCard from "./ShopItemCard";
import uuid from "react-uuid";

function Home({ featuredItems, selectItem, addItemToCart }) {
  function uuidFromUuidV4() {
    const newUuid = uuid();
    return newUuid;
  }

  return (
    <div className="home">
      <h1>Welcome to the fake shopping app!</h1>
      <br></br>
      <br></br>
      <h2>Featured Products</h2>
      <div className="home-item-grid">
        {featuredItems.map((item) => (
          <ShopItemCard
            key={uuidFromUuidV4()}
            id={item.Id}
            item={item}
            selectItem={selectItem}
            addItemToCart={addItemToCart}
          ></ShopItemCard>
        ))}
        <br></br>
      </div>
    </div>
  );
}

export default Home;
