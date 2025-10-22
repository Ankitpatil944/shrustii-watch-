import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Lock } from 'lucide-react';

const stripePromise = loadStripe('pk_test_51SKujgJ9Nb6CZ7njterxbeftQmdgZUPaLnH5BTWTrR9MGcg9yRuJc4yyolrLu79SoBL6uqAHt4GREWxaOCPo9F1m00Aza64lPX');

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: (paymentIntent: any) => void;
  onPaymentError: (error: any) => void;
  isProcessing: boolean;
}

const PaymentForm = ({ amount, onPaymentSuccess, onPaymentError, isProcessing }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (error) {
        console.error('Stripe payment error:', error);
        onPaymentError(error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent);
        onPaymentSuccess(paymentIntent);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      onPaymentError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: 'Inter, sans-serif',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-luxury-gray">
          <Lock className="w-4 h-4" />
          <span className="text-sm">Your payment information is secure and encrypted</span>
        </div>
        
        <div className="p-4 border border-luxury-gold/20 rounded-lg bg-luxury-cream/50">
          <PaymentElement options={cardElementOptions} />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || isLoading || isProcessing}
        className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-noir font-semibold py-3"
      >
        {isLoading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  );
};

export const StripePaymentForm = ({ amount, onPaymentSuccess, onPaymentError, isProcessing }: PaymentFormProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingSecret, setIsLoadingSecret] = useState(false);

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      setIsLoadingSecret(true);
      try {
        const token = localStorage.getItem('auth_token');
        console.log('🔑 Auth token:', token ? 'Present' : 'Missing');
        console.log('💰 Amount (dollars):', amount);
        console.log('💰 Amount type:', typeof amount);
        
        // Ensure amount is a number and not too large
        const amountInCents = Math.round(amount * 100);
        console.log('💰 Amount (cents):', amountInCents);
        
        // Check if amount exceeds Stripe limit
        if (amountInCents > 99999999) { // $999,999.99 in cents
          throw new Error(`Amount too large: $${amount} exceeds Stripe's $999,999.99 limit`);
        }
        
        const requestBody = {
          amount: amountInCents,
          currency: 'usd',
          orderId: crypto.randomUUID(),
        };
        
        console.log('📤 Request body:', requestBody);
        
        const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        console.log('📡 Response status:', response.status);
        console.log('📡 Response ok:', response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Response error:', errorText);
          throw new Error(`Failed to create payment intent: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('📡 Response data:', responseData);
        
        if (responseData.success && responseData.data) {
          setClientSecret(responseData.data.clientSecret);
          console.log('✅ Client secret set:', responseData.data.clientSecret.substring(0, 20) + '...');
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('❌ Error creating payment intent:', error);
        onPaymentError(error);
      } finally {
        setIsLoadingSecret(false);
      }
    };

    createPaymentIntent();
  }, [amount, onPaymentError]);

  if (isLoadingSecret) {
    return (
      <Card className="shadow-[var(--shadow-luxury)] border-luxury-gold/20">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-gold mx-auto mb-4"></div>
          <p className="text-luxury-gray">Setting up secure payment...</p>
        </CardContent>
      </Card>
    );
  }

  if (!clientSecret) {
    return (
      <Card className="shadow-[var(--shadow-luxury)] border-luxury-gold/20">
        <CardContent className="p-8 text-center">
          <p className="text-red-600">Failed to initialize payment. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Card className="shadow-[var(--shadow-luxury)] border-luxury-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-luxury-noir">
            <CreditCard className="w-5 h-5" />
            <span>Payment Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentForm
            amount={amount}
            onPaymentSuccess={onPaymentSuccess}
            onPaymentError={onPaymentError}
            isProcessing={isProcessing}
          />
        </CardContent>
      </Card>
    </Elements>
  );
};
