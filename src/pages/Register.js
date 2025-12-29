import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register, user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Note: Default registration is for 'user'. Admin registration usually requires backend config.
    // We strictly register as 'user' here for safety unless backend API changes.
    const result = await register(formData.name, formData.email, formData.password);

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
              <h1 className="fw-bold mb-3">Join ShopNow</h1>
              <p className="text-secondary fs-5">Please select your account type</p>
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
                  <p className="text-secondary mb-0">Create a personal account</p>
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
                  <p className="text-secondary mb-0">Register store administrator</p>
                </button>
              </div>
            </div>
            <div className="text-center mt-5">
              <span className="text-secondary me-2">Already have an account? </span>
              <Link to="/login" className="fw-bold text-primary text-decoration-none">Login here</Link>
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
                {selectedRole === 'admin' ? 'Create Admin Account' : 'Create Account'}
              </h2>
              <p className="auth-subtitle text-center">Join us to start shopping</p>

              {error && <div className="alert alert-danger py-2 mb-3 text-center small rounded-3">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

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

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a password"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 mb-4 shadow-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : null}
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
              </form>

              <div className="text-center">
                <span className="text-secondary me-2">Already have an account? </span>
                <Link to="/login" className="fw-bold text-primary text-decoration-none">Login here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
