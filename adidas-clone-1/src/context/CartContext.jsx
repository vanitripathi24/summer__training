import { createContext, useState } from 'react';

// Create the context. Components will read/write cart data through this.
export const CartContext = createContext(null);

export function CartProvider({ children }) {
  // cartItems is an array of objects: { id, name, price, image, size, quantity }
  const [cartItems, setCartItems] = useState([]);

  // Add a product to the cart.
  // If the same product + size already exists, just increase its quantity.
  function addToCart(product, size) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: size,
          quantity: 1,
        },
      ];
    });
  }

  // Increase quantity of a specific cart item (matched by id + size)
  function increaseQuantity(id, size) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease quantity. If it hits 0, remove the item from the cart entirely.
  function decreaseQuantity(id, size) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove an item completely regardless of quantity
  function removeFromCart(id, size) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  }

  // Clear the entire cart (e.g. after checkout)
  function clearCart() {
    setCartItems([]);
  }

  // Total number of items (sum of all quantities) — shown on the bag icon
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price of everything in the cart
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
