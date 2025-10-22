# Shrustii Watch Backend API

A comprehensive backend API for the Shrustii luxury watch e-commerce platform, built with Node.js, Express, PostgreSQL, and JWT authentication.

## 🚀 Features

- **JWT Authentication** - Secure user authentication and authorization
- **PostgreSQL Database** - Robust data storage with Sequelize ORM
- **Stripe Payment Integration** - Secure payment processing
- **RESTful API** - Well-structured API endpoints
- **Cart Management** - Shopping cart functionality
- **Order Management** - Complete order processing
- **Product Management** - Product catalog with filtering
- **User Management** - User profiles and preferences
- **Security** - Rate limiting, CORS, helmet, input validation
- **Error Handling** - Comprehensive error management

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Stripe** - Payment processing
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Stripe account (for payments)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=shrustii_watch
   DB_USER=postgres
   DB_PASSWORD=your_password
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

4. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE shrustii_watch;
   ```

5. **Run database migration**
   ```bash
   npm run migrate
   ```

6. **Seed the database with sample data**
   ```bash
   npm run seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Password reset

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/confirm-payment` - Confirm payment
- `POST /api/payments/create-customer` - Create Stripe customer
- `GET /api/payments/methods` - Get saved payment methods
- `POST /api/payments/webhook` - Stripe webhook handler

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 💳 Payment Integration

The API integrates with Stripe for payment processing:

1. **Create Payment Intent** - Generate a payment intent for client-side payment
2. **Confirm Payment** - Verify payment completion
3. **Webhook Handling** - Process Stripe webhooks for payment events

## 🗄️ Database Schema

### Users
- User authentication and profile information
- Role-based access control (customer, admin, staff)

### Products
- Product catalog with specifications and images
- Category-based organization
- Stock management

### Cart
- Shopping cart items with customization options
- User-specific cart management

### Orders
- Order processing and management
- Order items with product snapshots
- Status tracking

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
DB_HOST=your_production_db_host
DB_NAME=shrustii_watch_prod
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
JWT_SECRET=your_production_jwt_secret
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 API Documentation

### Request/Response Format

All API responses follow this format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

## 🔒 Security Features

- **Rate Limiting** - Prevent abuse with request rate limiting
- **CORS** - Configured for specific origins
- **Helmet** - Security headers
- **Input Validation** - Comprehensive request validation
- **SQL Injection Protection** - Sequelize ORM protection
- **XSS Protection** - Cross-site scripting prevention
- **Password Hashing** - bcrypt for secure password storage

## 🛠️ Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migration
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests

### Code Structure
```
backend/
├── config/          # Database configuration
├── middleware/      # Custom middleware
├── models/          # Sequelize models
├── routes/          # API routes
├── scripts/         # Database scripts
├── server.js        # Main server file
└── package.json     # Dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation

---

**Built with ❤️ for Shrustii Watch Collection**
