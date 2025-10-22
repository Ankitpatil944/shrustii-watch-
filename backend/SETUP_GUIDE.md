# 🚀 Shrustii Watch Backend Setup Guide

Complete setup guide for the Shrustii Watch backend API with PostgreSQL and Stripe integration.

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- **pgAdmin** (optional) - [Download here](https://www.pgadmin.org/)
- **Stripe Account** - [Sign up here](https://stripe.com/)

## 🗄️ Database Setup

### 1. Install PostgreSQL

**Windows:**
1. Download PostgreSQL installer from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Make sure to install pgAdmin (optional but recommended)

**macOS:**
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Create Database

**Using psql (command line):**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE shrustii_watch;

# Create user (optional)
CREATE USER shrustii_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE shrustii_watch TO shrustii_user;

# Exit psql
\q
```

**Using pgAdmin:**
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name: `shrustii_watch`
5. Click "Save"

## 🔑 Environment Configuration

### 1. Update .env File

Open `backend/.env` and update with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shrustii_watch
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure_at_least_32_characters
JWT_EXPIRES_IN=7d

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 2. Get Stripe Keys

1. **Sign up for Stripe** at [stripe.com](https://stripe.com/)
2. **Go to Developers → API Keys**
3. **Copy your keys:**
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)
4. **For webhooks:** Go to Webhooks → Add endpoint → Copy signing secret

## 🚀 Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Run Database Migration

```bash
npm run migrate
```

This will:
- Create all database tables
- Set up relationships between models
- Configure indexes

### 3. Seed Database with Sample Data

```bash
npm run seed
```

This will create:
- Sample users (admin and customer)
- Sample luxury watch products
- Test data for development

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 🧪 Test the API

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "success",
  "message": "Shrustii Watch API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Test Authentication

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Test Products

```bash
curl http://localhost:5000/api/products
```

## 🔗 Frontend Integration

### 1. Update Frontend API Calls

In your React frontend, update API calls to point to the backend:

```javascript
// Example: Update your API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Example: Login function
const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Store token in localStorage
    localStorage.setItem('token', data.data.token);
    return data.data.user;
  }
  
  throw new Error(data.message);
};
```

### 2. Add Authentication Headers

```javascript
// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Example: Protected API call
const getCart = async () => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: getAuthHeaders(),
  });
  
  return response.json();
};
```

## 💳 Stripe Integration

### 1. Frontend Stripe Setup

Install Stripe in your frontend:

```bash
npm install @stripe/stripe-js
```

### 2. Create Payment Component

```javascript
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_your_publishable_key');

const PaymentForm = ({ amount, orderId }) => {
  const handlePayment = async () => {
    // Create payment intent
    const response = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ amount, orderId }),
    });
    
    const { clientSecret } = await response.json();
    
    // Confirm payment with Stripe
    const stripe = await stripePromise;
    const { error } = await stripe.confirmPayment({
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:3000/checkout/success',
      },
    });
    
    if (error) {
      console.error('Payment failed:', error);
    }
  };
  
  return (
    <button onClick={handlePayment}>
      Pay ${amount}
    </button>
  );
};
```

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:** Make sure PostgreSQL is running and check your connection details in `.env`

**2. JWT Secret Error**
```
Error: secretOrPrivateKey must have a value
```
**Solution:** Set a strong JWT_SECRET in your `.env` file (at least 32 characters)

**3. Stripe API Error**
```
Error: Invalid API Key provided
```
**Solution:** Check your Stripe keys in `.env` file

**4. CORS Error**
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solution:** The backend is configured for CORS, but make sure your frontend URL is correct in `.env`

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📊 Database Management

### View Data in pgAdmin

1. Open pgAdmin
2. Connect to your server
3. Navigate to `shrustii_watch` database
4. Browse tables: `users`, `products`, `cart_items`, `orders`, `order_items`

### Reset Database

```bash
# Drop and recreate all tables
npm run migrate

# Reseed with sample data
npm run seed
```

## 🚀 Production Deployment

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

### Security Checklist

- [ ] Use strong JWT secret (32+ characters)
- [ ] Use production database
- [ ] Use live Stripe keys
- [ ] Set up proper CORS origins
- [ ] Enable rate limiting
- [ ] Use HTTPS in production
- [ ] Set up proper logging
- [ ] Configure backup strategy

## 📞 Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify your `.env` configuration
3. Ensure PostgreSQL is running
4. Check your Stripe account status
5. Review the API documentation

## 🎉 Success!

Once everything is set up, you should have:

- ✅ Backend API running on `http://localhost:5000`
- ✅ PostgreSQL database with sample data
- ✅ JWT authentication working
- ✅ Stripe payment integration
- ✅ Complete e-commerce functionality

Your Shrustii Watch platform is now ready for development and testing!

---

**Happy Coding! 🚀**
