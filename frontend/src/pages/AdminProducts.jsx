import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../style/AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', stock: 0, categoryId: '' });
  const [file, setFile] = useState(null); 
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const { data } = await api.get('/admin/products');
    setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await api.get('/admin/categories');
    setCategories(data);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({ 
      name: product.name, 
      description: product.description, 
      price: product.price, 
      stock: product.stock, 
      categoryId: product.categoryId 
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('categoryId', formData.categoryId);
    if (file) data.append('image', file);

    try {
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        setEditingId(null);
      } else {
        await api.post('/admin/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setFormData({ name: '', description: '', price: '', stock: 0, categoryId: '' });
      setFile(null);
      fetchProducts();
    } catch (err) { alert("Error saving product"); }
  };

  return (
    <div className="products-container">
      <h2>Manage Products</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input className="form-input" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input className="form-input" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        <input className="form-input" type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
        <input className="form-input" type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
        <input className="form-input" type="file" onChange={e => setFile(e.target.files[0])} />
        <select className="form-select" value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} required>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <div className="form-actions">
          <button type="submit" className="btn-primary">{editingId ? 'Update Product' : 'Add Product'}</button>
          {editingId && <button type="button" className="btn-cancel" onClick={() => { setEditingId(null); setFormData({ name: '', description: '', price: '', stock: 0, categoryId: '' }); }}>Cancel</button>}
        </div>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;