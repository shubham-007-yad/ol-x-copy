import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ContactSeller = () => {
  const [seller, setSeller] = useState(null);
  const { adId } = useParams();

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const response = await api.get(`/ads/${adId}`);
        const ad = response.data;
        if (ad && ad.sellerName) {
          setSeller({
            name: ad.sellerName,
            phone: ad.sellerPhone,
            email: ad.sellerEmail,
          });
        } else {
            // Fallback or user fetch logic if seller details are not embedded
            // For now, showing not available
            setSeller({
                name: 'Not available',
                phone: 'Not available',
                email: 'Not available',
            });
        }
      } catch (error) {
        console.error('Failed to fetch seller information:', error);
        setSeller({
            name: 'Not available',
            phone: 'Not available',
            email: 'Not available',
        });
      }
    };

    fetchSellerInfo();
  }, [adId]);

  if (!seller) {
    return <div>Loading seller information...</div>;
  }

  return (
    <div className="contact-seller-page">
      <h1>Contact Seller</h1>
      <div className="seller-details">
        <p><strong>Name:</strong> {seller.name}</p>
        <p><strong>Phone:</strong> {seller.phone}</p>
        <p><strong>Email:</strong> {seller.email}</p>
      </div>
    </div>
  );
};

export default ContactSeller;
