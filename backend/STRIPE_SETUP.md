# 💳 Stripe Setup Guide for Shrustii Watch

Complete guide to set up Stripe payments for your luxury watch e-commerce platform.

## 🚀 Quick Start

### 1. Create Stripe Account

1. **Visit:** [https://stripe.com](https://stripe.com)
2. **Click:** "Start now" or "Sign up"
3. **Fill in:**
   - Email: `your-email@example.com`
   - Password: `your-secure-password`
   - Business name: `Shrustii Watch Collection`
   - Country: `Your Country`

### 2. Complete Business Information

**Business Details:**
- **Business type:** Individual or Company
- **Business description:** "Luxury watch e-commerce platform"
- **Website:** `http://localhost:3000` (for development)
- **Business address:** Your address

**Tax Information:**
- **Tax ID:** Your business tax ID (if applicable)
- **Bank account:** Add your bank account for payouts

### 3. Get Your API Keys

1. **Login to Stripe Dashboard**
2. **Go to:** Developers → API Keys
3. **Copy your keys:**

#### 🔑 Publishable Key (Frontend)
```
pk_test_51ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZ567890
```
- **Use in:** React frontend
- **Safe to expose:** Yes, it's public

#### 🔐 Secret Key (Backend)
```
sk_test_51ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZ567890
```
- **Use in:** Node.js backend only
- **Keep secret:** Never expose this key

### 4. Update Your .env File

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 5. Test Your Setup

```bash
# Test Stripe connection
node test-stripe.js
```

## 🔧 Advanced Configuration

### Webhook Setup (Recommended)

1. **Go to:** Developers → Webhooks
2. **Click:** "Add endpoint"
3. **Endpoint URL:** `http://localhost:5000/api/payments/webhook`
4. **Select events:**
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`
5. **Click:** "Add endpoint"
6. **Copy signing secret:** `whsec_...`

### Test Cards

Use these test card numbers for development:

| Card Number | Brand | Result |
|-------------|-------|--------|
| `4242424242424242` | Visa | ✅ Success |
| `4000000000000002` | Visa | ❌ Declined |
| `4000000000009995` | Visa | ❌ Insufficient funds |
| `5555555555554444` | Mastercard | ✅ Success |
| `378282246310005` | American Express | ✅ Success |

**Test Details:**
- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any valid ZIP (e.g., 12345)

## 💰 Pricing & Fees

### Stripe Fees (US)
- **Online payments:** 2.9% + $0.30 per transaction
- **International cards:** +1.5% additional
- **No monthly fees**
- **No setup fees**

### Example for $25,000 Watch
- **Transaction fee:** $25,000 × 2.9% = $725
- **Fixed fee:** $0.30
- **Total fee:** $725.30
- **You receive:** $24,274.70

## 🛡️ Security Best Practices

### 1. Environment Variables
```env
# ✅ Good - Use environment variables
STRIPE_SECRET_KEY=sk_test_...

# ❌ Bad - Never hardcode in source code
const stripe = require('stripe')('sk_test_...');
```

### 2. Key Management
- **Never commit keys to Git**
- **Use different keys for development/production**
- **Rotate keys regularly**
- **Monitor API usage**

### 3. Webhook Security
```javascript
// Verify webhook signatures
const sig = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(
  req.body, 
  sig, 
  process.env.STRIPE_WEBHOOK_SECRET
);
```

## 🧪 Testing Your Integration

### 1. Test Payment Flow

```bash
# Start your backend
npm run dev

# Test payment intent creation
curl -X POST http://localhost:5000/api/payments/create-payment-intent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "amount": 25000,
    "currency": "usd",
    "orderId": "test-order-123"
  }'
```

### 2. Test Frontend Integration

```javascript
// In your React component
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_your_publishable_key');

const handlePayment = async () => {
  const stripe = await stripePromise;
  
  const { error } = await stripe.confirmPayment({
    clientSecret: 'pi_1234567890_secret_...',
    confirmParams: {
      return_url: 'http://localhost:3000/checkout/success',
    },
  });
  
  if (error) {
    console.error('Payment failed:', error);
  } else {
    console.log('Payment succeeded!');
  }
};
```

## 🚀 Going Live (Production)

### 1. Switch to Live Keys

1. **Complete business verification**
2. **Add bank account details**
3. **Get live API keys:**
   - **Publishable:** `pk_live_...`
   - **Secret:** `sk_live_...`

### 2. Update Production Environment

```env
# Production Stripe Keys
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
```

### 3. Update Webhook URL

```
https://yourdomain.com/api/payments/webhook
```

## 📊 Monitoring & Analytics

### Stripe Dashboard Features

1. **Payments:** View all transactions
2. **Customers:** Manage customer data
3. **Analytics:** Sales reports and insights
4. **Disputes:** Handle chargebacks
5. **Payouts:** Track money transfers

### Key Metrics to Monitor

- **Success rate:** % of successful payments
- **Average order value:** Revenue per transaction
- **Chargeback rate:** Disputes per transaction
- **Processing time:** Payment completion speed

## 🆘 Troubleshooting

### Common Issues

**1. "Invalid API Key"**
```bash
# Check your .env file
echo $STRIPE_SECRET_KEY

# Verify key format
# Should start with: sk_test_ or sk_live_
```

**2. "Payment Intent Creation Failed"**
```bash
# Check amount (must be in cents)
# $25.00 = 2500 cents
# $25000.00 = 2500000 cents
```

**3. "Webhook Signature Verification Failed"**
```bash
# Check webhook secret in .env
# Should start with: whsec_
```

**4. "CORS Error"**
```javascript
// Add your domain to Stripe dashboard
// Account Settings → Security → Allowed origins
```

### Debug Mode

```javascript
// Enable Stripe debug logging
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  maxNetworkRetries: 3,
  timeout: 30000,
});
```

## 📞 Support

### Stripe Support
- **Documentation:** [https://stripe.com/docs](https://stripe.com/docs)
- **Support:** [https://support.stripe.com](https://support.stripe.com)
- **Status:** [https://status.stripe.com](https://status.stripe.com)

### Community
- **Discord:** Stripe Developer Community
- **GitHub:** Stripe GitHub repositories
- **Stack Overflow:** Stripe tag

## 🎉 Success Checklist

- [ ] Stripe account created
- [ ] Business information completed
- [ ] API keys obtained
- [ ] Keys added to .env file
- [ ] Test connection successful
- [ ] Webhook configured (optional)
- [ ] Test payments working
- [ ] Frontend integration complete

---

**Your Stripe integration is now ready for luxury watch payments! 💎**
