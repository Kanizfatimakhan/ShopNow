import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../utils/api';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadOrders();
  }, [user, navigate]);

  const loadOrders = async () => {
    try {
      const response = await getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container py-5 fade-in">
      <div className="row g-5">
        {/* Profile Card */}
        <div className="col-lg-4">
          <div className="card shadow-soft border-0 rounded-4 overflow-hidden sticky-top" style={{ top: '100px' }}>
            <div className="card-body text-center p-5">
              <div className="d-flex justify-content-center mb-4">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center display-4 fw-bold shadow-sm" style={{ width: '100px', height: '100px' }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <h3 className="fw-bold mb-1">{user.name}</h3>
              <p className="text-secondary mb-4">{user.email}</p>

              <div className="d-grid gap-2">
                <button onClick={logout} className="btn btn-outline-danger rounded-pill py-2">
                  <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                </button>
              </div>
            </div>
            <div className="card-footer bg-surface border-0 p-3 text-center">
              <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Member Since 2024</small>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="col-lg-8">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h4 className="fw-bold m-0">Order History</h4>
            <span className="badge bg-surface text-dark rounded-pill px-3 py-2 border">{orders.length} Orders</span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="card shadow-soft border-0 text-center p-5 rounded-4 bg-surface">
              <div className="mb-3 text-muted opacity-50"><i className="bi bi-bag-x" style={{ fontSize: '4rem' }}></i></div>
              <h5 className="fw-bold">No orders found</h5>
              <p className="text-secondary mb-4">Looks like you haven't placed any orders yet.</p>
              <div>
                <button onClick={() => navigate('/products')} className="btn btn-primary rounded-pill px-5">
                  Start Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {orders.map((order) => (
                <div key={order._id} className="card shadow-sm border-0 rounded-4 overflow-hidden">
                  <div className="card-header bg-white py-3 px-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                      <span className="fw-bold me-2">#{order._id.slice(-8)}</span>
                      <small className="text-secondary">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </small>
                    </div>
                    <div>
                      {order.isDelivered ? (
                        <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3">Delivered</span>
                      ) : (
                        <span className="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill px-3">Pending</span>
                      )}
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-3">
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="d-flex align-items-center gap-3 py-2 border-bottom border-light last-border-0">
                          <div className="bg-light rounded p-1" style={{ width: '60px', height: '60px' }}>
                            <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-contain"
                              onError={(e) => { e.target.src = 'https://placehold.co/100' }} />
                          </div>
                          <div className="flex-grow-1">
                            <div className="fw-bold small text-dark">{item.name}</div>
                            <small className="text-secondary">Qty: {item.quantity}</small>
                          </div>
                          <div className="fw-bold small">${item.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-2">
                      <span className="text-secondary small text-uppercase fw-bold">Total Amount</span>
                      <span className="fw-bold text-primary fs-5">${order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
