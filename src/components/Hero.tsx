import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroProps {
  onShowLogin?: () => void;
}

export const Hero = ({ onShowLogin }: HeroProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-noir/70 via-luxury-noir/50 to-luxury-noir/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-serif text-luxury-white mb-6 tracking-tight">
            Timeless
            <span className="block luxury-text-gradient">Elegance</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-luxury-cream mb-12 font-light tracking-wide max-w-2xl mx-auto"
        >
          Discover the pinnacle of luxury craftsmanship. Each piece tells a story of precision, heritage, and timeless sophistication.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button variant="luxury" size="xl" onClick={() => navigate('/collections')}>
            Explore Collection
          </Button>
          {!isAuthenticated && onShowLogin ? (
            <Button variant="luxury-outline" size="xl" onClick={onShowLogin}>
              Sign In
            </Button>
          ) : (
            <Button variant="luxury-outline" size="xl" onClick={() => navigate('/contact')}>
              Book Consultation
            </Button>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-luxury-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
};
