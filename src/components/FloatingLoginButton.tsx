import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface FloatingLoginButtonProps {
  onShowLogin: () => void;
}

export const FloatingLoginButton = ({ onShowLogin }: FloatingLoginButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Show the floating button after 5 seconds if user is not authenticated and hasn't dismissed it
    const timer = setTimeout(() => {
      if (!isAuthenticated && !isDismissed) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isDismissed]);

  // Hide if user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setIsVisible(false);
    }
  }, [isAuthenticated]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (isAuthenticated || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0, x: 100 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <div className="relative">
            {/* Dismiss Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-luxury-white shadow-lg text-luxury-gray hover:text-luxury-noir z-10"
            >
              <X className="w-3 h-3" />
            </Button>

            {/* Main Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onShowLogin}
                className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-noir shadow-[var(--shadow-luxury)] rounded-full px-6 py-3 h-auto"
              >
                <User className="w-5 h-5 mr-2" />
                <span className="font-semibold">Sign In</span>
              </Button>
            </motion.div>

            {/* Pulse Animation */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-luxury-gold rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
