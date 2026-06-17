import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTASection({ headline, subtitle, buttonText, buttonLink, dark = true }) {
  return (
    <section className={`relative overflow-hidden ${dark ? 'bg-gradient-to-br from-charcoal via-charcoal-dark to-charcoal' : 'bg-gradient-to-br from-wood to-wood-dark'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-wood/10 blur-3xl"></div>

      <div className="container-custom section-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight"
          >
            {headline}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/70 text-lg mb-10 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4"
          >
            <Link
              to={buttonLink || '/get-quote'}
              className="btn-wood-primary whitespace-nowrap"
            >
              {buttonText || 'Request a Free Quote'}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
