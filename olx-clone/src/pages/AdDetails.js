import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdDetails = () => {
  const [ad, setAd] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await api.get(`/ads/${id}`);
        setAd(response.data);
      } catch (error) {
        console.error('Failed to fetch ad:', error);
      }
    };

    fetchAd();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        await api.delete(`/ads/${id}`);
        toast.success('Ad deleted successfully!');
        navigate('/'); // Redirect to home after deletion
      } catch (error) {
        console.error('Failed to delete ad:', error);
        toast.error('Failed to delete ad.');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit-ad/${id}`); // Navigate to edit page
  };

  const handleContactSeller = () => {
    navigate(`/contact-seller/${id}`);
  };

  if (!ad) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ad-details">
      <img src={ad.image} alt={ad.title} loading="lazy" />
      <h1>{ad.title}</h1>
      <h2>Rs. {ad.price}</h2>
      <p>{ad.description}</p>
      <div className="ad-actions">
        {(isLoggedIn && ad.ownerId === userId) && (
          <>
            <button onClick={handleEdit} className="edit-button">Edit Ad</button>
            <button onClick={handleDelete} className="delete-button">Delete Ad</button>
          </>
        )}
        <button onClick={handleContactSeller} className="contact-button">Contact Seller</button>
      </div>
    </div>
  );
};

export default AdDetails;
