import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  
  const { login, register, isAuthenticated } = useAuth();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  // Auto-close modal when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setShowWelcome(true);
      setTimeout(() => {
        onClose();
        setShowWelcome(false);
      }, 2000);
    }
  }, [isAuthenticated, onClose]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(loginData.email, loginData.password);
      if (!success) {
        setError('Invalid email or password. Try demo@lumiere.com / demo123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const success = await register({
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        phone: registerData.phone,
      });
      
      if (!success) {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setLoginData({ email: '', password: '' });
    setRegisterData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-noir/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="shadow-[var(--shadow-luxury)] border-luxury-gold/20 bg-luxury-white/95 backdrop-blur-sm">
                <CardHeader className="relative">
                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-luxury-gray hover:text-luxury-noir"
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  {/* Header */}
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                      className="inline-flex items-center space-x-2 mb-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-light flex items-center justify-center">
                        <span className="text-luxury-noir font-bold text-xl">L</span>
                      </div>
                      <span className="text-2xl font-serif text-luxury-noir font-bold">
                        Lumière
                      </span>
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-serif text-luxury-noir mb-2"
                    >
                      Welcome to <span className="luxury-text-gradient">Lumière</span>
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-luxury-gray text-sm"
                    >
                      Sign in to your account or create a new one
                    </motion.p>
                  </div>
                </CardHeader>

                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(value) => setIsLogin(value === 'login')}>
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="login">Sign In</TabsTrigger>
                        <TabsTrigger value="register">Create Account</TabsTrigger>
                      </TabsList>

                      {/* Login Form */}
                      <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4">
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                            >
                              {error}
                            </motion.div>
                          )}

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-2"
                          >
                            <label htmlFor="modal-login-email" className="text-sm font-semibold text-luxury-noir">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                              <Input
                                id="modal-login-email"
                                type="email"
                                value={loginData.email}
                                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                                className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                                placeholder="Enter your email"
                                required
                              />
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="space-y-2"
                          >
                            <label htmlFor="modal-login-password" className="text-sm font-semibold text-luxury-noir">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                              <Input
                                id="modal-login-password"
                                type={showPassword ? 'text' : 'password'}
                                value={loginData.password}
                                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                                className="pl-10 pr-10 border-luxury-gold/20 focus:border-luxury-gold"
                                placeholder="Enter your password"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-gray hover:text-luxury-noir"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex items-center justify-between"
                          >
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" className="rounded border-luxury-gold/20" />
                              <span className="text-sm text-luxury-gray">Remember me</span>
                            </label>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                          >
                            <Button
                              type="submit"
                              variant="luxury"
                              size="lg"
                              className="w-full"
                              disabled={isLoading}
                            >
                              {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 }}
                            className="text-center"
                          >
                            <p className="text-xs text-luxury-gray">
                              Demo: demo@lumiere.com / demo123
                            </p>
                          </motion.div>
                        </form>
                      </TabsContent>

                      {/* Register Form */}
                      <TabsContent value="register">
                        <form onSubmit={handleRegister} className="space-y-4">
                          {error && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                            >
                              {error}
                            </motion.div>
                          )}

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div className="space-y-2">
                              <label htmlFor="modal-register-firstName" className="text-sm font-semibold text-luxury-noir">
                                First Name
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                                <Input
                                  id="modal-register-firstName"
                                  type="text"
                                  value={registerData.firstName}
                                  onChange={(e) => setRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
                                  className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                                  placeholder="First name"
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label htmlFor="modal-register-lastName" className="text-sm font-semibold text-luxury-noir">
                                Last Name
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                                <Input
                                  id="modal-register-lastName"
                                  type="text"
                                  value={registerData.lastName}
                                  onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
                                  className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                                  placeholder="Last name"
                                  required
                                />
                              </div>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="space-y-2"
                          >
                            <label htmlFor="modal-register-email" className="text-sm font-semibold text-luxury-noir">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                              <Input
                                id="modal-register-email"
                                type="email"
                                value={registerData.email}
                                onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                                className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                                placeholder="Enter your email"
                                required
                              />
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="space-y-2"
                          >
                            <label htmlFor="modal-register-phone" className="text-sm font-semibold text-luxury-noir">
                              Phone Number (Optional)
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                              <Input
                                id="modal-register-phone"
                                type="tel"
                                value={registerData.phone}
                                onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                                className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 }}
                            className="space-y-2"
                          >
                            <label htmlFor="modal-register-password" className="text-sm font-semibold text-luxury-noir">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                              <Input
                                id="modal-register-password"
                                type={showPassword ? 'text' : 'password'}
                                value={registerData.password}
                                onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                                className="pl-10 pr-10 border-luxury-gold/20 focus:border-luxury-gold"
                                placeholder="Create a password"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-gray hover:text-luxury-noir"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 }}
                            className="space-y-2"
                          >
                            <label htmlFor="modal-register-confirmPassword" className="text-sm font-semibold text-luxury-noir">
                              Confirm Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                              <Input
                                id="modal-register-confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={registerData.confirmPassword}
                                onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                                placeholder="Confirm your password"
                                required
                              />
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1 }}
                            className="flex items-center space-x-2"
                          >
                            <input type="checkbox" className="rounded border-luxury-gold/20" required />
                            <span className="text-sm text-luxury-gray">
                              I agree to the terms and conditions
                            </span>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                          >
                            <Button
                              type="submit"
                              variant="luxury"
                              size="lg"
                              className="w-full"
                              disabled={isLoading}
                            >
                              {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                          </motion.div>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Welcome Success Animation */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed inset-0 bg-luxury-gold/20 backdrop-blur-sm z-50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  className="bg-luxury-white rounded-2xl p-8 shadow-[var(--shadow-luxury)] text-center max-w-sm mx-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-full bg-luxury-gold flex items-center justify-center mx-auto mb-4"
                  >
                    <Sparkles className="w-8 h-8 text-luxury-noir" />
                  </motion.div>
                  <h3 className="text-2xl font-serif text-luxury-noir mb-2">
                    Welcome to Lumière!
                  </h3>
                  <p className="text-luxury-gray">
                    You're now signed in and ready to explore our luxury collection.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};
