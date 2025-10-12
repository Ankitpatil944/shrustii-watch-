import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Wrench, Award, Clock, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Wrench,
      title: "Maintenance & Service",
      description: "Professional maintenance to keep your timepiece in perfect condition",
      features: [
        "Complete movement overhaul",
        "Crystal replacement",
        "Case polishing",
        "Water resistance testing",
        "Accuracy adjustment"
      ],
      price: "From $200",
      duration: "2-4 weeks"
    },
    {
      icon: Award,
      title: "Authentication",
      description: "Expert verification of authenticity and provenance",
      features: [
        "Movement authentication",
        "Serial number verification",
        "Certificate of authenticity",
        "Provenance documentation",
        "Insurance valuation"
      ],
      price: "From $150",
      duration: "1-2 weeks"
    },
    {
      icon: Shield,
      title: "Warranty Service",
      description: "Comprehensive warranty coverage and repairs",
      features: [
        "Manufacturing defect repairs",
        "Free parts replacement",
        "International service network",
        "Express service available",
        "Extended warranty options"
      ],
      price: "Included",
      duration: "1-3 weeks"
    },
    {
      icon: Calendar,
      title: "Consultation",
      description: "Expert advice on timepiece selection and care",
      features: [
        "Personal consultation",
        "Collection assessment",
        "Investment guidance",
        "Care instructions",
        "Storage recommendations"
      ],
      price: "From $100",
      duration: "1 hour"
    }
  ];

  const serviceCenters = [
    {
      city: "Geneva",
      address: "Rue du Rhône 45, 1204 Geneva, Switzerland",
      phone: "+41 22 319 0000",
      email: "geneva@lumiere-luxury.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
    },
    {
      city: "Paris",
      address: "Place Vendôme 12, 75001 Paris, France",
      phone: "+33 1 42 86 0000",
      email: "paris@lumiere-luxury.com",
      hours: "Mon-Fri: 9AM-7PM, Sat: 10AM-6PM"
    },
    {
      city: "New York",
      address: "5th Avenue 650, New York, NY 10022, USA",
      phone: "+1 212 555 0000",
      email: "newyork@lumiere-luxury.com",
      hours: "Mon-Fri: 10AM-8PM, Sat: 10AM-6PM"
    },
    {
      city: "Dubai",
      address: "Dubai Mall, Downtown Dubai, UAE",
      phone: "+971 4 000 0000",
      email: "dubai@lumiere-luxury.com",
      hours: "Sun-Thu: 10AM-10PM, Fri-Sat: 10AM-12AM"
    }
  ];

  const warrantyTerms = [
    {
      period: "2 Years",
      coverage: "Manufacturing defects, movement issues, case problems",
      exclusions: "Normal wear, accidental damage, unauthorized repairs"
    },
    {
      period: "5 Years",
      coverage: "Extended warranty for limited editions and bespoke pieces",
      exclusions: "Same as standard warranty"
    },
    {
      period: "Lifetime",
      coverage: "Service and maintenance for heritage collection pieces",
      exclusions: "Parts replacement costs may apply"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-noir via-luxury-charcoal to-luxury-noir">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold rounded-full blur-3xl" />
          </div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif text-luxury-white mb-6"
          >
            Our <span className="luxury-text-gradient">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-luxury-cream max-w-2xl mx-auto"
          >
            Comprehensive care and service for your Lumière timepiece, ensuring it remains a treasured companion for generations.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
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
              Service <span className="luxury-text-gradient">Excellence</span>
            </h2>
            <p className="text-xl text-luxury-gray max-w-2xl mx-auto">
              From routine maintenance to complex repairs, our certified technicians provide unparalleled service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-[var(--shadow-luxury)] transition-all duration-500 group">
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-gold/10 border-2 border-luxury-gold/20 mb-4 group-hover:bg-luxury-gold/20 transition-colors duration-300">
                      <service.icon className="w-8 h-8 text-luxury-gold" />
                    </div>
                    <CardTitle className="text-xl font-serif text-luxury-noir">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-luxury-gray">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-luxury-gray">
                          <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-4 border-t border-luxury-gold/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-luxury-noir">Price:</span>
                        <span className="text-sm text-luxury-gold font-semibold">{service.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-luxury-noir">Duration:</span>
                        <span className="text-sm text-luxury-gray">{service.duration}</span>
                      </div>
                    </div>

                    <Button variant="luxury" size="sm" className="w-full mt-4">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Information */}
      <section className="py-32 bg-luxury-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-luxury-noir mb-6">
              Warranty <span className="luxury-text-gradient">Coverage</span>
            </h2>
            <p className="text-xl text-luxury-gray max-w-2xl mx-auto">
              Comprehensive warranty protection for your investment, backed by our commitment to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {warrantyTerms.map((warranty, index) => (
              <motion.div
                key={warranty.period}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mx-auto mb-4">
                      {warranty.period}
                    </Badge>
                    <CardTitle className="text-2xl font-serif text-luxury-noir">
                      {warranty.period} Warranty
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-luxury-noir mb-2">Coverage Includes:</h4>
                      <p className="text-sm text-luxury-gray">{warranty.coverage}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-luxury-noir mb-2">Exclusions:</h4>
                      <p className="text-sm text-luxury-gray">{warranty.exclusions}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Centers */}
      <section className="py-32 bg-luxury-noir">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-luxury-white mb-6">
              Global <span className="luxury-text-gradient">Service Centers</span>
            </h2>
            <p className="text-xl text-luxury-cream max-w-2xl mx-auto">
              Visit one of our authorized service centers worldwide for expert care and maintenance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {serviceCenters.map((center, index) => (
              <motion.div
                key={center.city}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-luxury-charcoal border-luxury-gold/20 hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-luxury-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-luxury-gold" />
                      {center.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-luxury-cream">{center.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-luxury-gold" />
                        <p className="text-sm text-luxury-cream">{center.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-luxury-gold" />
                        <p className="text-sm text-luxury-cream">{center.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-luxury-gold" />
                        <p className="text-sm text-luxury-cream">{center.hours}</p>
                      </div>
                    </div>
                    
                    <Button variant="luxury" size="sm" className="w-full mt-4">
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-32 bg-luxury-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-luxury-noir mb-6">
              Service <span className="luxury-text-gradient">Process</span>
            </h2>
            <p className="text-xl text-luxury-gray max-w-2xl mx-auto">
              From initial contact to final delivery, we ensure a seamless service experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Contact", description: "Reach out via phone, email, or visit our service center" },
              { step: "02", title: "Assessment", description: "Our experts evaluate your timepiece and provide a detailed quote" },
              { step: "03", title: "Service", description: "Certified technicians perform the necessary maintenance or repairs" },
              { step: "04", title: "Delivery", description: "Your timepiece is returned with full documentation and warranty" }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-luxury-gold/20 mb-4">{process.step}</div>
                <h3 className="text-2xl font-serif text-luxury-noir mb-4">{process.title}</h3>
                <p className="text-luxury-gray leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
