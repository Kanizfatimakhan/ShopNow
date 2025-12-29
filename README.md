# ShopNow - Full-Stack Ecommerce Website

A complete, full-featured ecommerce website built with React frontend and Node.js/Express backend, integrated with MongoDB for data storage. Features user authentication, admin portal, product management, shopping cart, and order processing.

## Features

### Frontend Features
- 🛍️ **Product Catalog**: Browse products across multiple categories (Electronics, Fashion, Home, Sports)
- 🔍 **Search & Filter**: Search products by name or filter by category
- 🛒 **Shopping Cart**: Add, remove, and update quantities with persistent cart storage
- 👤 **User Authentication**: Register and login functionality
- 🔐 **Protected Routes**: Secure checkout and admin pages
- 👨‍💼 **Admin Portal**: Complete admin dashboard for managing products and orders
- 📱 **Responsive Design**: Fully responsive design that works on all devices
- 💳 **Order Management**: Complete checkout process with order creation
- ✨ **Modern UI**: Beautiful, professional interface with smooth animations

### Backend Features
- 🚀 **RESTful API**: Complete REST API with Express.js
- 🔒 **Authentication**: JWT-based authentication with bcrypt password hashing
- 📦 **MongoDB Integration**: MongoDB database with Mongoose ODM
- 🛡️ **Middleware**: Protected routes and admin-only access
- 📊 **CRUD Operations**: Full CRUD for products and orders
- 🔐 **Security**: Password hashing, JWT tokens, CORS enabled

## Project Structure

```
├── server/                 # Backend server
│   ├── config/            # Configuration files
│   │   └── db.js          # MongoDB connection
│   ├── controllers/       # Route controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js        # Authentication middleware
│   ├── models/            # MongoDB models
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   └── server.js          # Express server setup
│
├── src/                   # Frontend React app
│   ├── components/        # Reusable components
│   │   ├── s
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   └── ProtectedRoute.js
│   ├── context/           # React Context
│   │   ├── AuthContext.js # Authentication state
│   │   └── CartContext.js # Cart state
│   ├── pages/             # Page components
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── OrderSuccess.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Admin.js
│   ├── utils/             # Utility functions
│   │   └── api.js         # API calls
│   └── App.js             # Main app component
```

## MongoDB Collections

The application uses three main collections:

### 1. **users**
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `role` (String, enum: 'admin' | 'customer', default: 'customer')
- `createdAt` (Date)
- `updatedAt` (Date)

### 2. **products**
- `name` (String, required)
- `price` (Number, required)
- `image` (String, required)
- `category` (String, enum: 'Electronics' | 'Fashion' | 'Home' | 'Sports')
- `description` (String, required)
- `rating` (Number, default: 0)
- `inStock` (Boolean, default: true)
- `stock` (Number, default: 0)
- `createdAt` (Date)
- `updatedAt` (Date)

### 3. **orders**
- `user` (ObjectId, ref: User)
- `orderItems` (Array of objects with product details)
- `shippingAddress` (Object with address fields)
- `paymentMethod` (String, default: 'demo')
- `totalPrice` (Number, required)
- `isPaid` (Boolean, default: false)
- `paidAt` (Date)
- `isDelivered` (Boolean, default: false)
- `deliveredAt` (Date)
- `createdAt` (Date)
- `updatedAt` (Date)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/ecommerce

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here

# React App API URL (optional)
REACT_APP_API_URL=http://localhost:5000/api
```

3. **MongoDB Connection Setup:**

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/ecommerce`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Click "Connect" → "Connect your application"
- Copy the connection string
- Replace `<password>` with your database password
- Replace `<dbname>` with `ecommerce` or your preferred database name
- Add the connection string to your `.env` file

4. **Run the application:**

**Option 1: Run frontend and backend separately (recommended for development):**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm start
```

**Option 2: Run both together:**
```bash
npm run dev
```

5. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with query params: category, search)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user's orders (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/:id` - Get single order (Protected)
- `PUT /api/orders/:id/deliver` - Mark order as delivered (Admin only)

## Admin Portal

1. Register a new user account
2. Manually change the user role to 'admin' in MongoDB:
```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```
3. Login with admin credentials
4. Access the admin portal at `/admin`

Admin features:
- View all products
- Add new products
- Edit existing products
- Delete products
- View all orders
- Mark orders as delivered

## Available Scripts

- `npm start` - Run React frontend (development)
- `npm run server` - Run Express backend server
- `npm run dev` - Run both frontend and backend concurrently
- `npm run build` - Build React app for production
- `npm test` - Run tests

## Technologies Used

### Frontend
- React 19.2.3
- React Router DOM 6.26.0
- Axios for API calls
- Context API for state management
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Admin-only access for sensitive operations
- Input validation
- CORS configuration

## Notes

- Images are sourced from Unsplash (free stock photos)
- Cart data persists in browser localStorage
- Payment system is for demonstration purposes only
- JWT tokens expire after 30 days
- All API requests require authentication token (except login/register)

## License

This project is created for educational/demonstration purposes.
