import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../style/Cart.css'; 

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    const qty = parseInt(newQuantity);
    if (qty < 1 || isNaN(qty)) return;

    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updatedItems);
  };

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.product?.price || 0);
    const quantity = item.quantity || 1; 
    return sum + (price * quantity);
  }, 0);

  const handlePlaceOrder = async () => {
    try {
      await api.post('/orders', { items: cartItems, totalPrice: total });
      alert("Order Placed!");
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error("Order failed", error);
      alert("Checkout failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <h3>{item.product?.name || "Loading..."}</h3>
                <p className="cart-item-price">Price: ${parseFloat(item.product?.price || 0).toFixed(2)}</p>
              </div>
              
              <div className="cart-controls">
                <label>Qty: </label>
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity || 1} 
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                />
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button 
              className="checkout-btn"
              onClick={handlePlaceOrder} 
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;