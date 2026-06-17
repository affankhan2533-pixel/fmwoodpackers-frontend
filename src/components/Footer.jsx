import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaArrowUp } from 'react-icons/fa';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const serviceLinks = [
  { name: 'Wooden Pallets', path: '/services#wooden-pallets' },
  { name: 'Wooden Crates', path: '/services#wooden-crates' },
  { name: 'Export Packaging', path: '/services#export-packaging' },
  { name: 'Industrial Packing', path: '/services#industrial-packing' },
  { name: 'Machinery Packing', path: '/services#machinery-packing' },
  { name: 'Container Stuffing', path: '/services#container-stuffing' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-charcoal-dark text-white/70 border-t border-white/5">
      {/* Main Footer */}
      <div className="container-custom section-padding pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png?v=2" alt="FM Wood Packers Logo" className="w-10 h-10 object-cover rounded shadow-md" />
              <div>
                <h3 className="font-heading font-bold text-white text-base leading-tight">FM Wood Packers</h3>
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-bold">Premium Packaging</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Engineered industrial-grade wooden packaging solutions for seamless global transit. ISPM-15 certified pallets, crates, and machinery packing.
            </p>
            <div className="flex gap-2">
              {[FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded bg-white/5 border border-white/10 hover:border-gold hover:bg-gold hover:text-charcoal flex items-center justify-center text-white/50 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-extrabold text-white text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gold rounded-full"></span>
              Navigation
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/50 hover:text-white transition-all duration-300 hover:pl-1 flex items-center gap-1">
                    <span>•</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-extrabold text-white text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gold rounded-full"></span>
              Solutions
            </h4>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/50 hover:text-white transition-all duration-300 hover:pl-1 flex items-center gap-1">
                    <span>•</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-extrabold text-white text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-gold rounded-full"></span>
              Global HQ
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-gold mt-1 shrink-0 text-sm" />
                <span className="text-sm text-white/50 leading-relaxed">Mumbra Shilphata Road, Mumbra, Thane, MH 400612</span>
              </li>
              <li className="flex items-center gap-4">
                <FaPhone className="text-gold shrink-0 text-sm" />
                <a href="tel:+919876543210" className="text-sm text-white/50 hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-4">
                <FaEnvelope className="text-gold shrink-0 text-sm" />
                <a href="mailto:info@fmwoodpackers.com" className="text-sm text-white/50 hover:text-white transition-colors">info@fmwoodpackers.com</a>
              </li>
              <li className="flex items-center gap-4">
                <FaClock className="text-gold shrink-0 text-sm" />
                <span className="text-sm text-white/50">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-charcoal-dark/30">
        <div className="container-custom py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30 tracking-wide">
            © {new Date().getFullYear()} FM WOOD PACKERS. EXPORT PACKAGING DIVISION. ALL RIGHTS RESERVED.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded bg-primary hover:bg-gold text-white hover:text-charcoal flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-md cursor-pointer border border-primary/20"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
