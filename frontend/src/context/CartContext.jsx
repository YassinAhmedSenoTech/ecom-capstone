import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from '../api/axiosConfig';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isLoggedIn]);

  const addToCart = async (product) => {
    if (isLoggedIn) {
      try {
        await api.post('/cart', { productId: product.id });
        fetchCart(); 
      } catch (err) {
        alert("Failed to add to cart");
      }
    } else {
      alert("Please log in to add items to your cart!");
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await api.delete(`/cart/${cartItemId}`);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart'); 
      setCartItems([]); 
    } catch (err) {
      alert("Failed to clear cart on server");
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};