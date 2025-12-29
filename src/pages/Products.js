import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import './Products.css';

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All'
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  // Update selectedCategory if URL param changes externally
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (searchQuery) {
        params.search = searchQuery;
      }
      const response = await getProducts(params);
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 fade-in">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">Our Collection</h1>
        <p className="text-secondary lead fs-6">Explore our curated selection of premium products.</p>
      </div>

      <div className="row g-5">
        {/* Sidebar */}
        <div className="col-lg-3">
          <div className="card shadow-soft border-0 sticky-top bg-surface rounded-4" style={{ top: '100px', zIndex: 10 }}>
            <div className="card-header bg-transparent py-3 border-0">
              <h5 className="mb-0 fw-bold">Categories</h5>
            </div>
            <div className="card-body p-2">
              <div className="list-group list-group-flush">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`list-group-item list-group-item-action py-3 px-3 rounded-3 mb-1 border-0 ${selectedCategory === category ? 'bg-white text-dark fw-bold shadow-sm' : 'bg-transparent text-secondary'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="card-footer bg-transparent border-0 p-3 pt-0">
              <div className="p-3 bg-white rounded-3 mt-2 border border-color">
                <small className="text-muted fw-bold d-block mb-1 text-uppercase" style={{ fontSize: '0.7rem' }}>Need Help?</small>
                <p className="small mb-0 text-secondary">Contact our support team for any queries.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
            <h4 className="fw-bold mb-0 text-dark">
              {searchQuery ? `Results for "${searchQuery}"` : selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h4>
            <span className="badge bg-surface text-dark border rounded-pill px-3 py-2">
              {loading ? '...' : `${products.length} Products`}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5 bg-surface rounded-4">
              <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
              <h5 className="fw-bold">No products found</h5>
              <p className="text-secondary">Try a different search term or category.</p>
              <button className="btn btn-outline-primary mt-2 rounded-pill px-4" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}>Clear Filters</button>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
