import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Lock, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { StripePaymentForm } from '@/components/StripePaymentForm';
import { Footer } from '@/components/Footer';

export default function Checkout() {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'USA',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
  });

  const [orderNotes, setOrderNotes] = useState('');

  const steps = [
    { id: 1, title: 'Shipping', description: 'Delivery information' },
    { id: 2, title: 'Payment', description: 'Payment details' },
    { id: 3, title: 'Review', description: 'Order summary' },
  ];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    setIsProcessing(true);
    
    try {
      // Create order in backend
      const orderResponse = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          shippingAddress: shippingInfo,
          billingAddress: {
            firstName: paymentInfo.cardName.split(' ')[0] || '',
            lastName: paymentInfo.cardName.split(' ')[1] || '',
            address: paymentInfo.billingAddress,
            city: paymentInfo.billingCity,
            state: paymentInfo.billingState,
            zipCode: paymentInfo.billingZip,
            country: 'USA',
          },
          paymentMethod: 'stripe',
          paymentId: paymentIntent.id,
          notes: orderNotes,
        }),
      });

      if (orderResponse.ok) {
        setOrderComplete(true);
        cartDispatch({ type: 'CLEAR_CART' });
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Payment succeeded but order creation failed. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    alert(`Payment failed: ${error.message}`);
    setIsProcessing(false);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-luxury-cream via-luxury-white to-luxury-cream">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-luxury-gold flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-luxury-noir" />
              </div>
              <h1 className="text-4xl font-serif text-luxury-noir mb-4">
                Order <span className="luxury-text-gradient">Confirmed</span>
              </h1>
              <p className="text-xl text-luxury-gray mb-8">
                Thank you for your purchase! Your order has been successfully placed.
              </p>
            </motion.div>

            <Card className="shadow-[var(--shadow-luxury)] border-luxury-gold/20 mb-8">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">Order Number:</span>
                    <span className="font-semibold text-luxury-noir">#LUM-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">Total Amount:</span>
                    <span className="font-semibold text-luxury-gold">${cartState.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-gray">Estimated Delivery:</span>
                    <span className="font-semibold text-luxury-noir">5-7 business days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button
                variant="luxury"
                size="lg"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/account/orders')}
                className="w-full"
              >
                View Order History
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-luxury-cream via-luxury-white to-luxury-cream">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Lock className="w-16 h-16 text-luxury-gold mx-auto mb-6" />
              <h1 className="text-3xl font-serif text-luxury-noir mb-4">
                Sign In Required
              </h1>
              <p className="text-luxury-gray mb-8">
                Please sign in to your account to proceed with checkout.
              </p>
              <div className="space-y-4">
                <Button
                  variant="luxury"
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/collections')}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-luxury-cream via-luxury-white to-luxury-cream">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <CreditCard className="w-16 h-16 text-luxury-gold mx-auto mb-6" />
              <h1 className="text-3xl font-serif text-luxury-noir mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-luxury-gray mb-8">
                Add some luxury timepieces to your cart before checking out.
              </p>
              <Button
                variant="luxury"
                size="lg"
                onClick={() => navigate('/collections')}
                className="w-full"
              >
                Browse Collections
              </Button>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-cream via-luxury-white to-luxury-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4 text-luxury-gray hover:text-luxury-noir"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
            <h1 className="text-4xl font-serif text-luxury-noir mb-2">
              Secure <span className="luxury-text-gradient">Checkout</span>
            </h1>
            <p className="text-luxury-gray">
              Complete your luxury timepiece purchase
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Steps */}
              <Card className="shadow-[var(--shadow-soft)] border-luxury-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          currentStep >= step.id
                            ? 'bg-luxury-gold border-luxury-gold text-luxury-noir'
                            : 'border-luxury-gold/20 text-luxury-gray'
                        }`}>
                          {currentStep > step.id ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <span className="font-semibold">{step.id}</span>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className={`font-semibold ${
                            currentStep >= step.id ? 'text-luxury-noir' : 'text-luxury-gray'
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-sm text-luxury-gray">{step.description}</p>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-16 h-0.5 mx-4 ${
                            currentStep > step.id ? 'bg-luxury-gold' : 'bg-luxury-gold/20'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-[var(--shadow-soft)] border-luxury-gold/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-luxury-gold" />
                        Shipping Information
                      </CardTitle>
                      <CardDescription>
                        Where should we deliver your luxury timepiece?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleShippingSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-luxury-noir mb-2">
                              First Name *
                            </label>
                            <Input
                              value={shippingInfo.firstName}
                              onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                              required
                              className="border-luxury-gold/20 focus:border-luxury-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-luxury-noir mb-2">
                              Last Name *
                            </label>
                            <Input
                              value={shippingInfo.lastName}
                              onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                              required
                              className="border-luxury-gold/20 focus:border-luxury-gold"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-luxury-noir mb-2">
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              value={shippingInfo.email}
                              onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                              required
                              className="border-luxury-gold/20 focus:border-luxury-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-luxury-noir mb-2">
                              Phone Number *
                            </label>
                            <Input
                              type="tel"
                              value={shippingInfo.phone}
                              onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                              required
                              className="border-luxury-gold/20 focus:border-luxury-gold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-luxury-noir mb-2">
                            Street Address *
                          </label>
                          <Input
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                            required
                            className="border-luxury-gold/20 focus:border-luxury-gold"
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-luxury-noir mb-2">
                              City *
                            </label>
                            <Input
                              value={shippingInfo.city}
                              onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                              required
                              className="border-luxury-gold/20 focus:border-luxury-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-luxury-noir mb-2">
                              State *
                            </label>
                            <Input
                              value={shippingInfo.state}
                              onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                              required
                              className="border-luxury-gold/20 focus:border-luxury-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-luxury-noir mb-2">
                              ZIP Code *
                            </label>
                            <Input
                              value={shippingInfo.zipCode}
                              onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                              required
                              className="border-luxury-gold/20 focus:border-luxury-gold"
                            />
                          </div>
                        </div>

                        <Button type="submit" variant="luxury" size="lg" className="w-full">
                          Continue to Payment
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-[var(--shadow-soft)] border-luxury-gold/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-luxury-gold" />
                        Payment Information
                      </CardTitle>
                      <CardDescription>
                        Secure payment processing with industry-standard encryption
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <StripePaymentForm
                        amount={cartState.total}
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentError={handlePaymentError}
                        isProcessing={isProcessing}
                      />
                      
                      <div className="flex gap-4 mt-6">
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          onClick={() => setCurrentStep(1)}
                          className="flex-1"
                        >
                          Back to Shipping
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-[var(--shadow-soft)] border-luxury-gold/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-luxury-gold" />
                        Order Review
                      </CardTitle>
                      <CardDescription>
                        Please review your order details before completing the purchase
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-luxury-noir mb-2">Order Notes</h4>
                        <textarea
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          placeholder="Any special instructions for your order..."
                          className="w-full p-3 border border-luxury-gold/20 rounded-md focus:border-luxury-gold focus:outline-none"
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          onClick={() => setCurrentStep(2)}
                          className="flex-1"
                        >
                          Back to Payment
                        </Button>
                        <Button
                          variant="luxury"
                          size="lg"
                          onClick={handleOrderComplete}
                          disabled={isProcessing}
                          className="flex-1"
                        >
                          {isProcessing ? 'Processing...' : 'Complete Order'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-[var(--shadow-soft)] border-luxury-gold/20 sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartState.items.map((item) => (
                      <div key={`${item.id}-${item.size}-${item.strap}`} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-luxury-cream flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-luxury-noir truncate">{item.name}</h4>
                          {item.size && <p className="text-sm text-luxury-gray">Size: {item.size}</p>}
                          {item.strap && <p className="text-sm text-luxury-gray">Strap: {item.strap}</p>}
                          <p className="text-sm text-luxury-gray">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-luxury-gold">
                            ${((item.price + (item.customization?.strapPrice || 0)) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Totals */}
                  <div className="border-t border-luxury-gold/20 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-luxury-gray">Subtotal:</span>
                      <span className="text-luxury-noir">${cartState.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-luxury-gray">Shipping:</span>
                      <span className="text-luxury-noir">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-luxury-gray">Tax:</span>
                      <span className="text-luxury-noir">${(cartState.total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t border-luxury-gold/20 pt-2">
                      <span className="text-luxury-noir">Total:</span>
                      <span className="text-luxury-gold">${(cartState.total * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center gap-2 p-3 bg-luxury-gold/10 rounded-lg">
                    <Lock className="w-4 h-4 text-luxury-gold" />
                    <span className="text-sm text-luxury-gray">Secure 256-bit SSL encryption</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
