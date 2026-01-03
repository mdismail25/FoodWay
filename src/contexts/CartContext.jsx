import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(item) {
    setItems(prev => {
      const existing = prev.find(
        i =>
          i.id === item.id &&
          i.size === item.size &&
          JSON.stringify(i.addons) === JSON.stringify(item.addons)
      );

      if (existing) {
        return prev.map(i =>
          i === existing ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  }

  function increase(item) {
    setItems(prev =>
      prev.map(i => (i === item ? { ...i, qty: i.qty + 1 } : i))
    );
  }

  function decrease(item) {
    setItems(prev =>
      prev
        .map(i =>
          i === item ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );
  }

  function clear() {
    setItems([]);
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, increase, decrease, clear, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
