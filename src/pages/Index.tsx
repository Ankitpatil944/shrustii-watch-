import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { Heritage } from '@/components/Heritage';
import { ProductShowcase3D } from '@/components/ProductShowcase3D';
import { ProductGallery } from '@/components/ProductGallery';
import { Consultation } from '@/components/Consultation';
import { Footer } from '@/components/Footer';
import { LoginModal } from '@/components/LoginModal';
import { FloatingLoginButton } from '@/components/FloatingLoginButton';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Show login modal after a short delay if user is not authenticated
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        setShowLoginModal(true);
      }
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-background">
      <Hero onShowLogin={() => setShowLoginModal(true)} />
      <Heritage />
      <ProductShowcase3D />
      <ProductGallery />
      <Consultation />
      <Footer />
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      
      {/* Floating Login Button */}
      <FloatingLoginButton onShowLogin={() => setShowLoginModal(true)} />
    </div>
  );
};

export default Index;
