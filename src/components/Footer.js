import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-surface pt-5 pb-4 mt-auto border-top border-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="footer-heading">ShopNow</h5>
            <p className="text-secondary mb-4" style={{ maxWidth: '300px' }}>
              Your trusted online shopping destination. Discover quality products curated for your modern lifestyle.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#!" className="social-icon text-decoration-none" aria-label="Facebook"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#!" className="social-icon text-decoration-none" aria-label="Twitter"><i className="bi bi-twitter fs-5"></i></a>
              <a href="#!" className="social-icon text-decoration-none" aria-label="Instagram"><i className="bi bi-instagram fs-5"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="footer-heading">Shop</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/products" className="text-decoration-none footer-link">All Products</Link></li>
              <li><Link to="/products?category=Electronics" className="text-decoration-none footer-link">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="text-decoration-none footer-link">Fashion</Link></li>
              <li><Link to="/products?category=Home" className="text-decoration-none footer-link">Home</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="footer-heading">Support</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/profile" className="text-decoration-none footer-link">My Account</Link></li>
              <li><Link to="/cart" className="text-decoration-none footer-link">Track Order</Link></li>
              <li><button className="btn p-0 text-decoration-none footer-link border-0 bg-transparent">Returns</button></li>
              <li><button className="btn p-0 text-decoration-none footer-link border-0 bg-transparent">FAQ</button></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="footer-heading">Newsletter</h5>
            <p className="text-secondary mb-3">Subscribe to receive updates and exclusive offers.</p>
            <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" className="form-control rounded-pill" placeholder="Enter your email" />
              <button className="btn btn-primary rounded-pill px-4" type="button">Join</button>
            </form>
          </div>
        </div>

        <hr className="my-5 opacity-25" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <small className="text-secondary">&copy; 2025 ShopNow Inc. All rights reserved.</small>

          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <div className="d-flex gap-3 justify-content-center justify-content-md-end">
              <span className="text-muted small"><i className="bi bi-credit-card-2-front"></i> Secure Payment</span>
              <span className="text-muted small"><i className="bi bi-shield-check"></i> SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
