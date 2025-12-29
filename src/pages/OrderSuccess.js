import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="container py-5 fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-soft border-0 rounded-4 text-center p-5 bg-white">
            <div className="mb-4">
              <div className="d-inline-flex bg-success-subtle rounded-circle p-3 mb-2">
                <i className="bi bi-check-lg text-success" style={{ fontSize: '4rem' }}></i>
              </div>
            </div>
            <h1 className="fw-bold mb-3 display-6">Order Confirmed!</h1>
            <p className="text-secondary mb-4 fs-5">Thank you for your purchase. We've received your order.</p>

            <div className="alert alert-light border border-info-subtle bg-info-subtle text-info-emphasis mb-5 rounded-3 d-inline-block text-start">
              <div className="d-flex">
                <i className="bi bi-info-circle-fill me-2 mt-1"></i>
                <div>
                  <strong>Demo Order</strong><br />
                  <small>This is a demonstration. No payment was actually processed.</small>
                </div>
              </div>
            </div>

            <div className="d-grid gap-3 d-sm-flex justify-content-center">
              <Link to="/" className="btn btn-outline-secondary rounded-pill px-5 py-3 fw-bold">Home</Link>
              <Link to="/products" className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
