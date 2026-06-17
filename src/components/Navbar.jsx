import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';
  const isDarkHeroPage = !isHomePage && !location.pathname.startsWith('/admin');

  // Determine navbar text and background styling based on scroll and page path
  const navbarClasses = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-gray-100 py-4'
    : 'bg-transparent border-b border-transparent py-6';

  const logoTextClasses = isScrolled
    ? 'text-charcoal'
    : isDarkHeroPage
      ? 'text-white'
      : 'text-charcoal';

  const linkTextClasses = (path) => {
    const isActive = location.pathname === path;
    if (isActive) return 'text-gold';
    
    if (isScrolled) {
      return 'text-charcoal/70 hover:text-gold';
    } else {
      return isDarkHeroPage
        ? 'text-white/80 hover:text-white'
        : 'text-charcoal/70 hover:text-gold';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className={`text-xs py-2.5 hidden md:block transition-all duration-300 ${
        isScrolled 
          ? 'h-0 py-0 overflow-hidden opacity-0' 
          : isDarkHeroPage 
            ? 'bg-charcoal-dark/20 text-white/60 border-b border-white/5' 
            : 'bg-gray-50 text-charcoal/60 border-b border-gray-100'
      }`}>
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-gold transition-colors font-semibold">
              <FaPhone className="text-gold text-[10px]" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@fmwoodpackers.com" className="flex items-center gap-2 hover:text-gold transition-colors font-semibold">
              <FaEnvelope className="text-gold text-[10px]" />
              <span>info@fmwoodpackers.com</span>
            </a>
          </div>
          <p className="font-extrabold tracking-widest uppercase text-[9px] text-accent">ISPM-15 Certified Manufacturing Facility</p>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${navbarClasses}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center shadow-md group-hover:shadow-primary/30 transition-all duration-300">
              <span className="text-gold font-heading font-black text-base">FM</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-extrabold text-base leading-tight tracking-tight transition-colors duration-300 ${logoTextClasses}`}>
                FM Wood Packers
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-bold">
                Premium Packaging
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${linkTextClasses(link.path)}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-6">
            <Link
              to="/get-quote"
              className="hidden md:inline-flex btn-wood-primary text-xs !px-6 !py-3 whitespace-nowrap"
            >
              Get Free Quote
            </Link>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? 'text-charcoal' : isDarkHeroPage ? 'text-white' : 'text-charcoal'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-gray-200 shadow-xl absolute top-full left-0 right-0 z-40 overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg text-sm font-bold tracking-wide uppercase transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary/5 text-primary'
                      : 'text-charcoal hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/get-quote"
                className="mt-4 px-4 py-3.5 btn-wood-primary text-center text-xs font-bold uppercase tracking-wider"
              >
                Get Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

