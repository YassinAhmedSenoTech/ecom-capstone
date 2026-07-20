import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import '../style/Orders.css'; // Import the new CSS

const Orders = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("You are not logged in. Please log in to view your orders.");
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => api.get('/orders/myorders').then((res) => res.data),
    enabled: !!isLoggedIn, 
  });

  if (!isLoggedIn) return null;

  if (isLoading) return <div className="orders-container">Loading your orders...</div>;

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {(!orders || orders.length === 0) ? (
        <p>No orders yet.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id.slice(0, 8)}...</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isDelivered ? (
                    <span className="status-badge status-delivered">Delivered ✅</span>
                  ) : (
                    <span className="status-badge status-processing">Processing ⏳</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;