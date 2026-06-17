import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCalendarCheck, FaProjectDiagram, FaSmile, FaShieldAlt, FaIndustry, FaCar, FaPills, FaMicrochip, FaTruck, FaGlobeAmericas, FaCogs } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import WhyChooseCard from '../components/WhyChooseCard';
import TestimonialSlider from '../components/TestimonialSlider';
import CTASection from '../components/CTASection';
import { services } from '../data/services';
import { projects, industries } from '../data/projects';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { end: 10, suffix: '+', label: 'Years Experience', icon: FaCalendarCheck },
  { end: 500, suffix: '+', label: 'Projects Completed', icon: FaProjectDiagram },
  { end: 200, suffix: '+', label: 'Happy Clients', icon: FaSmile },
  { end: 100, suffix: '%', label: 'Quality Assurance', icon: FaShieldAlt },
];

const whyChoose = [
  { title: 'ISPM-15 Certified Packaging', description: 'All our wood packaging meets international phytosanitary standards for hassle-free global shipping.', icon: '🏅' },
  { title: 'High Quality Timber', description: 'We source only premium-grade, kiln-dried timber for maximum strength and durability.', icon: '🌲' },
  { title: 'Customized Solutions', description: 'Every packaging solution is designed and built to your exact product specifications.', icon: '🎯' },
  { title: 'Fast Delivery', description: 'Efficient manufacturing processes ensure your packaging is ready when you need it.', icon: '🚀' },
  { title: 'Affordable Pricing', description: 'Competitive pricing without compromising on quality or protection standards.', icon: '💎' },
  { title: 'Experienced Team', description: 'Our seasoned professionals bring years of packaging expertise to every project.', icon: '👥' },
];

const industryIcons = {
  'Manufacturing': FaIndustry,
  'Engineering': FaCogs,
  'Automotive': FaCar,
  'Pharmaceuticals': FaPills,
  'Electronics': FaMicrochip,
  'Logistics': FaTruck,
  'Export Businesses': FaGlobeAmericas,
};

// Inline GSAP Animated Counter with Hover Lift
const AnimatedCounter = ({ end, label, icon: Icon, suffix }) => {
  const countRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = countRef.current;
    const scrollAnim = gsap.fromTo(el, 
      { textContent: 0 },
      {
        textContent: end,
        duration: 1.8,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=60',
          toggleActions: 'play none none none',
        }
      }
    );

    // GSAP Hover Lift
    const card = cardRef.current;
    const hoverAnim = gsap.to(card, {
      y: -8,
      borderColor: 'var(--color-accent)',
      boxShadow: '0 20px 30px -10px rgba(194, 159, 93, 0.2), 0 1px 3px rgba(194, 159, 93, 0.1)',
      duration: 0.35,
      paused: true,
      ease: 'power2.out'
    });

    const onEnter = () => hoverAnim.play();
    const onLeave = () => hoverAnim.reverse();

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      scrollAnim.scrollTrigger?.kill();
      scrollAnim.kill();
      hoverAnim.kill();
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, [end]);

  return (
    <div ref={cardRef} className="flex flex-col items-center p-24 bg-white border border-gray-150 rounded-md shadow-sm transition-all duration-300">
        <div className="mt-6 w-14 h-14 bg-accent/10 rounded-md flex items-center justify-center text-accent mb-6">
        <Icon className="w-6 h-6" />
      </div>
      <span className="font-heading font-black text-4xl text-charcoal mb-3">
        <span ref={countRef}>0</span>{suffix}
      </span>
      <span className="text-gray-400 font-extrabold text-xxs uppercase tracking-widest">{label}</span>
    </div>
  );
};

