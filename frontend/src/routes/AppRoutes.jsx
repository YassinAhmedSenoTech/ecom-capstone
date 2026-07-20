import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import ProductDetails from '../pages/ProductDetails';
import Orders from '../pages/orders';
import Profile from '../pages/Profile';
import AdminDashboard from '../pages/AdminDashboard';
import AdminProducts from '../pages/AdminProducts';
import AdminLayout from '../components/AdminLayout';
import AdminCategories from '../pages/AdminCategories';
import AdminOrders from '../pages/AdminOrders';

const AppRoutes = () => {
  return (
    <Routes>
      {}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<Profile />} />

      {}
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} /> 
  <Route path="products" element={<AdminProducts />} />
  <Route path="categories" element={<AdminCategories />} />
  <Route path="orders" element={<AdminOrders />} />
</Route>
    </Routes>   
  );
};
export default AppRoutes;



