import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const Consultation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Choose a time that works best for you"
    },
    {
      icon: Clock,
      title: "60-Minute Session",
      description: "Comprehensive consultation with our experts"
    },
    {
      icon: MapPin,
      title: "Private Showroom",
      description: "Experience luxury in our exclusive space"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-luxury-noir via-luxury-charcoal to-luxury-noir relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-luxury-white mb-6">
            Begin Your <span className="luxury-text-gradient">Luxury Journey</span>
          </h2>
          <p className="text-xl text-luxury-cream leading-relaxed">
            Schedule a private consultation with our master craftsmen. Discover bespoke pieces 
            tailored to your unique taste and preferences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-gold/20 border-2 border-luxury-gold mb-4">
                <feature.icon className="w-8 h-8 text-luxury-gold" />
              </div>
              <h3 className="text-xl font-serif text-luxury-white mb-2">{feature.title}</h3>
              <p className="text-luxury-cream">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <Button variant="luxury" size="xl" className="shadow-[var(--shadow-gold)]">
            Schedule Consultation
          </Button>
          <p className="text-luxury-cream/70 text-sm mt-4">
            Available in Geneva, Paris, New York, and Dubai
          </p>
        </motion.div>
      </div>
    </section>
  );
};
