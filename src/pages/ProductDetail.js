import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, getProducts } from '../utils/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productResponse = await getProduct(id);
        const foundProduct = productResponse.data;

        if (foundProduct) {
          setProduct(foundProduct);
          // Load related products
          const allProductsResponse = await getProducts({ category: foundProduct.category });
          const related = allProductsResponse.data
            .filter(p => p._id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center fade-in">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading product...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center fade-in">
        <h2 className="mb-4 fw-bold">Product not found</h2>
        <button className="btn btn-primary rounded-pill px-4" onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Optional: show a toast or feedback instead of navigating
    navigate('/cart');
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row g-5 mb-5 align-items-center">
        {/* Product Image */}
        <div className="col-md-6">
          <div className="bg-white p-5 rounded-4 shadow-soft border-0 d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
            <img
              src={product.image || 'https://placehold.co/400x400/F5F6F2/9A9A9A?text=No+Image'}
              alt={product.name}
              className="img-fluid object-fit-contain"
              style={{ maxHeight: '500px' }}
              onError={(e) => { e.target.src = 'https://placehold.co/400x400/F5F6F2/9A9A9A?text=No+Image' }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><button className="btn p-0 text-muted" onClick={() => navigate('/')}>Home</button></li>
              <li className="breadcrumb-item"><button className="btn p-0 text-muted" onClick={() => navigate('/products')}>Products</button></li>
              <li className="breadcrumb-item active" aria-current="page">{product.category}</li>
            </ol>
          </nav>

          <h1 className="display-5 fw-bold mb-2">{product.name}</h1>

          <div className="d-flex align-items-center mb-4">
            <span className="text-warning me-2 d-flex">
              {'★'.repeat(Math.round(product.rating || 0))}
              <span className="text-muted opacity-25">{'★'.repeat(5 - Math.round(product.rating || 0))}</span>
            </span>
            <span className="text-muted small">({product.numReviews || 0} reviews)</span>
          </div>

          <h2 className="display-6 fw-bold mb-4">${product.price.toFixed(2)}</h2>

          <p className="text-secondary mb-5 lead fs-6" style={{ lineHeight: '1.8' }}>{product.description}</p>

          <div className="d-flex align-items-end gap-3 mb-4">
            <div style={{ maxWidth: '120px' }}>
              <label className="form-label fw-bold text-uppercase small letter-spacing-tight">Quantity</label>
              <div className="input-group">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <span className="form-control text-center border-secondary-subtle bg-transparent">{quantity}</span>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex gap-3">
            <button
              className="btn btn-primary btn-lg rounded-pill px-5 flex-grow-1 flex-md-grow-0"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <i className="bi bi-bag-plus me-2"></i>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="btn btn-outline-secondary btn-lg rounded-pill px-3">
              <i className="bi bi-heart"></i>
            </button>
          </div>

          {!product.inStock && (
            <p className="text-danger fw-bold mt-3">This product is currently out of stock.</p>
          )}

          <div className="d-flex gap-4 text-muted small mt-5 pt-4 border-top">
            <div className="d-flex align-items-center"><i className="bi bi-truck fs-5 me-2"></i> Free Shipping</div>
            <div className="d-flex align-items-center"><i className="bi bi-shield-check fs-5 me-2"></i> 2 Year Warranty</div>
            <div className="d-flex align-items-center"><i className="bi bi-arrow-return-left fs-5 me-2"></i> 30 Days Return</div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-5 pt-5 border-top">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold m-0">Related Products</h3>
            <button className="btn btn-link text-primary text-decoration-none fw-bold" onClick={() => navigate(`/products?category=${product.category}`)}>View More</button>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {relatedProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
