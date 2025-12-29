import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../utils/api';
import './Checkout.css';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getTotalPrice();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';

    // Demo payment validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to top to show errors if needed, or just let them see the red inputs
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        orderItems: items.map(item => ({
          product: item._id || item.id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        totalPrice: total,
      };

      await createOrder(orderData);
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Error creating order:', error);
      setIsProcessing(false);
      alert('Error placing order. Please try again.');
    }
  };

  // ... (keeping helper functions simplified for brevity, logic remains same)
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: '' }));
  };

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">Cart is empty</h2>
        <button className="btn btn-primary rounded-pill" onClick={() => navigate('/products')}>Go to Shop</button>
      </div>
    );
  }

  return (
    <div className="container py-5 fade-in">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Checkout</h1>
        <p className="text-secondary">Complete your purchase securely</p>
      </div>

      <div className="row g-5">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>

            {/* Shipping Info */}
            <div className="card shadow-soft border-0 mb-4 rounded-4 overflow-hidden">
              <div className="card-header bg-surface py-3 border-0">
                <h5 className="mb-0 fw-bold"><i className="bi bi-geo-alt me-2"></i> Shipping Information</h5>
              </div>
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-sm-6">
                    <label className="form-label">First Name</label>
                    <input type="text" name="firstName" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} value={formData.firstName} onChange={handleChange} />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">Last Name</label>
                    <input type="text" name="lastName" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Phone</label>
                    <input type="tel" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" name="address" className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={formData.address} onChange={handleChange} />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>
                  <div className="col-md-5">
                    <label className="form-label">City</label>
                    <input type="text" name="city" className={`form-control ${errors.city ? 'is-invalid' : ''}`} value={formData.city} onChange={handleChange} />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">State</label>
                    <input type="text" name="state" className={`form-control ${errors.state ? 'is-invalid' : ''}`} value={formData.state} onChange={handleChange} />
                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Zip Code</label>
                    <input type="text" name="zipCode" className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`} value={formData.zipCode} onChange={handleChange} />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="card shadow-soft border-0 mb-4 rounded-4 overflow-hidden">
              <div className="card-header bg-surface py-3 border-0">
                <h5 className="mb-0 fw-bold"><i className="bi bi-credit-card me-2"></i> Payment Information</h5>
              </div>
              <div className="card-body p-4">
                <div className="alert alert-light border d-flex align-items-center mb-4 rounded-3">
                  <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                  <small className="text-secondary">This is a demo. No charges will be made. Data is not saved.</small>
                </div>

                <div className="row g-4">
                  <div className="col-12">
                    <label className="form-label">Card Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-secondary"><i className="bi bi-credit-card-2-front"></i></span>
                      <input type="text" name="cardNumber" className={`form-control border-start-0 ${errors.cardNumber ? 'is-invalid' : ''}`} value={formData.cardNumber} onChange={handleCardNumberChange} placeholder="0000 0000 0000 0000" maxLength="19" />
                      {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Cardholder Name</label>
                    <input type="text" name="cardName" className={`form-control ${errors.cardName ? 'is-invalid' : ''}`} value={formData.cardName} onChange={handleChange} />
                    {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Expiry</label>
                    <input type="text" name="expiryDate" className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`} value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" maxLength="5" />
                    {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">CVV</label>
                    <input type="text" name="cvv" className={`form-control ${errors.cvv ? 'is-invalid' : ''}`} value={formData.cvv} onChange={handleChange} placeholder="123" maxLength="3" />
                    {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                  </div>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0 pb-4 pt-0">
                <button type="submit" className="btn btn-primary d-none d-lg-block w-100 py-3 fs-5 fw-bold rounded-pill shadow-sm" disabled={isProcessing}>
                  {isProcessing ? 'Processing Order...' : `Pay $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Side */}
        <div className="col-lg-4">
          <div className="card shadow-soft border-0 position-sticky rounded-4 overflow-hidden" style={{ top: '100px' }}>
            <div className="card-header bg-surface py-3 border-0">
              <h5 className="mb-0 fw-bold">Your Order</h5>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {items.map(item => (
                  <li key={item.id} className="list-group-item d-flex gap-3 py-3 border-opacity-10">
                    <div className="bg-light rounded p-1 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                      <img src={item.image || 'https://placehold.co/100'} alt={item.name} className="img-fluid object-fit-contain" style={{ maxHeight: '100%' }} />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 small fw-bold text-truncate" style={{ maxWidth: '160px' }}>{item.name}</h6>
                      <small className="text-secondary">Qty: {item.quantity}</small>
                    </div>
                    <span className="fw-bold small">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer bg-surface p-4 border-top-0">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Subtotal</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">Shipping</span>
                <span className="text-success fw-bold">Free</span>
              </div>
              <hr className="opacity-10" />
              <div className="d-flex justify-content-between h5 fw-bold text-dark mb-0">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                type="button"
                className="btn btn-primary w-100 mt-4 d-lg-none py-3 fw-bold rounded-pill"
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
