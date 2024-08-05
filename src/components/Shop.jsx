import { Link } from "react-router-dom";
import { useState } from "react";
import ShopItemCard from "./ShopItemCard";
import "../styles/item-styles.css";
import uuid from "react-uuid";

function Shop({ storeitems, selectItem, addItemToCart }) {
  const [storeItems, setStoreItems] = useState(storeitems);

  function uuidFromUuidV4() {
    const newUuid = uuid();
    return newUuid;
  }

  return (
    <div className="item-grid">
      {storeItems.map((item) => (
        <ShopItemCard
          key={uuidFromUuidV4()}
          id={item.Id}
          item={item}
          selectItem={selectItem}
          addItemToCart={addItemToCart}
        ></ShopItemCard>
      ))}
    </div>
  );
}

export default Shop;
