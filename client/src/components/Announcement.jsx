import React, { useState } from 'react';
import axios from 'axios';
import './Announcement.css';

const Announcement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notification = {
      type: 'announcement',
      title,
      description,
      uniqueId: `annou_${Date.now()}`
    };

    try {
      await axios.post('/api/notifications', notification);
      alert('Notification created successfully');
      setTitle('');
      setDescription('');
    } catch (error) {
      alert('Error creating notification');
    }
  };

  return (
    <form className="announcement-form" onSubmit={handleSubmit}>
      <h2>Create Announcement</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default Announcement;