import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import heritageBg from '@/assets/heritage-bg.jpg';

export const Heritage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timeline = [
    { year: "1875", title: "The Beginning", description: "Founded in Geneva, pioneering precision horology" },
    { year: "1920", title: "Innovation Era", description: "Introduced revolutionary automatic movement technology" },
    { year: "1965", title: "Global Recognition", description: "Awarded Master Craftsman certification" },
    { year: "2024", title: "Modern Legacy", description: "Continuing excellence across generations" },
  ];

  return (
    <section className="py-32 bg-luxury-cream relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-[var(--shadow-luxury)]">
              <img 
                src={heritageBg} 
                alt="Luxury Heritage Workshop" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-noir/60 to-transparent" />
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-6xl font-serif text-luxury-noir mb-8">
              Our <span className="luxury-text-gradient">Heritage</span>
            </h2>
            <p className="text-lg text-luxury-gray mb-12 leading-relaxed">
              A legacy spanning over a century, built on the foundation of uncompromising quality, 
              masterful craftsmanship, and a relentless pursuit of perfection.
            </p>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-light flex items-center justify-center shadow-[var(--shadow-gold)]">
                      <span className="text-luxury-noir font-bold text-sm">{item.year}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-serif text-luxury-noir mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-luxury-gray leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
