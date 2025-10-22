import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Validate token with backend
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data.user) {
              const user: User = {
                id: data.data.user.id,
                email: data.data.user.email,
                firstName: data.data.user.firstName,
                lastName: data.data.user.lastName,
                phone: data.data.user.phone || '',
                address: data.data.user.address || {},
              };

              setState({
                user,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('user_data');
              setState(prev => ({ ...prev, isLoading: false }));
            }
          } else {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            setState(prev => ({ ...prev, isLoading: false }));
          }
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Call your backend API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.data.user) {
        const user: User = {
          id: data.data.user.id,
          email: data.data.user.email,
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          phone: data.data.user.phone || '',
          address: data.data.user.address || {},
        };

        const token = data.data.token;
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));
        
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return true;
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Call your backend API
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
        }),
      });

      const data = await response.json();

      if (data.success && data.data.user) {
        const user: User = {
          id: data.data.user.id,
          email: data.data.user.email,
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          phone: data.data.user.phone || '',
          address: data.data.user.address || {},
        };

        const token = data.data.token;
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));
        
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return true;
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!state.user) return false;
      
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      
      setState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }));
      
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
