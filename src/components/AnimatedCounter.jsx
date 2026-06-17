import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function AnimatedCounter({ end, suffix = '', prefix = '', label, icon: Icon, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center group"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
        {Icon && <Icon className="w-7 h-7 text-primary" />}
      </div>
      <div className="font-heading font-extrabold text-4xl md:text-5xl text-charcoal mb-2">
        {prefix}
        {end}
        {suffix}
      </div>
      <p className="text-charcoal/70 text-sm font-medium">{label}</p>
    </motion.div>
  );
}
