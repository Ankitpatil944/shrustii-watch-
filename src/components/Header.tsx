import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Remove scroll effect - keep navbar dark at all times
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-luxury-noir/95 backdrop-blur-md shadow-[var(--shadow-luxury)] transition-all duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-light flex items-center justify-center">
              <span className="text-luxury-noir font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-serif text-luxury-white font-bold">
              Lumière
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-luxury-cream hover:text-luxury-gold transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-luxury-cream hover:text-luxury-gold">
              <Search className="w-5 h-5" />
            </Button>
            
            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-luxury-cream hover:text-luxury-gold relative"
              onClick={() => cartDispatch({ type: 'TOGGLE_CART' })}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartState.itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-luxury-gold text-luxury-noir">
                  {cartState.itemCount}
                </Badge>
              )}
            </Button>
            
            {/* User Menu */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-luxury-cream hover:text-luxury-gold"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User className="w-5 h-5" />
              </Button>
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-luxury-white rounded-lg shadow-[var(--shadow-luxury)] border border-luxury-gold/20 py-2 z-50"
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-luxury-gold/20">
                          <p className="text-sm font-semibold text-luxury-noir">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-luxury-gray">{user?.email}</p>
                        </div>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-luxury-gray hover:text-luxury-noir hover:bg-luxury-cream"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          to="/account/orders"
                          className="block px-4 py-2 text-sm text-luxury-gray hover:text-luxury-noir hover:bg-luxury-cream"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Order History
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-luxury-gray hover:text-luxury-noir hover:bg-luxury-cream flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-luxury-gray hover:text-luxury-noir hover:bg-luxury-cream"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-luxury-gray hover:text-luxury-noir hover:bg-luxury-cream"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Button variant="luxury" size="sm">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-luxury-cream hover:text-luxury-gold transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-luxury-noir/98 backdrop-blur-md border-t border-luxury-gold/20"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-luxury-cream hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
                  >
                    {item.name}
                  </Link>
                ))}
                  <div className="pt-4 border-t border-luxury-gold/20 flex flex-col space-y-3">
                    <Button variant="luxury" size="sm" className="w-full">
                      Book Consultation
                    </Button>
                    <div className="flex justify-center space-x-4">
                      <Button variant="ghost" size="icon" className="text-luxury-cream hover:text-luxury-gold">
                        <Search className="w-5 h-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-luxury-cream hover:text-luxury-gold relative"
                        onClick={() => cartDispatch({ type: 'TOGGLE_CART' })}
                      >
                        <ShoppingBag className="w-5 h-5" />
                        {cartState.itemCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs bg-luxury-gold text-luxury-noir">
                            {cartState.itemCount}
                          </Badge>
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-luxury-cream hover:text-luxury-gold"
                        onClick={() => navigate('/login')}
                      >
                        <User className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