export default function Home() {
  const heroTitleRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroImageRef = useRef(null);

  const servicesSectionRef = useRef(null);
  const whyChooseSectionRef = useRef(null);
  const industriesSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const projectsTrackRef = useRef(null);

  // Hero Animations (Side Scroller Slide-in)
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(heroTitleRef.current, 
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    )
    .fromTo(heroTextRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(heroButtonsRef.current.children,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
      '-=0.35'
    );

    gsap.fromTo(heroImageRef.current,
      { x: 100, opacity: 0, scale: 1.05 },
      { x: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }
    );
  }, []);


  // Services ScrollTrigger Stagger
  useEffect(() => {
    const cards = servicesSectionRef.current?.querySelectorAll('.service-card-wrapper');
    if (!cards || cards.length === 0) return;

    const anim = gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesSectionRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        }
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  // Why Choose Us ScrollTrigger Stagger
  useEffect(() => {
    const items = whyChooseSectionRef.current?.querySelectorAll('.why-card-wrapper');
    if (!items || items.length === 0) return;

    const anim = gsap.fromTo(items,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: whyChooseSectionRef.current,
          start: 'top bottom-=80',
          toggleActions: 'play none none none',
        }
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  // Horizontal Scroll for Projects (only on screens wider than 768px)
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    // Delayed refresh to ensure that dynamic image sizes are fully resolved by ScrollTrigger
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const pin = gsap.to(projectsTrackRef.current, {
      x: () => -(projectsTrackRef.current.scrollWidth - window.innerWidth + 200),
      ease: 'none',
      scrollTrigger: {
        trigger: projectsSectionRef.current,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${projectsTrackRef.current.scrollWidth - window.innerWidth + 100}`,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      clearTimeout(refreshTimer);
      pin.scrollTrigger?.kill();
      pin.kill();
    };
  }, []);

  // Industries Section Reveal
  useEffect(() => {
    const industriesCards = industriesSectionRef.current?.querySelectorAll('.industry-card');
    if (!industriesCards || industriesCards.length === 0) return;

    const anim = gsap.fromTo(industriesCards,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: industriesSectionRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        }
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <main className="overflow-hidden bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-[#FAF9F5] to-[#F3EFE6] pt-44 pb-24 lg:pt-56 lg:pb-40">
        <div className="absolute inset-0 hero-pattern opacity-40 pointer-events-none"></div>

        <div className="container-custom relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left - Content */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[2px] bg-accent"></span>
                <span className="text-accent font-extrabold text-xs uppercase tracking-[0.25em]">Premium Industrial Standards</span>
              </div>

              <h1 
                ref={heroTitleRef}
                className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.12] mb-10 tracking-tight"
              >
                <span className="text-gradient-wood">Premium Wooden</span> <br />
                <span className="text-charcoal">Packaging Solutions For</span> <br />
                <span className="text-gradient-gold">
                  Global Transportation
                </span>
              </h1>

              <p 
                ref={heroTextRef}
                className="text-charcoal-light/80 text-base md:text-lg leading-relaxed mb-12 max-w-xl"
              >
                FM Wood Packers delivers engineered wooden pallets, heavy-duty crates, and ISPM-15 certified export packaging designed to secure your high-value cargo during sea, air, and road transit.
              </p>

              <div ref={heroButtonsRef} className="flex flex-wrap gap-6">
                <Link
                  to="/get-quote"
                  className="btn-wood-primary"
                >
                  Get Free Quote
                </Link>
                <Link
                  to="/services"
                  className="btn-wood-outline"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative hidden lg:block h-[580px] rounded-md overflow-hidden shadow-2xl border border-gray-200">
              <img
                ref={heroImageRef}
                src="/image.png"
                alt="FM Wood Packers Premium Wooden Packaging Operations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="bg-white py-20 border-b border-gray-150">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <AnimatedCounter key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section ref={servicesSectionRef} className="bg-section py-24 md:py-32 border-b border-gray-150">
        <div className="container-custom">
          <SectionHeading
            title="Premium Industrial Services"
            subtitle="Expert Packaging Operations"
          />
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mt-16">
            {services.slice(0, 4).map((service, i) => (
              <div key={service.id} className="service-card-wrapper">
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>
          <div className="text-center mt-16 pb-4">
            <Link
              to="/services"
              className="btn-wood-outline"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section ref={whyChooseSectionRef} className="bg-white py-24 md:py-32 border-b border-gray-150">
        <div className="container-custom">
          <SectionHeading
            title="Why Choose FM Wood Packers"
            subtitle="Industrial Strengths"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {whyChoose.map((item, i) => (
              <div key={i} className="why-card-wrapper animate-quote-load">
                <WhyChooseCard {...item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section ref={industriesSectionRef} className="bg-section py-24 md:py-32 border-y border-gray-150">
        <div className="container-custom">
          <SectionHeading
            title="Industries We Serve"
            subtitle="Global Supply Chains"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
            {industries.map((industry, i) => {
              const Icon = industryIcons[industry.name] || FaIndustry;
              return (
                <div
                  key={i}
                  className="industry-card group bg-white rounded-md p-8 text-center shadow-sm hover:shadow-xl hover-gold-glow transition-all duration-500 border border-gray-200 cursor-pointer"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-md bg-gray-50 flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-inner">
                    <Icon className="w-7 h-7 text-primary group-hover:text-gold transition-colors duration-500" />
                  </div>
                  <h3 className="font-heading font-bold text-charcoal text-sm group-hover:text-primary transition-colors duration-300">
                    {industry.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS (HORIZONTAL SCROLL) ===== */}
      <section 
        ref={projectsSectionRef} 
        className="bg-white pt-48 pb-32 hidden md:block overflow-hidden relative"
      >
        <div className="container-custom mb-16">
          <SectionHeading
            title="Featured Projects"
            subtitle="Industrial Packaging Cases"
          />
        </div>

        <div className="px-10 lg:px-24">
          <div ref={projectsTrackRef} className="horizontal-scroll-container">
            {projects.slice(0, 6).map((project, i) => (
              <div key={project.id} className="horizontal-scroll-item">
                <ProjectCard project={project} index={i} />
              </div>
            ))}
            <div className="horizontal-scroll-item flex flex-col justify-center items-center h-full bg-gray-50 border border-gray-200 rounded-md p-12 text-center shadow-inner">
              <h3 className="font-heading font-extrabold text-2xl text-charcoal mb-4">Have a Special Packing Project?</h3>
              <p className="text-gray-500 text-sm mb-8 max-w-xs leading-relaxed">Let us engineer a custom-tailored heavy cargo packaging solution for your export needs.</p>
              <Link to="/projects" className="btn-wood-outline">View All Case Studies</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Projects Grid (Fallback) */}
      <section className="bg-white py-24 block md:hidden border-b border-gray-150">
        <div className="container-custom">
          <SectionHeading
            title="Featured Projects"
            subtitle="Case Studies"
          />
          <div className="grid gap-10 mt-16">
            {projects.slice(0, 4).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/projects" className="btn-wood-outline">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-section py-24 md:py-32 border-b border-gray-150">
        <div className="container-custom">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Corporate Client Trust"
          />
          <div className="mt-16 flex justify-center">
            <div className="w-full" style={{ maxWidth: '760px' }}>
              <TestimonialSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <CTASection
        headline="Need Safe, Reliable and Compliant Industrial Packaging?"
        subtitle="Consult our packaging engineers for a free site assessment and quotation for custom pallets, crates, and sea cargo stuffing."
        buttonText="Request Consultation & Quote"
      />
    </main>
  );
}
