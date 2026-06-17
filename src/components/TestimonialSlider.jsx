import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { testimonials } from '../data/testimonials';

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef(null);

  const animate = (dir) => {
    gsap.fromTo(
      cardRef.current,
      { x: dir * 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
    );
  };

  const next = () => {
    const n = (current + 1) % testimonials.length;
    setCurrent(n);
    animate(-1);
  };
  const prev = () => {
    const n = (current - 1 + testimonials.length) % testimonials.length;
    setCurrent(n);
    animate(1);
  };

  useEffect(() => {
    gsap.fromTo(cardRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }, []);

  const t = testimonials[current];

  return (
    <div className="w-full flex flex-col items-center">

      {/* ── Card ── */}
      <div
        ref={cardRef}
        className="relative bg-white border border-[#E5E7EB] rounded-sm p-10 md:p-14 shadow-sm text-center w-full"
      >
        {/* Decorative quote mark */}
        <FaQuoteRight className="absolute top-8 right-8 w-10 h-10 text-primary/5" />

        {/* Stars – centred */}
        <div className="flex gap-1 justify-center mb-6">
          {Array.from({ length: t.rating }).map((_, i) => (
            <FaStar key={i} className="w-4 h-4 text-accent" />
          ))}
        </div>

        {/* Quote text */}
        <p className="text-[1.0625rem] md:text-[1.125rem] text-charcoal-light leading-relaxed font-medium mb-10 italic">
          "{t.text}"
        </p>

        {/* Author – centred */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-sm bg-primary flex items-center justify-center shrink-0">
            <span className="font-heading font-black text-lg text-accent">{t.name[0]}</span>
          </div>
          <div>
            <p className="font-heading font-bold text-[0.9375rem] text-charcoal-dark">{t.name}</p>
            <p className="text-[12px] text-charcoal-muted mt-0.5">
              {t.position} · {t.company}
            </p>
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-center gap-6 mt-8 w-full">

        {/* Prev */}
        <button
          onClick={prev}
          className="w-10 h-10 rounded-sm border border-gray-200 flex items-center justify-center text-charcoal hover:border-accent hover:text-accent transition-all duration-200"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Dots */}
        <div className="flex gap-2 items-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const dir = i > current ? -1 : 1;
                setCurrent(i);
                animate(dir);
              }}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-7 h-2 bg-accent'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="w-10 h-10 rounded-sm border border-gray-200 flex items-center justify-center text-charcoal hover:border-accent hover:text-accent transition-all duration-200"
          aria-label="Next testimonial"
        >
          <FaChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>

      {/* Counter */}
      <p className="text-center mt-4 text-[11px] text-charcoal-muted font-semibold tracking-wider uppercase">
        {current + 1} / {testimonials.length}
      </p>

    </div>
  );
}
