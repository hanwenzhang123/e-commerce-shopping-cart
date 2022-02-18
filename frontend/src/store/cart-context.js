import React, { useState, useEffect } from "react";
import _ from "lodash";

const CartContext = React.createContext({
  cartCount: 0,
  cartItems: [],
  setCartItems: (item) => {},
  deleteItem: (item) => {},
  clearCartItems: () => {},
});

const retrieveStoredInfo = () => {
  const storedCount = localStorage.getItem("count");
  const storedItems = JSON.parse(localStorage.getItem("items"));
  return { count: storedCount, items: storedItems };
};

export const CartContextProvider = (props) => {
  const Data = retrieveStoredInfo();
  let initialCount;
  let initialItems;
  if (Data) {
    initialCount = Data.count;
    initialItems = Data.items;
  }

  const [count, setCount] = useState(initialCount ? initialCount : 0);
  const [items, setItems] = useState(initialItems ? initialItems : []);

  useEffect(() => {
    localStorage.setItem("count", count);
    localStorage.setItem("items", JSON.stringify([...items]));
  }, [count, items]);

  const addToCartHandler = (item) => {
    const temp = _.cloneDeep(items);
    temp.push(item);

    setItems(temp);
    setCount(temp.length);
  };

  const deleteCartHandler = (item) => {
    const temp = _.cloneDeep(items);
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]?.title === item.title) {
        temp.splice(i, 1);
        break;
      }
    }

    setItems(temp);
    setCount(temp.length);
  };

  const clearCartHandler = () => {
    setCount(0);
    setItems([]);
    localStorage.removeItem("count");
    localStorage.removeItem("items");
    alert("Shopping cart cleared! Return back to homepage!");
    window.location = "/";
  };

  const contextValue = {
    cartCount: count,
    cartItems: items,
    setCartItems: addToCartHandler,
    deleteItem: deleteCartHandler,
    clearCartItems: clearCartHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
