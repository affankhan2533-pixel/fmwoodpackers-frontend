import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import PageHero    from '../components/PageHero';
import ProjectCard from '../components/ProjectCard';
import CTASection  from '../components/CTASection';
import { projects } from '../data/projects';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const gridRef   = useRef(null);
  const countRef  = useRef(null);

  const industries = ['All', ...new Set(projects.map(p => p.industry))];
  const filtered   = filter === 'All' ? projects : projects.filter(p => p.industry === filter);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.proj-card');
    if (!cards?.length) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 28, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out', overwrite: 'auto' }
    );
    // Animate count
    if (countRef.current) {
      gsap.fromTo(countRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [filter]);

  return (
    <main className="bg-[#0D1520]">

      <PageHero
        title="Our Portfolio"
        subtitle="Real-world packaging solutions delivered across manufacturing, engineering, pharmaceutical, and export industries."
        breadcrumb="Projects"
      />

      {/* ── Stats bar ── */}
      <div className="bg-[#111827] border-b border-white/5">
        <div className="container-custom py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '10+',  label: 'Years Experience' },
              { value: '200+', label: 'Happy Clients' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-heading font-black text-xl text-accent">{s.value}</span>
                <span className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-bold">{s.label}</span>
              </div>
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-[0.15em] text-white/25 font-bold">
            ISPM-15 Certified · Export Grade
          </span>
        </div>
      </div>

      {/* ── Main section ── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-4">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setFilter(ind)}
                className={`px-5 py-2.5 rounded-sm text-[11px] font-black uppercase tracking-[0.12em]
                            transition-all duration-250 border ${
                  filter === ind
                    ? 'bg-accent text-[#111827] border-accent shadow-[0_0_20px_rgba(201,162,39,0.3)]'
                    : 'bg-white/5 text-white/50 border-white/10 hover:border-accent/40 hover:text-white'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between mb-10">
            <p ref={countRef} className="text-[12px] text-white/30 font-semibold">
              Showing <span className="text-accent font-black">{filtered.length}</span> project{filtered.length !== 1 ? 's' : ''}
              {filter !== 'All' && <span> in <span className="text-white/50">{filter}</span></span>}
            </p>
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <div key={p.id} className="proj-card">
                <ProjectCard project={p} variant="dark" />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {!filtered.length && (
            <div className="text-center py-24 border border-white/5 rounded-sm">
              <p className="text-white/30 text-lg">No projects found for this category.</p>
            </div>
          )}

        </div>
      </section>

      <CTASection
        headline="Have a Specific Project in Mind?"
        subtitle="Let's discuss how we can engineer the perfect packaging solution for your unique cargo requirements."
        buttonText="Discuss Your Project"
        buttonLink="/contact"
      />
    </main>
  );
}
