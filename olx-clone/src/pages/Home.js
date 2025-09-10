import React, { useState, useEffect } from 'react';
import AdCard from '../components/AdCard';
import api from '../api';
import AnimatedOnScroll from '../components/AnimatedOnScroll';

const categories = [
  'All', // Option to show all categories
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

const Home = ({ searchQuery }) => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default'); // State for sorting
  const [advertisementImages, setAdvertisementImages] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await api.get('/ads');
        setAds(response.data);
      } catch (error) {
        console.error('Failed to fetch ads:', error);
      }
    };
    fetchAds();
  });

  useEffect(() => {
    if (ads.length > 0 && randomProducts.length === 0) {
        const shuffledAds = [...ads].sort(() => 0.5 - Math.random());
        const selectedRandomProducts = shuffledAds.slice(0, 4);
        setRandomProducts(selectedRandomProducts);

        const shuffledAdImages = [...ads].sort(() => 0.5 - Math.random());
        const selectedAdImages = shuffledAdImages.slice(0, 4).map(ad => ad.image);
        setAdvertisementImages(selectedAdImages);
    }
  }, [ads, randomProducts]);

  useEffect(() => {
    let currentFiltered = [...ads].filter(ad => { // Create a shallow copy to avoid direct mutation
      const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || ad.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Apply sorting
    if (sortOption === 'price-asc') {
      currentFiltered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === 'price-desc') {
      currentFiltered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortOption === 'title-asc') {
      currentFiltered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'title-desc') {
      currentFiltered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredAds(currentFiltered);
  }, [searchQuery, selectedCategory, sortOption, ads]);

  return (
    <div>
      {!searchQuery && (
        <>
          <AnimatedOnScroll>
            <div className="advertisement-banner">
              {advertisementImages.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`Advertisement ${index + 1}`} loading="lazy" />
              ))}
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll>
            <div className="random-products-row">
              {randomProducts.map(ad => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </AnimatedOnScroll>
        </>
      )}

      <h1>Welcome to OLX Clone</h1>
      <div className="filters-container">
        <div className="category-filter">
          <label htmlFor="category-select">Filter by Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="sort-filter">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A-Z</option>
            <option value="title-desc">Title: Z-A</option>
          </select>
        </div>
      </div>
      <div className="ads-container">
        {filteredAds.map(ad => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default Home;
