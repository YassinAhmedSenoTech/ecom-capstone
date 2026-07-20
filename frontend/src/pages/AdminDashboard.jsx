import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig'; 
import '../style/AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, logsRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/logs')
        ]);
        
        setStats(statsRes.data);
        setLogs(logsRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.isAdmin) {
      fetchData();
    }
  }, [user]);

  const handleClearLogs = async () => {
    if (window.confirm("Are you sure you want to clear all system logs?")) {
      try {
        await api.delete('/admin/logs');
        setLogs([]);
      } catch (err) {
        console.error("Failed to clear logs:", err);
        alert("Failed to clear logs");
      }
    }
  };

  if (!user || user.isAdmin !== true) {
    return <div className="dashboard-container">Access Denied. Admins only.</div>;
  }

  if (loading) return <div className="dashboard-container">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Manage products, orders, and view statistics here.</p>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Products</h3>
            <div className="stat-value">{stats.totalProducts}</div>
          </div>
          <div className="stat-card">
            <h3>Orders</h3>
            <div className="stat-value">{stats.totalOrders}</div>
          </div>
          <div className="stat-card">
            <h3>Users</h3>
            <div className="stat-value">{stats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
          </div>
        </div>
      )}

      <div className="logs-section">
        <div className="logs-header">
          <h3>Recent System Logs</h3>
          <button className="clear-logs-btn" onClick={handleClearLogs}>
            Clear Logs
          </button>
        </div>
        <div className="log-list">
          {logs.map((log, index) => (
            <p key={index} className="log-entry">
              <strong>{log.action}</strong> 
              <span style={{ color: '#666', marginLeft: '10px' }}>
                (Admin: {log.adminId})
              </span> 
              - {new Date(log.createdAt).toLocaleString()}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;