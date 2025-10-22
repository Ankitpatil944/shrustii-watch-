import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-luxury-noir text-luxury-cream py-16 border-t border-luxury-gold/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif text-luxury-gold mb-4">Lumière</h3>
            <p className="text-sm text-luxury-gray leading-relaxed">
              Crafting timeless luxury since 1875. Every piece tells a story of excellence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-luxury-white mb-4 tracking-wider uppercase text-sm">
              Collections
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/collections" className="hover:text-luxury-gold transition-colors">All Collections</Link></li>
              <li><Link to="/collections?category=classic" className="hover:text-luxury-gold transition-colors">Classic</Link></li>
              <li><Link to="/collections?category=heritage" className="hover:text-luxury-gold transition-colors">Heritage</Link></li>
              <li><Link to="/collections?category=limited" className="hover:text-luxury-gold transition-colors">Limited Edition</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-luxury-white mb-4 tracking-wider uppercase text-sm">
              Service
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-luxury-gold transition-colors">Consultation</Link></li>
              <li><Link to="/services" className="hover:text-luxury-gold transition-colors">Maintenance</Link></li>
              <li><Link to="/services" className="hover:text-luxury-gold transition-colors">Authentication</Link></li>
              <li><Link to="/services" className="hover:text-luxury-gold transition-colors">Warranty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-luxury-white mb-4 tracking-wider uppercase text-sm">
              Connect
            </h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm">contact@lumiere-luxury.com</p>
          </div>
        </div>

        <div className="pt-8 border-t border-luxury-gold/20 text-center text-sm text-luxury-gray">
          <p>&copy; 2024 Lumière. All rights reserved. Crafted with precision and passion.</p>
        </div>
      </div>
    </footer>
  );
};
