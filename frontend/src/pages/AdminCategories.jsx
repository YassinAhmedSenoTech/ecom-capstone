import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../style/AdminCategories.css';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    const { data } = await api.get('/admin/categories');
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/admin/categories/${editingId}`, { name });
      setEditingId(null);
    } else {
      await api.post('/admin/categories', { name });
    }
    setName('');
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await api.delete(`/admin/categories/${id}`);
      fetchCategories();
    }
  };

  return (
    <div className="categories-container">
      <h2>Manage Categories</h2>
      
      <form onSubmit={handleSubmit} className="category-form">
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Category Name" 
          required 
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>
                <button 
                  className="edit-btn" 
                  onClick={() => { setEditingId(c.id); setName(c.name); }}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(c.id)}
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

export default AdminCategories;