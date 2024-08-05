import Home from "./components/Home";
import Shop from "./components/Shop";
import ViewShopItem from "./components/ViewShopItem";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import "./App.css";
import "./styles/app-styles.css";
import { useEffect } from "react";
import { useState } from "react";
import uuid from "react-uuid";

function App() {
  const emptyArray = [];
  const [storeItems, setStoreItems] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("storeItems"));
    } catch {
      return null;
    }
  });
  const [selectedItem, setSelectedItem] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("selectedItem"));
    } catch {
      return null;
    }
  });
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("cart"));
    } catch {
      return emptyArray;
    }
  });
  const [cartCount, setCartCount] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("cartCount"));
    } catch {
      return 0;
    }
  });

  const [orderTotal, setOrderTotal] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("orderTotal"));
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    sessionStorage.setItem("storeItems", JSON.stringify(storeItems));
    //console.log("store items effect ",JSON.parse(sessionStorage.getItem("storeItems")));
  }, [storeItems]);

  useEffect(() => {
    sessionStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    //console.log("selectedItem effect");
  }, [selectedItem]);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
    //console.log("cart effect ", cart);
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem("cartCount", JSON.stringify(cartCount));
  }, [cartCount]);

  useEffect(() => {
    sessionStorage.setItem("orderTotal", JSON.stringify(orderTotal));
  }, [orderTotal]);

  async function getStoreItems() {
    await fetch("https://fakestoreapi.com/products", {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((response) => setStoreItems(response))
      .catch((error) => console.error(error));
  }

  function selectItem(Id) {
    if (storeItems !== null) {
      for (var i = 0; i < storeItems.length; i++) {
        if (storeItems[i].id === Id) {
          setSelectedItem(storeItems[i]);
          break;
        }
      }
    }
  }

  function uuidFromUuidV4() {
    const newUuid = uuid();
    return newUuid;
  }

  function addItemToCart(item) {
    var found = false;

    setCart(
      cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          found = true;
          var newCount = cartItem.count + 1;
          return {
            ...cartItem,
            count: newCount,
          };
        } else {
          return cartItem;
        }
      })
    );

    if (!found) {
      setCart([
        ...cart,
        {
          key: uuidFromUuidV4(),
          id: item.id,
          item: item,
          count: 1,
        },
      ]);
    }

    var newCount = cartCount + 1;
    setCartCount(newCount);
  }

  function removeItemFromCart(item) {
    var newCount = 0;
    var remove = false;
    setCart(
      cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          newCount = cartItem.count - 1;
          if (newCount === 0) {
            remove = true;
          }
          return {
            ...cartItem,
            count: newCount,
          };
        } else {
          return cartItem;
        }
      })
    );

    if (remove) {
      setCart(cart.filter((cartItem) => cartItem.id !== item.id));
    }

    var newCount = cartCount - 1;
    setCartCount(newCount);
  }

  function updateOrderTotal(total) {
    setOrderTotal(total);
  }

  function payForOrder() {
    console.log("for items: ", cart);
    console.log("order total is: ", orderTotal);
    setCart([]);
    setCartCount(0);
    setOrderTotal(0);
  }

  useEffect(() => {
    if (storeItems === null) {
      getStoreItems();
    }
  }, []);

  useEffect(() => {
    if (cart === null) {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    if (cartCount === null) {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    if (orderTotal === null) {
      setOrderTotal(0);
    }
  }, []);

  //console.log("store items ", storeItems);
  //console.log("cart ", cart);
  //console.log("cartCount ", cartCount);
  //console.log("order total ", orderTotal);

  if (storeItems !== null) {
    //console.log("selected item is!! ", selectedItem);

    return (
      <>
        <Router>
          <NavBar cartCount={cartCount} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  featuredItems={[
                    storeItems[0],
                    storeItems[6],
                    storeItems[11],
                    storeItems[13],
                    storeItems[15],
                    storeItems[16],
                  ]}
                  selectItem={selectItem}
                  addItemToCart={addItemToCart}
                />
              }
            ></Route>
            <Route
              path="/shop"
              element={
                <Shop
                  storeitems={storeItems}
                  selectItem={selectItem}
                  addItemToCart={addItemToCart}
                />
              }
            />
            <Route
              path="/item"
              element={
                <ViewShopItem
                  item={selectedItem}
                  addItemToCart={addItemToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  cartCount={cartCount}
                  addItemToCart={addItemToCart}
                  removeItemFromCart={removeItemFromCart}
                  selectItem={selectItem}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cart={cart}
                  selectItem={selectItem}
                  payForOrder={payForOrder}
                  setOrderTotal={updateOrderTotal}
                />
              }
            />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
