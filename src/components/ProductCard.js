import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = React.useState(product.image);

  const handleImageError = () => {
    // Fallback to a clean placeholder that matches the theme
    setImgSrc('https://placehold.co/400x400/F5F6F2/9A9A9A?text=No+Image');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="col fade-in">
      <Link to={`/products/${product._id}`} className="product-card-link">
        <div className="card h-100 border-0 shadow-soft product-card-hover">
          <div className="position-relative overflow-hidden img-wrapper" style={{ height: '260px' }}>
            <img
              src={imgSrc}
              onError={handleImageError}
              className="card-img-top w-100 h-100 object-fit-contain p-4"
              alt={product.name}
            />
            {!product.inStock && (
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-overlay d-flex align-items-center justify-content-center">
                <span className="badge bg-danger px-3 py-2 shadow-sm rounded-pill">
                  Out of Stock
                </span>
              </div>
            )}
            {product.stock > 0 && product.stock < 5 && (
              <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 shadow-sm rounded-pill">
                Low Stock
              </span>
            )}

            {/* Quick Actions Overlay */}
            <div className="card-actions position-absolute bottom-0 start-0 w-100 p-3 d-flex justify-content-center gap-2">
              <button
                className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center action-btn"
                style={{ width: '40px', height: '40px' }}
                onClick={handleAddToCart}
                title="Add to Cart"
                disabled={!product.inStock}
              >
                <i className="bi bi-bag-plus-fill text-dark"></i>
              </button>
              <div
                className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center action-btn"
                style={{ width: '40px', height: '40px' }}
                title="View Details"
              >
                <i className="bi bi-eye-fill text-dark"></i>
              </div>
            </div>
          </div>
          <div className="card-body d-flex flex-column p-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <small className="text-uppercase text-secondary fw-bold letter-spacing-tight" style={{ fontSize: '0.7rem' }}>
                {product.category}
              </small>
              <div className="d-flex align-items-center text-warning small">
                <i className="bi bi-star-fill me-1"></i>
                <span>{product.rating}</span>
              </div>
            </div>

            <h5 className="card-title text-truncate mb-3 fw-bold">{product.name}</h5>

            <div className="mt-auto d-flex align-items-center justify-content-between">
              <span className="fs-5 fw-bold">${product.price.toFixed(2)}</span>
              <button
                className="btn btn-dark rounded-pill px-3 py-2 btn-sm transition-all"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                style={{ opacity: product.inStock ? 1 : 0.5 }}
              >
                {product.inStock ? 'Add' : 'Sold'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
