import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Used for mobile toggle
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  // Check if we're on login or register page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Auth Layout Header
  if (isAuthPage) {
    return (
      <header className="navbar navbar-expand-lg sticky-top app-header shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ShopNow
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg sticky-top py-3 shadow-sm app-header">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ShopNow
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarContent">

            {/* Search Bar - Centered on Desktop */}
            <form className="d-flex mx-auto my-3 my-lg-0 w-100" style={{ maxWidth: '500px' }} onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  className="form-control rounded-start-pill border-end-0"
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-secondary rounded-end-pill border-start-0" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link p-0 border-0"
                  onClick={toggleTheme}
                  title="Toggle theme"
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link fw-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link fw-medium" onClick={() => setIsMenuOpen(false)}>Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link fw-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
              </li>

              <li className="nav-item">
                <Link to="/cart" className="nav-link position-relative fw-medium" onClick={() => setIsMenuOpen(false)}>
                  🛒 Cart
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>

              {user ? (
                <>
                  {user.role === 'admin' && (
                    <li className="nav-item">
                      <Link to="/admin" className="nav-link text-primary fw-medium" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                    </li>
                  )}
                  <li className="nav-item dropdown">
                    {/* Using simple click handler for dropdown since Bootstrap JS might conflict with React state if not careful */}
                    <div className="dropdown">
                      <button
                        className="btn btn-light rounded-circle border d-flex align-items-center justify-content-center"
                        style={{ width: '40px', height: '40px' }}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        👤
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                        <li><span className="dropdown-header">Hi, {user.name || 'User'}</span></li>
                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                      </ul>
                    </div>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary px-4 rounded-pill" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
