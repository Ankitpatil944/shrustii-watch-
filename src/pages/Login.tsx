import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Footer } from '@/components/Footer';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(loginData.email, loginData.password);
      if (success) {
        navigate('/');
      } else {
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
      
      if (success) {
        navigate('/');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-cream via-luxury-white to-luxury-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-light flex items-center justify-center">
                <span className="text-luxury-noir font-bold text-xl">L</span>
              </div>
              <span className="text-3xl font-serif text-luxury-noir font-bold">
                Lumière
              </span>
            </Link>
            <h1 className="text-3xl font-serif text-luxury-noir mb-2">
              Welcome to <span className="luxury-text-gradient">Lumière</span>
            </h1>
            <p className="text-luxury-gray">
              Sign in to your account or create a new one
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="shadow-[var(--shadow-luxury)] border-luxury-gold/20">
              <CardHeader>
                <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(value) => setIsLogin(value === 'login')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Create Account</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent>
                <Tabs value={isLogin ? 'login' : 'register'}>
                  {/* Login Form */}
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="space-y-2">
                        <label htmlFor="login-email" className="text-sm font-semibold text-luxury-noir">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                          <Input
                            id="login-email"
                            type="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                            className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="login-password" className="text-sm font-semibold text-luxury-noir">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                          <Input
                            id="login-password"
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
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-luxury-gold/20" />
                          <span className="text-sm text-luxury-gray">Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="text-sm text-luxury-gold hover:underline">
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        variant="luxury"
                        size="lg"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                      </Button>

                      <div className="text-center">
                        <p className="text-sm text-luxury-gray">
                          Demo credentials: demo@lumiere.com / demo123
                        </p>
                      </div>
                    </form>
                  </TabsContent>

                  {/* Register Form */}
                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="register-firstName" className="text-sm font-semibold text-luxury-noir">
                            First Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                            <Input
                              id="register-firstName"
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
                          <label htmlFor="register-lastName" className="text-sm font-semibold text-luxury-noir">
                            Last Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                            <Input
                              id="register-lastName"
                              type="text"
                              value={registerData.lastName}
                              onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
                              className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                              placeholder="Last name"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="register-email" className="text-sm font-semibold text-luxury-noir">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                          <Input
                            id="register-email"
                            type="email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                            className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="register-phone" className="text-sm font-semibold text-luxury-noir">
                          Phone Number (Optional)
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                          <Input
                            id="register-phone"
                            type="tel"
                            value={registerData.phone}
                            onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                            className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="register-password" className="text-sm font-semibold text-luxury-noir">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                          <Input
                            id="register-password"
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
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="register-confirmPassword" className="text-sm font-semibold text-luxury-noir">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luxury-gray" />
                          <Input
                            id="register-confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={registerData.confirmPassword}
                            onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="pl-10 border-luxury-gold/20 focus:border-luxury-gold"
                            placeholder="Confirm your password"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-luxury-gold/20" required />
                        <span className="text-sm text-luxury-gray">
                          I agree to the{' '}
                          <Link to="/terms" className="text-luxury-gold hover:underline">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-luxury-gold hover:underline">
                            Privacy Policy
                          </Link>
                        </span>
                      </div>

                      <Button
                        type="submit"
                        variant="luxury"
                        size="lg"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
