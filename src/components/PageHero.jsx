import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export default function PageHero({ title, subtitle, breadcrumb }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const children = contentRef.current?.children;
    if (!children) return;
    gsap.fromTo(
      children,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  return (
    <section className="relative bg-[#1F2937] overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #C9A227 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Gold top accent line */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* ── Content – pushed well below the fixed navbar ── */}
      <div
        ref={contentRef}
        className="container-custom relative z-10"
        style={{ paddingTop: '10rem', paddingBottom: '5rem' }}
      >

        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="flex items-center gap-2 text-[12px] text-white/40 font-medium mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-accent">{breadcrumb}</span>
          </div>
        )}

        {/* Eyebrow label */}
        <p className="section-label mb-5 text-accent">
          FM Wood Packers
        </p>

        {/* Main heading */}
        <h1
          className="font-heading font-extrabold text-white leading-tight tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', maxWidth: '700px' }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="text-white/55 leading-relaxed"
            style={{ fontSize: '1.0625rem', maxWidth: '580px' }}
          >
            {subtitle}
          </p>
        )}

        {/* Gold rule */}
        <div className="gold-rule mt-8" />

      </div>
    </section>
  );
}
