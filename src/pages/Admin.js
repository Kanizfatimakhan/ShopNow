import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProducts, createProduct, updateProduct, deleteProduct, getOrders, updateOrderToDelivered } from '../utils/api';
import './Admin.css';

const Admin = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'Electronics',
    description: '',
    inStock: true,
    stock: 0,
  });

  useEffect(() => {
    if (activeTab === 'products') {
      loadProducts();
    } else if (activeTab === 'orders') {
      loadOrders();
    }
  }, [activeTab]);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
      } else {
        await createProduct(productData);
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        image: '',
        category: 'Electronics',
        description: '',
        inStock: true,
        stock: 0,
      });
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      description: product.description,
      inStock: product.inStock,
      stock: product.stock || 0,
    });
    setShowProductForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const handleMarkDelivered = async (orderId) => {
    try {
      await updateOrderToDelivered(orderId);
      loadOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order');
    }
  };

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="h2 fw-bold mb-1">Admin Portal</h1>
          <p className="text-secondary mb-0">Manage products and view orders.</p>
        </div>
        <button onClick={logout} className="btn btn-outline-danger btn-sm rounded-pill px-4">Logout</button>
      </div>

      <div className="card border-0 shadow-soft bg-surface rounded-4 overflow-hidden mb-5">
        <div className="card-header bg-panel border-bottom px-4 pt-4 pb-0">
          <ul className="nav nav-pills card-header-pills gap-3">
            <li className="nav-item">
              <button
                className={`nav-link rounded-pill px-4 fw-bold ${activeTab === 'products' ? 'active tab-products shadow-sm' : 'text-body'}`}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link rounded-pill px-4 fw-bold ${activeTab === 'orders' ? 'active tab-orders shadow-sm' : 'text-body'}`}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body p-4">
          {activeTab === 'products' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0">All Products ({products.length})</h5>
                <button
                  className="btn btn-primary rounded-pill shadow-sm"
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({
                      name: '',
                      price: '',
                      image: '',
                      category: 'Electronics',
                      description: '',
                      inStock: true,
                      stock: 0,
                    });
                    setShowProductForm(true);
                  }}
                >
                  <i className="bi bi-plus-lg me-2"></i>Add New
                </button>
              </div>

              {showProductForm && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center p-3 fade-in" style={{ zIndex: 1050 }}>
                  <div className="card shadow-lg w-100 border-0 rounded-4" style={{ maxWidth: '600px' }}>
                    <div className="card-header bg-panel border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                      <h4 className="mb-0 fw-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
                      <button type="button" className="btn-close" onClick={() => setShowProductForm(false)}></button>
                    </div>
                    <div className="card-body p-4">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label fs-7 fw-bold text-uppercase text-secondary">Name</label>
                            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fs-7 fw-bold text-uppercase text-secondary">Price</label>
                            <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} step="0.01" required />
                          </div>
                          <div className="col-12">
                            <label className="form-label fs-7 fw-bold text-uppercase text-secondary">Image URL</label>
                            <input type="url" name="image" className="form-control" value={formData.image} onChange={handleChange} required />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fs-7 fw-bold text-uppercase text-secondary">Category</label>
                            <select name="category" className="form-select" value={formData.category} onChange={handleChange} required>
                              <option value="Electronics">Electronics</option>
                              <option value="Fashion">Fashion</option>
                              <option value="Home">Home</option>
                              <option value="Sports">Sports</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fs-7 fw-bold text-uppercase text-secondary">Stock</label>
                            <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} min="0" required />
                          </div>
                          <div className="col-12">
                            <label className="form-label fs-7 fw-bold text-uppercase text-secondary">Description</label>
                            <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required rows="3" />
                          </div>
                          <div className="col-12">
                            <div className="form-check form-switch">
                              <input type="checkbox" name="inStock" className="form-check-input" checked={formData.inStock} onChange={handleChange} id="inStockCheck" />
                              <label className="form-check-label" htmlFor="inStockCheck">In Stock</label>
                            </div>
                          </div>
                          <div className="col-12 d-flex gap-2 justify-content-end mt-4">
                            <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowProductForm(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={loading}>
                              {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              <div className="table-responsive rounded-3 border">
                <table className="table table-hover align-middle mb-0 bg-panel">
                  <thead className="bg-panel-secondary">
                    <tr>
                      <th scope="col" className="ps-4 py-3 text-secondary text-uppercase small">Product</th>
                      <th scope="col" className="py-3 text-secondary text-uppercase small">Category</th>
                      <th scope="col" className="py-3 text-secondary text-uppercase small">Price</th>
                      <th scope="col" className="py-3 text-secondary text-uppercase small">Stock</th>
                      <th scope="col" className="py-3 text-secondary text-uppercase small">Status</th>
                      <th scope="col" className="text-end pe-4 py-3 text-secondary text-uppercase small">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="ps-4">
                          <div className="d-flex align-items-center">
                            <div className="bg-light rounded p-1" style={{ width: '48px', height: '48px' }}>
                              <img src={product.image || 'https://placehold.co/100'} alt={product.name} className="w-100 h-100 object-fit-contain"
                                onError={(e) => { e.target.src = 'https://placehold.co/100' }} />
                            </div>
                            <div className="ms-3">
                              <h6 className="mb-0 fw-bold">{product.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="text-secondary">{product.category}</td>
                        <td className="fw-bold">${product.price.toFixed(2)}</td>
                        <td>{product.stock || 0}</td>
                        <td>
                          {product.inStock ? (
                            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3">In Stock</span>
                          ) : (
                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3">Out of Stock</span>
                          )}
                        </td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end gap-2">
                            <button onClick={() => handleEdit(product)} className="btn btn-sm btn-light border rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} title="Edit">
                              <i className="bi bi-pencil-fill small text-primary"></i>
                            </button>
                            <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-light border rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} title="Delete">
                              <i className="bi bi-trash-fill small text-danger"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="row g-4">
              {orders.map((order) => (
                <div key={order._id} className="col-12">
                  <div className="card shadow-sm border rounded-4 overflow-hidden">
                    <div className="card-header bg-panel-secondary py-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <div>
                        <span className="fw-bold me-2">Order #{order._id.slice(-8)}</span>
                        <span className="text-muted small">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        {order.isDelivered ? (
                          <span className="badge bg-success text-white px-3 py-2 rounded-pill">Delivered</span>
                        ) : (
                          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Pending</span>
                        )}
                        {!order.isDelivered && (
                          <button
                            onClick={() => handleMarkDelivered(order._id)}
                            className="btn btn-sm btn-success rounded-pill px-3 ms-2"
                          >
                            Mark Delivered
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="card-body p-4">
                      <div className="row g-4">
                        <div className="col-lg-8">
                          <h6 className="fw-bold text-secondary text-uppercase small mb-3">Items</h6>
                          <div className="d-flex flex-column gap-3">
                            {order.orderItems.map((item, index) => (
                              <div key={index} className="d-flex align-items-center gap-3">
                                <div className="bg-light rounded p-1" style={{ width: '50px', height: '50px' }}>
                                  <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-contain"
                                    onError={(e) => { e.target.src = 'https://placehold.co/100' }} />
                                </div>
                                <div>
                                  <div className="fw-bold small">{item.name}</div>
                                  <small className="text-secondary">{item.quantity} x ${item.price.toFixed(2)}</small>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="bg-surface p-4 rounded-4">
                            <h6 className="fw-bold text-secondary text-uppercase small mb-3">Details</h6>
                            <div className="mb-3">
                              <div className="fw-bold small">Customer</div>
                              <div className="small text-secondary">{order.user?.name || 'N/A'} ({order.user?.email})</div>
                            </div>
                            <div className="mb-3">
                              <div className="fw-bold small">Shipping</div>
                              <div className="small text-secondary">
                                {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                                {order.shippingAddress.state}, {order.shippingAddress.zipCode}
                              </div>
                            </div>
                            <hr className="my-3" />
                            <div className="d-flex justify-content-between fw-bold">
                              <span>Total</span>
                              <span className="text-primary">${order.totalPrice.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Admin;
