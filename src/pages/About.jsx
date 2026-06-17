import { useEffect, useRef } from 'react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { team, companyTimeline, companyValues } from '../data/team';
import { FaCheckCircle, FaAward, FaHandshake, FaLightbulb, FaShieldAlt, FaLeaf, FaHardHat } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  FaAward: FaAward,
  FaHandshake: FaHandshake,
  FaLightbulb: FaLightbulb,
  FaShieldAlt: FaShieldAlt,
  FaLeaf: FaLeaf,
  FaHardHat: FaHardHat,
};

export default function About() {
  const storySectionRef = useRef(null);
  const storyTextRef = useRef(null);
  const storyImageRef = useRef(null);
  const storyBadgeRef = useRef(null);
  
  const missionVisionRef = useRef(null);
  const missionCardRef = useRef(null);
  const visionCardRef = useRef(null);
  
  const timelineSectionRef = useRef(null);
  const valuesSectionRef = useRef(null);
  const teamSectionRef = useRef(null);

  useEffect(() => {
    // 1. Story Section Animations (Side Scroller Slide-in)
    const storyCtx = gsap.context(() => {
      gsap.fromTo(storyTextRef.current.children,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storySectionRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(storyImageRef.current,
        { opacity: 0, x: 80, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storySectionRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(storyBadgeRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: storySectionRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
    }, storySectionRef);

    // 2. Mission & Vision Animations (Side Scroller Slide-in)
    const mvCtx = gsap.context(() => {
      gsap.fromTo(missionCardRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: missionVisionRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(visionCardRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: missionVisionRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
    }, missionVisionRef);


    // 3. Timeline Animations
    const timelineCtx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=80',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, timelineSectionRef);

    // 4. Values Animations
    const valuesCtx = gsap.context(() => {
      const cards = gsap.utils.toArray('.value-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: valuesSectionRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );

      // Value Card GSAP Hover
      cards.forEach(card => {
        const hover = gsap.to(card, {
          y: -8,
          borderColor: 'var(--color-accent)',
          boxShadow: '0 20px 30px -10px rgba(194, 159, 93, 0.2), 0 1px 3px rgba(194, 159, 93, 0.1)',
          duration: 0.35,
          paused: true,
          ease: 'power2.out'
        });
        card.addEventListener('mouseenter', () => hover.play());
        card.addEventListener('mouseleave', () => hover.reverse());
      });
    }, valuesSectionRef);

    // 5. Team Animations
    const teamCtx = gsap.context(() => {
      const cards = gsap.utils.toArray('.team-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: teamSectionRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );

      // Team Card GSAP Hover
      cards.forEach(card => {
        const hover = gsap.to(card, {
          y: -10,
          borderColor: 'var(--color-wood)',
          boxShadow: '0 25px 35px -12px rgba(180, 83, 9, 0.25), 0 1px 3px rgba(180, 83, 9, 0.1)',
          duration: 0.35,
          paused: true,
          ease: 'power2.out'
        });
        card.addEventListener('mouseenter', () => hover.play());
        card.addEventListener('mouseleave', () => hover.reverse());
      });
    }, teamSectionRef);

    return () => {
      storyCtx.revert();
      mvCtx.revert();
      timelineCtx.revert();
      valuesCtx.revert();
      teamCtx.revert();
    };
  }, []);

  return (
    <main className="bg-white">
      <PageHero
        title="About Our Company"
        subtitle="Leading the industry in premium wooden packaging solutions with a commitment to quality and reliability."
        breadcrumb="About Us"
      />

      {/* ===== OVERVIEW ===== */}
      <section ref={storySectionRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div ref={storyTextRef}>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[2px] bg-accent"></span>
                <span className="text-accent font-extrabold text-xs uppercase tracking-[0.25em]">Our Story</span>
              </div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-charcoal mb-8 leading-tight">
                <span className="text-gradient-wood">Decades of Excellence</span> <br />
                in Industrial Packaging
              </h2>
              <p className="text-charcoal-light/85 leading-relaxed mb-8">
                Founded with a vision to revolutionize industrial packaging, FM Wood Packers has grown into a premier provider of wooden pallets, crates, and specialized export packaging solutions. We understand that your products are valuable, and their safe journey is our absolute priority.
              </p>
              <p className="text-charcoal-light/85 leading-relaxed mb-10">
                Our state-of-the-art manufacturing facility combines traditional woodworking craftsmanship with modern engineering principles to deliver packaging that meets stringent international standards, including ISPM-15 certification.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {['ISPM-15 Certified Facility', 'Premium Grade Timber', 'Custom Engineering', 'Global Export Standards'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-wood w-5 h-5 animate-float" />
                    <span className="font-semibold text-charcoal text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div ref={storyImageRef} className="relative h-[480px] rounded-md overflow-hidden shadow-xl border border-gray-150 bg-gray-50">
                <img
                  src="/image copy 8.png"
                  alt="FM Wood Packers Manufacturing Operations"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              {/* Experience Badge */}
              <div 
                ref={storyBadgeRef}
                className="absolute -bottom-6 -left-6 bg-charcoal p-8 rounded-md shadow-xl border border-charcoal-light"
              >
                <div className="text-center">
                  <span className="block font-heading font-black text-accent text-4xl mb-2 animate-float">10+</span>
                  <span className="block text-white font-bold text-xxs uppercase tracking-widest leading-tight">Years of<br/>Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section ref={missionVisionRef} className="section-padding bg-section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission */}
            <div
              ref={missionCardRef}
              className="bg-white p-12 rounded-md shadow-sm border border-gray-200 relative overflow-hidden group hover:border-wood/35 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-wood/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <h3 className="font-heading font-bold text-2xl text-charcoal mb-6 flex items-center gap-4">
                <span className="w-12 h-12 rounded-md bg-wood/10 text-wood flex items-center justify-center font-heading font-extrabold animate-float">🎯</span>
                Our Mission
              </h3>
              <p className="text-charcoal-light/80 leading-relaxed relative z-10 text-sm md:text-base">
                To provide our clients with the highest quality, most reliable, and cost-effective wooden packaging solutions. We protect our clients' valuable assets during transit while maintaining the highest standards of safety, compliance, and environmental responsibility.
              </p>
            </div>

            {/* Vision */}
            <div
              ref={visionCardRef}
              className="bg-charcoal p-12 rounded-md shadow-lg border border-charcoal-light relative overflow-hidden group hover:border-accent/35 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <h3 className="font-heading font-bold text-2xl text-white mb-6 flex items-center gap-4">
                <span className="w-12 h-12 rounded-md bg-accent/15 text-accent flex items-center justify-center animate-float-slow">👁️</span>
                Our Vision
              </h3>
              <p className="text-white/80 leading-relaxed relative z-10 text-sm md:text-base">
                To be the globally recognized leader in industrial packaging solutions, known for our innovation, unparalleled quality, and unwavering commitment to customer success across all major manufacturing and export sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section ref={timelineSectionRef} className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading title="Our Journey" subtitle="Timeline" />
          
          <div className="max-w-4xl mx-auto mt-16">
            {companyTimeline.map((item, index) => (
              <div
                key={index}
                className="timeline-item flex gap-8 md:gap-12 mb-10 last:mb-0"
              >
                {/* Year/Line */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-8 rounded-md bg-wood text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md uppercase tracking-wider">
                    {item.year}
                  </div>
                  {index !== companyTimeline.length - 1 && (
                    <div className="w-[2px] h-full bg-gray-200 mt-3 rounded-full"></div>
                  )}
                </div>
                
                {/* Content */}
                <div className="pb-10">
                  <h4 className="font-heading font-bold text-xl text-charcoal mb-3">{item.title}</h4>
                  <p className="text-charcoal-light/75 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section ref={valuesSectionRef} className="section-padding bg-section">
        <div className="container-custom">
          <SectionHeading title="Core Values" subtitle="What Drives Us" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {companyValues.map((value, i) => {
              const IconComponent = iconMap[value.icon] || FaAward;
              return (
                <div
                  key={i}
                  className="value-card bg-white p-10 rounded-md shadow-sm border border-gray-200 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-md bg-accent/10 text-accent flex items-center justify-center mb-8 animate-float">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-charcoal mb-4">{value.title}</h4>
                  <p className="text-charcoal-light/75 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section ref={teamSectionRef} className="bg-[#1F2937] py-24 md:py-32 relative overflow-hidden">

        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        <div className="container-custom relative z-10">

          {/* Heading */}
          <div className="text-center mb-16">
            <p className="section-label justify-center mb-4">The Experts</p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
              Leadership Team
            </h2>
            <div className="gold-rule mx-auto mt-5" />
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <div
                key={member.id}
                className="team-card group relative bg-white/5 border border-white/10 rounded-sm overflow-hidden
                           hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                           transition-all duration-350 cursor-default"
              >
                {/* Top color bar */}
                <div className={`h-1 w-full ${
                  i === 0 ? 'bg-accent' :
                  i === 1 ? 'bg-primary' :
                  i === 2 ? 'bg-accent/70' : 'bg-primary/70'
                }`} />

                {/* Avatar area */}
                <div className="pt-10 pb-6 px-6 flex flex-col items-center">
                  {/* Circle avatar with initials */}
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-[#3D2518] border-2 border-accent/30
                                    flex items-center justify-center shadow-xl group-hover:border-accent transition-colors duration-300">
                      <span className="font-heading font-black text-3xl text-accent">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {/* Online dot */}
                    <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#1F2937]" />
                  </div>

                  {/* Name & role */}
                  <h4 className="font-heading font-bold text-white text-[1rem] text-center leading-snug mb-1">
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent text-center">
                    {member.position}
                  </p>
                </div>

                {/* Divider */}
                <div className="mx-6 h-px bg-white/8" />

                {/* Description */}
                <div className="px-6 py-5">
                  <p className="text-[12.5px] text-white/45 leading-relaxed text-center">
                    {member.description}
                  </p>
                </div>

                {/* Hover reveal bottom strip */}
                <div className="h-0 group-hover:h-10 overflow-hidden transition-all duration-350 bg-accent/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    FM Wood Packers
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}

