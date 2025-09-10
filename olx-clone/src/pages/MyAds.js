import React, { useState, useEffect, useContext } from 'react';
import AdCard from '../components/AdCard';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MyAds = () => {
  const [myAds, setMyAds] = useState([]);
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyAds = async () => {
      try {
        const response = await api.get('/ads');
        const allAds = response.data;
        // Filter ads to show only those owned by the current user
        const userAds = allAds.filter(ad => ad.ownerId === userId);
        setMyAds(userAds);
      } catch (error) {
        console.error('Failed to fetch my ads:', error);
      }
    };

    if (userId) { // Only fetch if a user is logged in
      fetchMyAds();
    } else {
      setMyAds([]); // Clear ads if no user is logged in
    }
  }, [userId]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        await api.delete(`/ads/${id}`);
        alert('Ad deleted successfully!');
        // Update the local state to remove the deleted ad
        setMyAds(prevAds => prevAds.filter(ad => ad.id !== id));
      } catch (error) {
        console.error('Failed to delete ad:', error);
        alert('Failed to delete ad.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-ad/${id}`); // Navigate to edit page
  };

  return (
    <div className="my-ads-page">
      <h1>My Ads</h1>
      {myAds.length === 0 ? (
        <p>You haven't posted any ads yet.</p>
      ) : (
        <div className="ads-container">
          {myAds.map(ad => (
            <div key={ad.id} className="ad-card">
              <AdCard ad={ad} /> {/* Reusing AdCard for display */}
              <div className="ad-actions-my-ads">
                <button onClick={() => handleEdit(ad.id)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(ad.id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAds;
