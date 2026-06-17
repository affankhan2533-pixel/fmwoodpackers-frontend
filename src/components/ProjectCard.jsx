import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FiArrowUpRight } from 'react-icons/fi';

const categoryLabel = {
  'wooden-pallets':     'Wooden Pallets',
  'wooden-crates':      'Wooden Crates',
  'export-packaging':   'Export Packaging',
  'industrial-packing': 'Industrial Packing',
  'machinery-packing':  'Machinery Packing',
  'container-stuffing': 'Container Stuffing',
};

const categoryColor = {
  'wooden-pallets':     'bg-amber-600',
  'wooden-crates':      'bg-[#5B3A29]',
  'export-packaging':   'bg-emerald-600',
  'industrial-packing': 'bg-slate-500',
  'machinery-packing':  'bg-stone-500',
  'container-stuffing': 'bg-blue-600',
};

/**
 * variant="light"  → white card  (used on Home page light background)
 * variant="dark"   → dark card   (used on Projects page dark background)
 */
export default function ProjectCard({ project, variant = 'light' }) {
  const cardRef = useRef(null);
  const imgRef  = useRef(null);

  const isDark = variant === 'dark';

  useEffect(() => {
    const card = cardRef.current;
    const img  = imgRef.current;

    const cardAnim = gsap.to(card, {
      y: -6,
      boxShadow: isDark
        ? '0 28px 50px -12px rgba(0,0,0,0.5)'
        : '0 24px 48px -12px rgba(91,58,41,0.18)',
      duration: 0.32,
      ease: 'power2.out',
      paused: true,
    });
    const imgAnim = gsap.to(img, {
      scale: 1.06,
      duration: 0.6,
      ease: 'power2.out',
      paused: true,
    });

    const onEnter = () => { cardAnim.play(); imgAnim.play(); };
    const onLeave = () => { cardAnim.reverse(); imgAnim.reverse(); };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      cardAnim.kill(); imgAnim.kill();
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, [isDark]);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-sm overflow-hidden flex flex-col h-full transition-all duration-300 border ${
        isDark
          ? 'bg-[#111827] border-white/8'
          : 'bg-white border-[#E5E7EB]'
      }`}
    >
      {/* ── Image ── */}
      <div className={`relative h-56 overflow-hidden ${isDark ? 'bg-[#0D1520]' : 'bg-gray-100'}`}>
        {project.image && (
          <img
            ref={imgRef}
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isDark ? 'opacity-80 group-hover:opacity-100' : 'opacity-100'
            }`}
          />
        )}

        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-linear-to-t ${
          isDark
            ? 'from-[#111827] via-[#111827]/30 to-transparent'
            : 'from-[#1F2937]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100'
        } transition-opacity duration-500`} />

        {/* Industry badge */}
        <span className={`absolute top-4 left-4 text-[10px] font-black uppercase tracking-[0.15em]
                          px-3 py-1.5 rounded-sm border ${
          isDark
            ? 'bg-[#1F2937]/90 backdrop-blur-sm text-white/70 border-white/10'
            : 'bg-[#1F2937]/90 text-white border-transparent'
        }`}>
          {project.industry}
        </span>

        {/* Hover arrow */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-sm bg-accent/0 group-hover:bg-accent
                        flex items-center justify-center transition-all duration-300">
          <FiArrowUpRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-2 h-2 rounded-full ${categoryColor[project.category] || 'bg-accent'}`} />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
            {categoryLabel[project.category] || project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-heading font-bold text-[1.0625rem] leading-snug mb-3
                        group-hover:text-accent transition-colors duration-250 ${
          isDark ? 'text-white' : 'text-charcoal-dark'
        }`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-[13px] leading-relaxed line-clamp-3 flex-1 ${
          isDark ? 'text-white/40' : 'text-charcoal-muted'
        }`}>
          {project.description}
        </p>

        {/* Footer */}
        <div className={`mt-5 pt-4 flex items-center justify-between border-t ${
          isDark ? 'border-white/8' : 'border-gray-100'
        }`}>
          <span className={`text-[11px] font-medium ${isDark ? 'text-white/30' : 'text-charcoal-muted'}`}>
            {project.completionDate}
          </span>
          <span className={`text-[10px] font-black uppercase tracking-[0.15em] transition-colors duration-250
                            group-hover:text-accent ${isDark ? 'text-white/20' : 'text-charcoal-muted'}`}>
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}
