import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartSidebar = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch({ type: 'CLOSE_CART' });
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-noir/50 backdrop-blur-sm z-50"
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-luxury-white shadow-[var(--shadow-luxury)] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-luxury-gold/20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-luxury-gold" />
                <h2 className="text-2xl font-serif text-luxury-noir">
                  Shopping Cart
                </h2>
                {state.itemCount > 0 && (
                  <Badge className="bg-luxury-gold text-luxury-noir">
                    {state.itemCount}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch({ type: 'CLOSE_CART' })}
                className="text-luxury-gray hover:text-luxury-noir"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-luxury-gray/50 mb-4" />
                  <h3 className="text-xl font-serif text-luxury-noir mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-luxury-gray mb-6">
                    Discover our exquisite timepieces and add them to your cart.
                  </p>
                  <Button
                    variant="luxury"
                    onClick={() => {
                      dispatch({ type: 'CLOSE_CART' });
                      navigate('/collections');
                    }}
                  >
                    Browse Collections
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.strap}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-4 bg-luxury-cream rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-luxury-white flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-luxury-noir truncate">
                          {item.name}
                        </h3>
                        {item.size && (
                          <p className="text-sm text-luxury-gray">
                            Size: {item.size}
                          </p>
                        )}
                        {item.strap && (
                          <p className="text-sm text-luxury-gray">
                            Strap: {item.strap}
                          </p>
                        )}
                        <p className="text-lg font-semibold text-luxury-gold">
                          ${((item.price + (item.customization?.strapPrice || 0)) * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity - 1 }
                            })}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity + 1 }
                            })}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-luxury-gray hover:text-red-500"
                          onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-luxury-gold/20 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-luxury-noir">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-luxury-gold">
                    ${state.total.toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button
                    variant="luxury"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      dispatch({ type: 'CLOSE_CART' });
                      navigate('/collections');
                    }}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
