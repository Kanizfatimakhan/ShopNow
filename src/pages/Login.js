import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      if (result.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  if (!selectedRole) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="row w-100 justify-content-center fade-in">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="text-center mb-5">
              <h1 className="fw-bold mb-3">Welcome to ShopNow</h1>
              <p className="text-secondary fs-5">Please select how you would like to continue</p>
            </div>
            <div className="row g-4 justify-content-center">
              <div className="col-md-5">
                <button
                  onClick={() => setSelectedRole('user')}
                  className="card h-100 w-100 p-5 border-0 shadow-sm bg-surface hover-lift text-decoration-none text-center align-items-center justify-content-center"
                >
                  <div className="bg-white rounded-circle p-4 mb-4 shadow-sm d-inline-flex">
                    <span className="fs-1">🛍️</span>
                  </div>
                  <h3 className="fw-bold text-adaptive mb-2">Customer</h3>
                  <p className="text-secondary mb-0">Browse and shop products</p>
                </button>
              </div>
              <div className="col-md-5">
                <button
                  onClick={() => setSelectedRole('admin')}
                  className="card h-100 w-100 p-5 border-0 shadow-sm bg-surface hover-lift text-decoration-none text-center align-items-center justify-content-center"
                >
                  <div className="bg-white rounded-circle p-4 mb-4 shadow-sm d-inline-flex">
                    <span className="fs-1">🛡️</span>
                  </div>
                  <h3 className="fw-bold text-adaptive mb-2">Admin</h3>
                  <p className="text-secondary mb-0">Manage store and inventory</p>
                </button>
              </div>
            </div>
            {/* Login/Register Toggle at Selection Screen too */}
            <div className="text-center mt-5">
              <span className="text-secondary me-2">New here? </span>
              <Link to="/register" className="fw-bold text-primary text-decoration-none">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="row w-100 justify-content-center fade-in">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card shadow-lg border-0 my-5">
            <div className="auth-card-body position-relative">
              <button
                onClick={() => setSelectedRole(null)}
                className="btn btn-sm btn-outline-secondary position-absolute top-0 start-0 m-3 rounded-circle border-0"
                title="Back to Role Selection"
                style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <i className="bi bi-arrow-left"></i>
              </button>

              <div className="text-center mb-4 pt-3">
                <Link to="/" className="text-decoration-none">
                  <h3 className="fw-bold text-adaptive m-0 letter-spacing-tight">ShopNow</h3>
                </Link>
              </div>
              <h2 className="auth-title text-center mb-1">
                {selectedRole === 'admin' ? 'Admin Login' : 'Customer Login'}
              </h2>
              <p className="auth-subtitle text-center">Sign in to manage your account</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                  />
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label className="form-label">Password</label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                  />
                  {/* Keep simplified for UI - forgot password would go here */}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 mb-4 shadow-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : null}
                  {loading ? 'Logging in...' : 'Sign In'}
                </button>
              </form>



              {error && <div className="alert alert-danger py-2 mb-3 text-center small rounded-3">{error}</div>}

              <div className="auth-divider">
                <span>or</span>
              </div>

              <div className="text-center">
                <span className="text-secondary me-2">New to ShopNow? </span>
                <Link to="/register" className="fw-bold text-primary text-decoration-none">Create an account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
