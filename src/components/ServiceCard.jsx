import { Link } from 'react-router-dom';
import { FaCubes, FaBox, FaGlobeAmericas, FaIndustry, FaCogs, FaShippingFast, FaTools } from 'react-icons/fa';

const iconMap = {
  FaCubes: FaCubes,
  FaBox: FaBox,
  FaGlobeAmericas: FaGlobeAmericas,
  FaIndustry: FaIndustry,
  FaCogs: FaCogs,
  FaShippingFast: FaShippingFast,
  FaTools: FaTools,
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.icon] || FaBox;

  return (
    <div
      className="group relative bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl hover-gold-glow transition-all duration-500 border border-gray-200 h-full flex flex-col justify-between"
      style={{ padding: '36px' }}
    >
      {/* Top Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wood via-accent to-wood transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

      <div>
        {/* Icon */}
        <div className="w-16 h-16 rounded-md bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-300 text-accent animate-float">
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Content */}
        <h3 className="font-heading font-bold text-2xl text-charcoal mb-4 group-hover:text-wood transition-colors duration-300 leading-snug">
          {service.title}
        </h3>
        <p className="text-charcoal-light/75 text-sm leading-relaxed mb-6">
          {service.shortDesc}
        </p>
      </div>

      {/* Link */}
      <div className="mt-8">
        <Link
          to={`/services#${service.id}`}
          className="w-full btn-wood-outline !py-4 !px-6 !text-xs flex items-center justify-center gap-2 group/btn"
        >
          Explore Service
          <svg className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

