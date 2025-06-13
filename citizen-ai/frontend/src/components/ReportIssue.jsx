import React, { useState } from 'react';
import axios from 'axios';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: { lat: '', lng: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData({
        ...formData,
        location: { ...formData.location, [name]: parseFloat(value) }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://your-backend.onrender.com/api/issues',  formData);
      alert('Issue reported!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Error reporting issue.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <br />
      <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
      <br />
      <select name="category" onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Road">Road</option>
        <option value="Water">Water Supply</option>
        <option value="Electricity">Electricity</option>
      </select>
      <br />
      <input name="lat" placeholder="Latitude" onChange={handleChange} type="number" step="any" />
      <br />
      <input name="lng" placeholder="Longitude" onChange={handleChange} type="number" step="any" />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReportIssue;