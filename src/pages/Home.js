import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import NeonParticles from '../components/NeonParticles';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        // Just take the first 3 for the home page for a clean look
        setFeaturedProducts(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page fade-in">
      {/* Premium Hero Section */}
      <section className="container py-4 py-lg-5">
        <div className="hero-section p-4 p-md-5 position-relative">
          <NeonParticles />
          <div className="row align-items-center position-relative z-2">
            <div className="col-lg-6 py-5 ps-lg-5 text-center text-lg-start z-1">
              <span className="badge bg-primary border-0 mb-3 rounded-pill px-3 py-2 shadow-sm">New Season</span>
              <h1 className="display-3 hero-title mb-4">
                Curated Quality <br />
                <span className="text-secondary opacity-75">For Modern Living.</span>
              </h1>
              <p className="lead hero-subtitle mb-5">
                Discover a collection of premium electronics, fashion, and home goods designed for the discerning individual.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Link to="/products" className="btn btn-primary btn-lg px-5 shadow-soft">Shop Collection</Link>
              </div>
            </div>
            {/* Optional decorative element could go here in the other column */}
            <div className="col-lg-6 d-none d-lg-block text-center ps-lg-5">
              <img
                src="/hero.png"
                alt="Premium Collection"
                className="img-fluid hero-image floating-animation"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card text-center text-md-start">
              <div className="feature-icon shadow-sm">
                <i className="bi bi-truck"></i>
              </div>
              <h4>Free Shipping</h4>
              <p className="text-secondary mb-0">On all orders over $50. Global delivery partners ensures safety.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card text-center text-md-start">
              <div className="feature-icon shadow-sm">
                <i className="bi bi-shield-check"></i>
              </div>
              <h4>Secure Payment</h4>
              <p className="text-secondary mb-0">100% secure payment processing with modern encryption standards.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card text-center text-md-start">
              <div className="feature-icon shadow-sm">
                <i className="bi bi-arrow-counterclockwise"></i>
              </div>
              <h4>Easy Returns</h4>
              <p className="text-secondary mb-0">30-day return policy for a stress-free shopping experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-5 mb-5">
        <div className="text-center mb-5">
          <h2 className="section-title">Featured Collection</h2>
          <p className="section-subtitle">Hand-picked items just for you.</p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/products" className="btn btn-outline-primary px-5 rounded-pill">View All Products</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
