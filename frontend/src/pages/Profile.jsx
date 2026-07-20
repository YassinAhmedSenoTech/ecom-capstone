import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../style/Profile.css';

const Profile = () => {
  const [fetchedUser, setFetchedUser] = useState({ name: '', email: '' });
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    api.get('/auth/profile').then(res => {
      setFetchedUser(res.data);
      setForm(res.data); 
    });
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put('/auth/profile', form);
      setFetchedUser(form); 
      alert("Profile Updated!");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="info-card">
        <h3>Current Information</h3>
        <p><strong>Name:</strong> {fetchedUser.name}</p>
        <p><strong>Email:</strong> {fetchedUser.email}</p>
      </div>

      <div className="edit-section">
        <h3>Edit Profile</h3>
        
        <div className="form-group">
          <label>Update Name:</label>
          <input 
            className="form-input"
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
            placeholder="Enter new name"
          />
        </div>
        
        <div className="form-group">
          <label>Update Email:</label>
          <input 
            className="form-input"
            value={form.email} 
            onChange={e => setForm({...form, email: e.target.value})} 
            placeholder="Enter new email"
          />
        </div>
        
        <button className="save-btn" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;