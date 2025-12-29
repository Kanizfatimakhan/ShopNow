import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center fade-in" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="mb-4">
          <div className="bg-surface d-inline-flex rounded-circle p-4 mb-3">
            <i className="bi bi-cart3 fs-1 text-muted"></i>
          </div>
          <h2 className="mb-3 fw-bold">Your cart is empty</h2>
          <p className="text-secondary mb-4">Looks like you haven't added any items to the cart yet.</p>
          <Link to="/products" className="btn btn-primary rounded-pill px-5 py-3 shadow-soft">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const total = getTotalPrice();

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="h3 fw-bold mb-0">Shopping Cart <span className="text-muted fw-normal ms-2">({items.length} Items)</span></h1>
        <button onClick={clearCart} className="btn btn-link text-danger text-decoration-none fw-bold btn-sm">Clear Cart</button>
      </div>

      <div className="row g-5">
        {/* Cart Items List */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-4">
            {items.map(item => (
              <div key={item._id} className="card shadow-sm border-0 bg-surface rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-3 col-sm-2">
                      <Link to={`/products/${item._id}`}>
                        <div className="bg-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ height: '80px', width: '80px' }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid"
                            style={{ objectFit: 'contain', maxHeight: '100%' }}
                            onError={(e) => { e.target.src = 'https://placehold.co/100x100/F5F6F2/9A9A9A?text=No+Img' }}
                          />
                        </div>
                      </Link>
                    </div>

                    <div className="col-9 col-sm-5 mb-3 mb-sm-0">
                      <Link to={`/products/${item._id}`} className="text-decoration-none text-reset">
                        <h6 className="mb-1 text-truncate fw-bold">{item.name}</h6>
                      </Link>
                      <small className="text-secondary d-block mb-2">{item.category}</small>
                      <span className="fw-bold d-sm-none">${item.price.toFixed(2)}</span>
                    </div>

                    <div className="col-6 col-sm-3 d-flex align-items-center justify-content-sm-center">
                      <div className="input-group input-group-sm rounded-pill border bg-white overflow-hidden" style={{ width: '100px' }}>
                        <button
                          className="btn btn-link text-reset text-decoration-none border-0 px-2"
                          type="button"
                          onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                        ><i className="bi bi-dash"></i></button>
                        <span className="form-control text-center border-0 bg-transparent fw-bold p-1">{item.quantity}</span>
                        <button
                          className="btn btn-link text-reset text-decoration-none border-0 px-2"
                          type="button"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        ><i className="bi bi-plus"></i></button>
                      </div>
                    </div>

                    <div className="col-6 col-sm-2 text-end">
                      <div className="fw-bold mb-2 fs-5 d-none d-sm-block">${(item.price * item.quantity).toFixed(2)}</div>
                      <button
                        className="btn btn-link text-muted p-0 text-decoration-none hover-danger"
                        onClick={() => removeFromCart(item._id)}
                        aria-label="Remove item"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-soft bg-surface rounded-4 p-4 position-sticky" style={{ top: '100px' }}>
            <h5 className="card-title fw-bold mb-4">Order Summary</h5>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary">Subtotal</span>
              <span className="fw-bold">${total.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary">Shipping</span>
              <span className="text-success fw-bold">Free</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary">Tax (Estimated)</span>
              <span className="">$0.00</span>
            </div>

            <hr className="my-4 opacity-10" />

            <div className="d-flex justify-content-between mb-4 align-items-center">
              <span className="h5 fw-bold mb-0">Total</span>
              <span className="h4 fw-bold mb-0">${total.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>

            <Link to="/products" className="d-block text-center mt-4 text-secondary text-decoration-none fw-bold small">
              <i className="bi bi-arrow-left me-1"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
