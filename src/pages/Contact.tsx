import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: 'general'
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 212 555 0000", "+41 22 319 0000"],
      description: "Call us for immediate assistance"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@lumiere-luxury.com", "service@lumiere-luxury.com"],
      description: "Send us a message anytime"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["5th Avenue 650, New York", "Rue du Rhône 45, Geneva"],
      description: "Experience our showrooms"
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 10AM-8PM", "Sat: 10AM-6PM", "Sun: By Appointment"],
      description: "We're here to help"
    }
  ];

  const locations = [
    {
      city: "New York",
      address: "5th Avenue 650, New York, NY 10022",
      phone: "+1 212 555 0000",
      email: "newyork@lumiere-luxury.com",
      hours: "Mon-Fri: 10AM-8PM, Sat: 10AM-6PM",
      services: ["Sales", "Service", "Consultation", "Authentication"]
    },
    {
      city: "Geneva",
      address: "Rue du Rhône 45, 1204 Geneva, Switzerland",
      phone: "+41 22 319 0000",
      email: "geneva@lumiere-luxury.com",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      services: ["Manufacturing", "Service", "Heritage Tours", "Master Classes"]
    },
    {
      city: "Paris",
      address: "Place Vendôme 12, 75001 Paris, France",
      phone: "+33 1 42 86 0000",
      email: "paris@lumiere-luxury.com",
      hours: "Mon-Fri: 9AM-7PM, Sat: 10AM-6PM",
      services: ["Sales", "Service", "Consultation", "Events"]
    },
    {
      city: "Dubai",
      address: "Dubai Mall, Downtown Dubai, UAE",
      phone: "+971 4 000 0000",
      email: "dubai@lumiere-luxury.com",
      hours: "Sun-Thu: 10AM-10PM, Fri-Sat: 10AM-12AM",
      services: ["Sales", "Service", "VIP Lounge", "Private Viewings"]
    }
  ];

  const services = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales Consultation' },
    { value: 'service', label: 'Service & Maintenance' },
    { value: 'authentication', label: 'Authentication' },
    { value: 'warranty', label: 'Warranty Claim' },
    { value: 'appointment', label: 'Book Appointment' }
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
            Get In <span className="luxury-text-gradient">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-luxury-cream max-w-2xl mx-auto"
          >
            We're here to help you discover the perfect timepiece and provide exceptional service throughout your journey.
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
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
              Contact <span className="luxury-text-gradient">Information</span>
            </h2>
            <p className="text-xl text-luxury-gray max-w-2xl mx-auto">
              Multiple ways to reach us, wherever you are in the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-[var(--shadow-luxury)] transition-all duration-500 group">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-gold/10 border-2 border-luxury-gold/20 mb-4 group-hover:bg-luxury-gold/20 transition-colors duration-300">
                      <info.icon className="w-8 h-8 text-luxury-gold" />
                    </div>
                    <CardTitle className="text-xl font-serif text-luxury-noir">
                      {info.title}
                    </CardTitle>
                    <CardDescription className="text-luxury-gray">
                      {info.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm font-semibold text-luxury-charcoal">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-32 bg-luxury-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif text-luxury-noir mb-6">
                Send Us a <span className="luxury-text-gradient">Message</span>
              </h2>
              <p className="text-luxury-gray mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-luxury-noir mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-luxury-gold/20 focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-luxury-noir mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-luxury-gold/20 focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-luxury-noir mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-luxury-gold/20 focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-luxury-noir mb-2">
                      Service Type
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-luxury-gold/20 rounded-md bg-luxury-white text-luxury-noir focus:border-luxury-gold focus:outline-none"
                    >
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-luxury-noir mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="border-luxury-gold/20 focus:border-luxury-gold"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-luxury-noir mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="border-luxury-gold/20 focus:border-luxury-gold"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button type="submit" variant="luxury" size="lg" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Map and Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="h-64 bg-luxury-charcoal rounded-lg flex items-center justify-center">
                <div className="text-center text-luxury-cream">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-luxury-gold" />
                  <p className="text-lg font-semibold">Interactive Map</p>
                  <p className="text-sm">Find our nearest location</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-luxury-noir">Quick Actions</h3>
                
                <Button variant="luxury" size="lg" className="w-full justify-start">
                  <Calendar className="w-5 h-5 mr-3" />
                  Book Consultation
                </Button>
                
                <Button variant="outline" size="lg" className="w-full justify-start">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Live Chat
                </Button>
                
                <Button variant="outline" size="lg" className="w-full justify-start">
                  <Phone className="w-5 h-5 mr-3" />
                  Call Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-32 bg-luxury-noir">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-luxury-white mb-6">
              Our <span className="luxury-text-gradient">Locations</span>
            </h2>
            <p className="text-xl text-luxury-cream max-w-2xl mx-auto">
              Visit us at one of our flagship stores around the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {locations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-luxury-charcoal border-luxury-gold/20 hover:shadow-[var(--shadow-luxury)] transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-luxury-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-luxury-gold" />
                      {location.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-luxury-cream">{location.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-luxury-gold" />
                        <p className="text-sm text-luxury-cream">{location.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-luxury-gold" />
                        <p className="text-sm text-luxury-cream">{location.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-luxury-gold" />
                        <p className="text-sm text-luxury-cream">{location.hours}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-luxury-gold/20">
                      <h4 className="text-sm font-semibold text-luxury-white mb-2">Services Available:</h4>
                      <div className="flex flex-wrap gap-1">
                        {location.services.map((service, idx) => (
                          <span key={idx} className="text-xs bg-luxury-gold/20 text-luxury-gold px-2 py-1 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button variant="luxury" size="sm" className="w-full mt-4">
                      Visit Store
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

