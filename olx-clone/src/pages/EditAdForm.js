import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
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

const EditAdForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  // Removed unused imageFile state
  const [imagePreviewUrl, setImagePreviewUrl] = useState(''); // State for image preview
  const [sellerName, setSellerName] = useState(''); // New state for seller name
  const [sellerPhone, setSellerPhone] = useState(''); // New state for seller phone
  const [sellerEmail, setSellerEmail] = useState(''); // New state for seller email

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await api.get(`/ads/${id}`);
        const ad = response.data;
        setTitle(ad.title);
        setPrice(ad.price);
        setDescription(ad.description);
        setCategory(ad.category);
        // Set seller info if available
        setSellerName(ad.sellerName || '');
        setSellerPhone(ad.sellerPhone || '');
        setSellerEmail(ad.sellerEmail || '');
        // If the existing image is a Data URL, set it as preview
        // Otherwise, it's a regular URL, so just use it as is
        if (ad.image && ad.image.startsWith('data:image')) {
          setImagePreviewUrl(ad.image);
        } else {
          setImagePreviewUrl(ad.image || '');
        }
      } catch (error) {
        console.error('Failed to fetch ad for editing:', error);
        toast.error('Failed to load ad for editing.');
        navigate('/'); // Redirect if ad not found or error
      }
    };
    fetchAd();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAd = {
      price,
      description,
      category,
      image: imagePreviewUrl || 'https://via.placeholder.com/300',
      sellerName, // Include seller info
      sellerPhone,
    };

    try {
      await api.put(`/ads/${id}`, updatedAd);
      toast.success('Ad updated successfully!');
      navigate(`/ad/${id}`);
    } catch (error) {
      console.error('Failed to update ad:', error);
      toast.error('Failed to update ad.');
    }
  };

  return (
    <div className="post-ad-form"> {/* Reusing post-ad-form styling */}
      <h1>Edit Ad</h1>
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
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Your Name (for contact)"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Your Phone Number (for contact)"
          value={sellerPhone}
          onChange={(e) => setSellerPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email (for contact)"
          value={sellerEmail}
          onChange={(e) => setSellerEmail(e.target.value)}
        />
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
        <button type="submit">Update Ad</button>
      </form>
    </div>
  );
};

export default EditAdForm;