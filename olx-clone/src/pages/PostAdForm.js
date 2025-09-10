import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const categories = [
  'Electronics',
  'Vehicles',
  'Real Estate',
  'Fashion',
  'Home & Garden',
  'Sports & Hobbies',
  'Services',
  'Jobs',
  'Other'
];

const PostAdForm = () => {
  const { userId } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [category, setCategory] = useState(categories[0]); // Default to first category
  // Removed unused imageFile state
  const [imagePreviewUrl, setImagePreviewUrl] = useState(''); // State for image preview
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result); // Set Data URL for preview
      };
      reader.readAsDataURL(file); // Read file as Data URL
    } else {
      setImagePreviewUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAd = {
      title,
      price,
      description,
      category,
      sellerName,
      sellerPhone,
      sellerEmail,
      ownerId: userId, // Add ownerId from AuthContext
      image: imagePreviewUrl || 'https://via.placeholder.com/300' // Use Data URL or placeholder
    };

    try {
      await api.post('/ads', newAd);
      toast.success('Ad posted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to post ad:', error);
      toast.error('Failed to post ad.');
    }
  };

  return (
    <div className="post-ad-form">
      <h1>Post Your Ad</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Seller Name"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number (10 digits)"
          value={sellerPhone}
          onChange={(e) => setSellerPhone(e.target.value.replace(/[^0-9]/g, ''))}
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={sellerEmail}
          onChange={(e) => setSellerEmail(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreviewUrl && (
          <div className="image-preview">
            <img src={imagePreviewUrl} alt="Preview" />
          </div>
        )}
        <button type="submit">Post Ad</button>
      </form>
    </div>
  );
};

export default PostAdForm;
