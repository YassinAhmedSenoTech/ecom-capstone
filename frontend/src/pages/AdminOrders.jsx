import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../style/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    const { data } = await api.get('/admin/orders');
    setOrders(data);
  };

  const toggleStatus = async (order) => {
    await api.put(`/admin/orders/${order.id}`, { isDelivered: !order.isDelivered });
    fetchOrders();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this order?")) {
      await api.delete(`/admin/orders/${id}`);
      fetchOrders();
    }
  };

  return (
    <div className="orders-container">
      <h2>Manage Orders</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.user?.email || 'Guest'}</td>
              <td>${o.totalPrice}</td>
              <td>{o.isDelivered ? 'Delivered' : 'Pending'}</td>
              <td>
                <button 
                  className={`toggle-btn ${!o.isDelivered ? 'is-pending' : ''}`}
                  onClick={() => toggleStatus(o)}
                >
                  Mark as {o.isDelivered ? 'Pending' : 'Delivered'}
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(o.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;