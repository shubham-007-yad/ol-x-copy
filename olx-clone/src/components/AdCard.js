import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const AdCard = ({ ad }) => {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(ad.image);

  const handleImageError = () => {
    setImageSrc('https://via.placeholder.com/300?text=Image+Not+Available'); // Fallback image
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn) {
      alert('Please login to add items to cart.');
      navigate('/login');
      return;
    }

    addToCart(ad);
  };

  return (
    <div className="ad-card">
      <Link to={`/ad/${ad.id}`}>
        <img src={imageSrc} alt={ad.title} onError={handleImageError} loading="lazy" />
        <div className="ad-card-content">
          <h2>{ad.title}</h2>
          <p>Rs. {ad.price}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </Link>
    </div>
  );
};

export default AdCard;
