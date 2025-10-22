import { loadStripe } from '@stripe/stripe-js';

// Your Stripe publishable key
const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51SKujgJ9Nb6CZ7njterxbeftQmdgZUPaLnH5BTWTrR9MGcg9yRuJc4yyolrLu79SoBL6uqAHt4GREWxaOCPo9F1m00Aza64lPX';

// Initialize Stripe
export const stripePromise = loadStripe(stripePublishableKey);

// Helper function to create payment intent
export const createPaymentIntent = async (amount: number, orderId: string) => {
  try {
    const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        orderId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    return data.data.clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Helper function to confirm payment
export const confirmPayment = async (clientSecret: string, paymentMethod: any) => {
  const stripe = await stripePromise;
  
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.confirmPayment({
    clientSecret,
    confirmParams: {
      return_url: `${window.location.origin}/checkout/success`,
      payment_method_data: {
        billing_details: {
          name: paymentMethod.billing_details?.name,
          email: paymentMethod.billing_details?.email,
          address: paymentMethod.billing_details?.address,
        },
      },
    },
  });

  if (error) {
    throw error;
  }

  return true;
};
