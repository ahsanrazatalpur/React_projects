import React, { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext();

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If product already exists, increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new product, add with quantity 1
        return [
          ...prevItems,
          {
            ...product,
            quantity: 1,
            price: Number(product.price), // Ensure it's a number
          },
        ];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the cart context
export const useCart = () => useContext(CartContext);
