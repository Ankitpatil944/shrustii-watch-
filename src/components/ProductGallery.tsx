import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import watchHero from '@/assets/watch-hero.jpg';

export const ProductGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Élégance Noir",
      category: "Classic Collection",
      price: "$12,500",
      image: watchHero,
    },
    {
      id: 2,
      name: "Prestige Gold",
      category: "Heritage Series",
      price: "$18,900",
      image: watchHero,
    },
    {
      id: 3,
      name: "Royal Chronograph",
      category: "Limited Edition",
      price: "$24,000",
      image: watchHero,
    },
  ];

  return (
    <section className="py-32 bg-luxury-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-luxury-noir mb-6">
            Signature <span className="luxury-text-gradient">Collection</span>
          </h2>
          <p className="text-xl text-luxury-gray max-w-2xl mx-auto">
            Each timepiece is a testament to our unwavering commitment to excellence and precision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative overflow-hidden rounded-lg mb-6 bg-luxury-cream shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-luxury-noir/0 group-hover:bg-luxury-noir/20 transition-all duration-500" />
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-luxury-gold text-luxury-noir px-8 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Details
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-luxury-gold font-semibold mb-2 tracking-wider uppercase">
                  {product.category}
                </p>
                <h3 className="text-2xl font-serif text-luxury-noir mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-xl font-semibold text-luxury-charcoal">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
