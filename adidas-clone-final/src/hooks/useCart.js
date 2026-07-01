import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Custom hook that encapsulates Context consumption.
// Components call useCart() instead of useContext(CartContext) directly.
// This also lets us throw a helpful error if someone forgets to wrap
// the app in <CartProvider>.
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
