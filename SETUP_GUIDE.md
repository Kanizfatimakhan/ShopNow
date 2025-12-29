# Complete Setup Guide - ShopNow Ecommerce Website

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB Connection

Create a `.env` file in the root directory with the following content:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_random_secret_key_here
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. MongoDB Connection Options

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `MONGODB_URI=mongodb://localhost:27017/ecommerce`

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (choose free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `ecommerce`
8. Example: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority`

### 4. Generate JWT Secret

Use any random string (at least 32 characters recommended):
```bash
# On Linux/Mac:
openssl rand -base64 32

# Or just use any random string like:
JWT_SECRET=my_super_secret_jwt_key_123456789
```

### 5. Seed Database (Optional)

This will add sample products and create an admin user:
```bash
npm run seed
```

Admin credentials (after seeding):
- Email: `admin@shopnow.com`
- Password: `admin123`

### 6. Run the Application

**Option 1: Run both frontend and backend together:**
```bash
npm run dev
```

**Option 2: Run separately (recommended for development):**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm start
```

### 7. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## MongoDB Collections

The application automatically creates these collections when you start using it:

### users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ('admin' | 'customer'),
  createdAt: Date,
  updatedAt: Date
}
```

### products
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  image: String (URL),
  category: String ('Electronics' | 'Fashion' | 'Home' | 'Sports'),
  description: String,
  rating: Number (0-5),
  inStock: Boolean,
  stock: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### orders
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  orderItems: [{
    product: ObjectId,
    name: String,
    image: String,
    price: Number,
    quantity: Number
  }],
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  paymentMethod: String,
  totalPrice: Number,
  isPaid: Boolean,
  paidAt: Date,
  isDelivered: Boolean,
  deliveredAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Creating an Admin User

### Method 1: Using MongoDB Compass or Shell

1. Register a regular user through the website
2. Connect to your MongoDB database
3. Find the user in the `users` collection
4. Update the `role` field to `"admin"`:

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Method 2: Using Seed Script

Run the seed script which creates an admin user:
```bash
npm run seed
```

Then login with:
- Email: `admin@shopnow.com`
- Password: `admin123`

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products
  - Query params: `?category=Electronics&search=laptop`
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

## Features

✅ User registration and login
✅ JWT-based authentication
✅ Product browsing with search and filters
✅ Shopping cart with persistent storage
✅ Secure checkout process
✅ Order management
✅ Admin portal for product and order management
✅ Protected routes
✅ Responsive design
✅ MongoDB database integration

## Troubleshooting

### MongoDB Connection Issues
- Verify your connection string is correct
- Check if MongoDB service is running (local)
- Verify network access rules in MongoDB Atlas
- Check if your IP is whitelisted in Atlas

### Port Already in Use
- Change PORT in .env file
- Kill process using port 5000: `npx kill-port 5000`

### JWT Errors
- Make sure JWT_SECRET is set in .env
- Use a strong, random secret key

### CORS Errors
- Backend CORS is enabled for all origins in development
- Check REACT_APP_API_URL in .env matches your backend URL

## Next Steps

1. Set up your MongoDB database
2. Create .env file with your connection string
3. Run `npm run seed` to populate sample data
4. Start the application with `npm run dev`
5. Register a user or use admin credentials
6. Start managing your ecommerce store!

