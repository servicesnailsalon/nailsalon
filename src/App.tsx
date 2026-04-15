/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Scissors, 
  Sparkles, 
  Heart,
  MessageSquare,
  Calendar,
  ArrowUp
} from 'lucide-react';

// --- Types ---
interface Service {
  name: string;
  price: string;
  description?: string;
}

interface ServiceCategory {
  title: string;
  services: Service[];
}

// --- Data ---
const SALON_INFO = {
  name: "Nail Salon's",
  address: "4330 Clayton Road #D Concord, CA 94521",
  phone: "925 639 0832",
  hours: [
    { day: "Monday - Friday", time: "9:30 AM - 7:00 PM" },
    { day: "Saturday", time: "9:00 AM - 6:00 PM" },
    { day: "Sunday", time: "10:00 AM - 5:00 PM" }
  ]
};

const SERVICES: ServiceCategory[] = [
  {
    title: "Manicure Services",
    services: [
      { name: "Classic Manicure", price: "$25", description: "Shape, cuticle care, massage, and polish." },
      { name: "Gel Manicure", price: "$40", description: "Long-lasting gel polish with high shine." },
      { name: "Signature Spa Manicure", price: "$35", description: "Exfoliation, mask, and extended massage." },
      { name: "Dipping Powder", price: "$50", description: "Strong, durable, and lightweight finish." }
    ]
  },
  {
    title: "Pedicure Services",
    services: [
      { name: "Classic Pedicure", price: "$35", description: "Sea salt soak, shape, cuticle care, and polish." },
      { name: "Deluxe Pedicure", price: "$50", description: "Callus removal, sugar scrub, and mud mask." },
      { name: "Organic Spa Pedicure", price: "$65", description: "Premium organic products and hot stone massage." },
      { name: "Gel Pedicure Add-on", price: "+$15", description: "Upgrade any pedicure to gel polish." }
    ]
  },
  {
    title: "Nail Enhancements",
    services: [
      { name: "Acrylic Full Set", price: "$45+", description: "Traditional acrylic extensions." },
      { name: "Acrylic Fill-in", price: "$35+", description: "Maintenance for acrylic nails." },
      { name: "Hard Gel Full Set", price: "$60+", description: "Flexible and natural-looking extensions." },
      { name: "Ombre Design", price: "+$15", description: "Beautiful gradient effect." }
    ]
  },
  {
    title: "Additional Services",
    services: [
      { name: "Nail Art Design", price: "$5+", description: "Custom hand-painted designs." },
      { name: "Polish Change", price: "$15", description: "Quick refresh for your nails." },
      { name: "Paraffin Treatment", price: "$10", description: "Deep hydration for hands or feet." },
      { name: "Take Off Only", price: "$15", description: "Safe removal of enhancements." }
    ]
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1604654894610-df4906687103?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1610992015732-2449b0c26670?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
];

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gold text-black rounded-full shadow-2xl flex items-center justify-center hover:bg-gold-light transition-all active:scale-95"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Price', href: '#price' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Booking', href: '#booking' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-dark/90 backdrop-blur-lg py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif font-bold text-gold tracking-tight">
          NAIL SALON'S
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-zinc-400 hover:text-gold transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <a href="#booking" className="btn-primary py-2 px-6 text-sm">BOOK NOW</a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark-soft border-b border-white/10 py-8 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-zinc-300 hover:text-gold transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#booking" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full"
              >
                BOOK NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=1920" 
          alt="Nail Salon Hero" 
          className="w-full h-full object-cover opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/40 to-dark"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">Welcome to Luxury</span>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Elevate Your <span className="italic text-gradient">Style</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the ultimate nail care and pampering at Nail Salon's. 
            Where beauty meets precision in a sophisticated atmosphere.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#booking" className="btn-primary w-full sm:w-auto">Book Appointment</a>
            <a href="#services" className="btn-outline w-full sm:w-auto">View Services</a>
          </div>
        </motion.div>
      </div>

      {/* Floating Info */}
      <div className="absolute bottom-10 left-0 w-full hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-end">
          <div className="flex space-x-12">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold">
                <MapPin size={18} />
              </div>
              <div className="text-xs">
                <p className="text-zinc-500 uppercase tracking-widest mb-1">Location</p>
                <p className="text-zinc-200">{SALON_INFO.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-gold">
                <Phone size={18} />
              </div>
              <div className="text-xs">
                <p className="text-zinc-500 uppercase tracking-widest mb-1">Call Us</p>
                <p className="text-zinc-200">{SALON_INFO.phone}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-gold transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-gold transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const features = [
    { icon: <Sparkles />, title: "Premium Products", desc: "We use only high-end, non-toxic polishes and treatments." },
    { icon: <Scissors />, title: "Expert Technicians", desc: "Our staff is highly trained in the latest nail art and techniques." },
    { icon: <Heart />, title: "Sanitized Environment", desc: "Your health and safety are our top priority with medical-grade sterilization." },
  ];

  return (
    <section id="services" className="py-24 bg-dark-soft">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-3 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Exceptional Care</h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-3xl text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1604654894610-df4906687103?auto=format&fit=crop&q=80&w=1000" 
              alt="Service Detail" 
              className="rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 glass p-8 rounded-2xl hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-gold">10+</div>
                <div className="text-xs uppercase tracking-widest text-zinc-400">Years of<br/>Experience</div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-3xl font-bold">The Art of Perfection</h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              At Nail Salon's, we believe that your nails are an extension of your personality. 
              Our meticulous attention to detail ensures that every service is a masterpiece. 
              Whether you're looking for a classic look or a bold statement, we have the skills to bring your vision to life.
            </p>
            <ul className="space-y-4">
              {['Professional Consultation', 'Custom Nail Art', 'Relaxing Atmosphere', 'Long-lasting Results'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <ChevronRight size={12} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Price = () => {
  return (
    <section id="price" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-3 block">Pricing Menu</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Service Packages</h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {SERVICES.map((category, idx) => (
            <div key={idx} className="space-y-8">
              <h3 className="text-2xl font-serif text-gold border-b border-white/10 pb-4 italic">{category.title}</h3>
              <div className="space-y-6">
                {category.services.map((service, sIdx) => (
                  <div key={sIdx} className="group cursor-default">
                    <div className="flex justify-between items-end mb-1">
                      <h4 className="text-lg font-medium group-hover:text-gold transition-colors">{service.name}</h4>
                      <div className="flex-1 border-b border-dotted border-zinc-700 mx-4 mb-1"></div>
                      <span className="text-gold font-bold">{service.price}</span>
                    </div>
                    {service.description && (
                      <p className="text-sm text-zinc-500 font-light italic">{service.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 glass p-10 rounded-3xl text-center">
          <p className="text-zinc-400 mb-6 italic">Prices may vary based on length, shape, and design complexity. Please consult with our technicians.</p>
          <a href="#booking" className="btn-primary">Book Your Session</a>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-dark-soft overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-3 block">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-bold">Style Inspiration</h2>
          </div>
          <a href="#" className="flex items-center space-x-2 text-gold hover:text-gold-light transition-colors uppercase tracking-widest text-sm font-bold">
            <span>Follow on Instagram</span>
            <Instagram size={18} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <img 
                src={img} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Instagram size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your booking request has been sent. We will contact you shortly to confirm.");
  };

  return (
    <section id="booking" className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-3 block">Reservations</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Book Your Visit</h2>
            <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
              Ready for a transformation? Fill out the form below or use our quick contact buttons to secure your spot. 
              We recommend booking at least 24 hours in advance.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-6 p-6 glass rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Quick Call</p>
                  <a href={`tel:${SALON_INFO.phone.replace(/\s/g, '')}`} className="text-xl font-bold hover:text-gold transition-colors">{SALON_INFO.phone}</a>
                </div>
                <a href={`tel:${SALON_INFO.phone.replace(/\s/g, '')}`} className="ml-auto btn-primary py-2 px-4 text-sm">Call Now</a>
              </div>

              <div className="flex items-center space-x-6 p-6 glass rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Send Message</p>
                  <p className="text-xl font-bold">Text Us Anytime</p>
                </div>
                <a href={`sms:${SALON_INFO.phone.replace(/\s/g, '')}`} className="ml-auto btn-outline py-2 px-4 text-sm">Message</a>
              </div>
            </div>

            <div className="mt-12 p-8 border border-gold/20 rounded-3xl bg-gold/5">
              <div className="flex items-center space-x-4 mb-4">
                <Star className="text-gold fill-gold" size={20} />
                <Star className="text-gold fill-gold" size={20} />
                <Star className="text-gold fill-gold" size={20} />
                <Star className="text-gold fill-gold" size={20} />
                <Star className="text-gold fill-gold" size={20} />
              </div>
              <p className="text-zinc-300 italic mb-4">"The best nail salon in Concord! The atmosphere is so relaxing and my gel manicure always lasts for weeks. Highly recommend!"</p>
              <p className="text-gold font-bold text-sm uppercase tracking-widest">— Sarah J., Local Guide</p>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="(925) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1">Select Service</label>
                <select 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option value="" className="bg-dark">Choose a service...</option>
                  <option value="manicure" className="bg-dark">Manicure</option>
                  <option value="pedicure" className="bg-dark">Pedicure</option>
                  <option value="gel" className="bg-dark">Gel Polish</option>
                  <option value="acrylic" className="bg-dark">Acrylic Set</option>
                  <option value="other" className="bg-dark">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1">Preferred Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1">Special Requests</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Tell us about your preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Request Appointment</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-dark-soft pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16 mb-20">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-serif text-gold mb-8">Nail Salon's</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-gold mt-1 shrink-0" size={20} />
                <p className="text-zinc-400 leading-relaxed">
                  {SALON_INFO.address}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-gold shrink-0" size={20} />
                <p className="text-zinc-400">{SALON_INFO.phone}</p>
              </div>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-gold transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-zinc-400 hover:text-gold transition-colors">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center space-x-3">
              <Clock className="text-gold" size={20} />
              <span>Business Hours</span>
            </h3>
            <div className="space-y-4">
              {SALON_INFO.hours.map((h, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-zinc-400">{h.day}</span>
                  <span className="text-zinc-200 font-medium">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-64 rounded-3xl overflow-hidden glass relative group">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
              alt="Map Location" 
              className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark/40 p-6 text-center">
              <MapPin className="text-gold mb-4" size={32} />
              <p className="text-sm font-bold mb-4">Find Us in Concord</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SALON_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline py-2 px-4 text-xs"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center text-zinc-600 text-sm">
          <p>© {new Date().getFullYear()} Nail Salon's. All rights reserved.</p>
          <p className="mt-2">Designed for Elegance & Comfort.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="bg-dark min-h-screen text-zinc-300">
      <div className="artistic-container">
        {/* Header - Top Right Area */}
        <header className="md:col-start-2 border-b border-border flex items-center justify-between px-10 py-6">
          <h1 className="text-[32px] tracking-[4px] text-gold uppercase m-0">
            Nail Salon's
          </h1>
          <div className="hidden lg:flex items-center space-x-4 text-xs tracking-[1px] uppercase">
            <span>Concord, CA</span>
            <span className="text-border">•</span>
            <span className="text-gold font-bold">{SALON_INFO.phone}</span>
          </div>
        </header>

        {/* Nav - Sidebar Top Left */}
        <nav className="md:col-start-1 md:row-start-1 md:row-span-1 border-r border-border flex flex-col p-10 gap-4">
          {[
            { name: 'Home', href: '#home' },
            { name: 'Services', href: '#services' },
            { name: 'Price List', href: '#price' },
            { name: 'Gallery', href: '#gallery' },
            { name: 'Booking', href: '#booking' },
            { name: 'Contact', href: '#contact' },
          ].map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setActiveSection(link.name.toLowerCase())}
              className={`text-[11px] uppercase tracking-[2px] transition-colors duration-300 ${
                activeSection === link.name.toLowerCase() ? 'text-gold font-bold' : 'text-text-muted hover:text-gold'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Aside - Sidebar Bottom Left */}
        <aside className="md:col-start-1 md:row-start-2 border-r border-border p-8 flex flex-col justify-between gap-12">
          <div>
            <span className="section-title">Our Gallery</span>
            <div className="grid grid-cols-2 gap-2">
              {['CHROME', 'GEL', 'OMBRE', 'ART'].map((tag) => (
                <div key={tag} className="aspect-square bg-dark-soft border border-border-light flex items-center justify-center text-[10px] text-text-dim uppercase tracking-wider hover:border-gold hover:text-gold transition-all cursor-default">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="booking-box">
            <span className="section-title !text-gold !mb-2.5">Quick Booking</span>
            <div className="space-y-4 mb-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="bg-transparent border-b border-border-light text-white w-full py-2 text-xs focus:outline-none focus:border-gold transition-colors"
              />
              <input 
                type="text" 
                placeholder="Select Service" 
                className="bg-transparent border-b border-border-light text-white w-full py-2 text-xs focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div className="flex gap-2.5">
              <a href={`tel:${SALON_INFO.phone.replace(/\s/g, '')}`} className="btn-artistic btn-artistic-call">Call Now</a>
              <a href={`sms:${SALON_INFO.phone.replace(/\s/g, '')}`} className="btn-artistic btn-artistic-msg">Message</a>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="md:col-start-2 md:row-start-2 p-10 bg-gradient-to-br from-[#0d0d0d] to-[#151515] overflow-y-auto max-h-[calc(100vh-220px)]">
          <section id="home" className="mb-20">
            <span className="section-title">Welcome</span>
            <div className="relative h-[300px] rounded-sm overflow-hidden mb-10">
              <img 
                src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=1200" 
                alt="Hero" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h2 className="text-5xl font-serif italic text-white mb-2">Artistic Flair</h2>
                <p className="text-gold tracking-[2px] uppercase text-xs font-bold">Luxury Nail Studio</p>
              </div>
            </div>
          </section>

          <section id="services" className="grid md:grid-cols-2 gap-10 mb-20">
            <div>
              <span className="section-title">Services & Prices / Left</span>
              <div className="flex flex-col gap-3">
                {SERVICES[0].services.concat(SERVICES[2].services).slice(0, 6).map((service, i) => (
                  <div key={i} className="price-item">
                    <span className="price-name">{service.name}</span>
                    <span className="price-value">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="section-title">Services & Prices / Right</span>
              <div className="flex flex-col gap-3">
                {SERVICES[1].services.concat(SERVICES[3].services).slice(0, 6).map((service, i) => (
                  <div key={i} className="price-item">
                    <span className="price-name">{service.name}</span>
                    <span className="price-value">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="price" className="mb-20">
             <span className="section-title">Full Menu</span>
             <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                {SERVICES.map((cat, i) => (
                  <div key={i}>
                    <h3 className="text-gold font-serif italic text-lg mb-4 border-b border-border pb-2">{cat.title}</h3>
                    {cat.services.map((s, si) => (
                      <div key={si} className="price-item">
                        <span className="price-name">{s.name}</span>
                        <span className="price-value">{s.price}</span>
                      </div>
                    ))}
                  </div>
                ))}
             </div>
          </section>

          <section id="gallery" className="mb-20">
            <span className="section-title">Gallery Inspiration</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {GALLERY_IMAGES.map((img, i) => (
                <div key={i} className="aspect-square border border-border-light p-1 hover:border-gold transition-colors duration-500">
                  <img src={img} alt="Nail Art" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </section>

          <section id="booking" className="mb-20">
            <span className="section-title">Reservations</span>
            <div className="glass p-10 rounded-none border-gold/30">
              <Booking />
            </div>
          </section>
        </main>

        {/* Footer - Bottom Area */}
        <footer id="contact" className="md:col-span-2 border-t border-border grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1.5fr] px-10 py-8 items-center gap-8">
          <div className="text-[11px] leading-relaxed text-text-muted">
            <strong className="text-white block mb-1 uppercase tracking-widest">Address</strong>
            {SALON_INFO.address}<br />
            <span className="text-gold font-bold uppercase tracking-widest mt-1 block">PH: {SALON_INFO.phone}</span>
          </div>

          <div className="text-[10px] grid grid-cols-2 gap-x-4 gap-y-1">
            {SALON_INFO.hours.map((h, i) => (
              <React.Fragment key={i}>
                <div className="text-text-muted">{h.day}:</div>
                <div className="text-white font-medium">{h.time}</div>
              </React.Fragment>
            ))}
          </div>

          <div className="h-48 md:h-full min-h-[200px] bg-dark-soft border border-border-light overflow-hidden group relative">
            <iframe
              title="Google Maps"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
              src={`https://www.google.com/maps?q=${encodeURIComponent(SALON_INFO.address)}&output=embed`}
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border border-border-light group-hover:border-gold transition-colors"></div>
          </div>
        </footer>
        <BackToTop />
      </div>
    </div>
  );
}
