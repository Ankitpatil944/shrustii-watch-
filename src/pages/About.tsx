import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';
import { Footer } from '@/components/Footer';
import heritageBg from '@/assets/heritage-bg.jpg';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Every piece meets the highest standards of Swiss craftsmanship and precision."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our master craftsmen pour their heart into every detail, creating timeless masterpieces."
    },
    {
      icon: Clock,
      title: "Heritage",
      description: "Over 150 years of tradition, innovation, and uncompromising quality."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building lasting relationships with collectors and enthusiasts worldwide."
    }
  ];

  const team = [
    {
      name: "Jean-Pierre Dubois",
      role: "Master Watchmaker",
      experience: "45 years",
      specialty: "Complications & Tourbillons",
      image: heritageBg
    },
    {
      name: "Isabella Laurent",
      role: "Design Director",
      experience: "20 years",
      specialty: "Aesthetic Innovation",
      image: heritageBg
    },
    {
      name: "Marcus Weber",
      role: "Technical Director",
      experience: "30 years",
      specialty: "Movement Engineering",
      image: heritageBg
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heritageBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-noir/80 via-luxury-noir/60 to-luxury-noir/90" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif text-luxury-white mb-6"
          >
            Our <span className="luxury-text-gradient">Story</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-luxury-cream max-w-2xl mx-auto"
          >
            Crafting timeless luxury since 1875. Discover the passion, precision, and heritage behind every Lumière timepiece.
          </motion.p>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-32 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-luxury-noir mb-6">
              Our <span className="luxury-text-gradient">Values</span>
            </h2>
            <p className="text-xl text-luxury-gray max-w-2xl mx-auto">
              The principles that guide every aspect of our craftsmanship and service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-luxury-gold/10 border-2 border-luxury-gold/20 mb-6 group-hover:bg-luxury-gold/20 transition-colors duration-300">
                  <value.icon className="w-10 h-10 text-luxury-gold" />
                </div>
                <h3 className="text-2xl font-serif text-luxury-noir mb-4">{value.title}</h3>
                <p className="text-luxury-gray leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-32 bg-luxury-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-luxury-noir mb-6">
              Master <span className="luxury-text-gradient">Craftsmen</span>
            </h2>
            <p className="text-xl text-luxury-gray max-w-2xl mx-auto">
              Meet the artisans whose expertise and dedication bring our timepieces to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-luxury-noir/0 group-hover:bg-luxury-noir/20 transition-all duration-500" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif text-luxury-noir mb-2">{member.name}</h3>
                <p className="text-luxury-gold font-semibold mb-2">{member.role}</p>
                <p className="text-luxury-gray text-sm mb-2">{member.experience} of experience</p>
                <p className="text-luxury-charcoal">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="py-32 bg-luxury-noir">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-luxury-white mb-6">
              The <span className="luxury-text-gradient">Process</span>
            </h2>
            <p className="text-xl text-luxury-cream max-w-2xl mx-auto">
              From concept to completion, every step is executed with meticulous attention to detail.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Design", description: "Conceptualizing the perfect balance of form and function" },
              { step: "02", title: "Engineering", description: "Precision engineering of every component and mechanism" },
              { step: "03", title: "Crafting", description: "Hand-finishing by master artisans using traditional techniques" },
              { step: "04", title: "Assembly", description: "Meticulous assembly and final quality inspection" }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-luxury-gold/20 mb-4">{process.step}</div>
                <h3 className="text-2xl font-serif text-luxury-white mb-4">{process.title}</h3>
                <p className="text-luxury-cream leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

