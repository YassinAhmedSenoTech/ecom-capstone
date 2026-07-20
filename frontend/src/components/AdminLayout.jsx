import { Outlet, Link } from 'react-router-dom';
import '../style/AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {}
      <aside className="admin-sidebar">
        <h3>Admin Menu</h3>
        <nav className="admin-nav">
          <Link to="/admin">Dashboard Home</Link>
          <Link to="/admin/products">Manage Products</Link>
          <Link to="/admin/orders">Manage Orders</Link>
          <Link to="/admin/categories">Manage Categories</Link>
        </nav>
      </aside>

      {}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;