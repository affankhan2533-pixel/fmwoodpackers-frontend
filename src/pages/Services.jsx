import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import { services } from '../data/services';
import { FaCheckCircle, FaCubes, FaBox, FaGlobeAmericas, FaIndustry, FaCogs, FaShippingFast, FaTools } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  FaCubes: FaCubes,
  FaBox: FaBox,
  FaGlobeAmericas: FaGlobeAmericas,
  FaIndustry: FaIndustry,
  FaCogs: FaCogs,
  FaShippingFast: FaShippingFast,
  FaTools: FaTools,
};

export default function Services() {
  const servicesContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.service-section');
      sections.forEach((sec, index) => {
        const textCol = sec.querySelector('.text-column');
        const imgCol = sec.querySelector('.image-column');
        const isEven = index % 2 === 0;
        
        if (textCol) {
          gsap.fromTo(textCol.children,
            { opacity: 0, x: isEven ? -60 : 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
              }
            }
          );
        }

        if (imgCol) {
          gsap.fromTo(imgCol,
            { opacity: 0, x: isEven ? 80 : -80, scale: 0.98 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.95,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
              }
            }
          );

          // GSAP hover image scale
          const img = imgCol.querySelector('img');
          if (img) {
            const hover = gsap.to(img, {
              scale: 1.05,
              duration: 0.4,
              paused: true,
              ease: 'power2.out'
            });
            imgCol.addEventListener('mouseenter', () => hover.play());
            imgCol.addEventListener('mouseleave', () => hover.reverse());
          }
        }
      });
    }, servicesContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-white">
      <PageHero
        title="Our Services"
        subtitle="Comprehensive wooden packaging and industrial crating solutions designed to protect your valuable assets."
        breadcrumb="Services"
      />

      {/* Quick Navigation */}
      <div className="bg-section py-8 border-b border-gray-150">
        <div className="container-custom">
          <div className="flex flex-wrap gap-5 justify-center">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="px-8 py-3.5 bg-white text-charcoal font-black text-xs md:text-sm uppercase tracking-widest rounded-sm shadow-md hover:shadow-lg hover:border-wood hover:text-wood hover:-translate-y-1 transition-all duration-300 border-2 border-solid border-gray-200"
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Services List */}
      <div ref={servicesContainerRef} className="bg-white">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.icon] || FaBox;
          return (
            <section
              key={service.id}
              id={service.id}
              className={`service-section section-padding scroll-mt-20 ${index % 2 !== 0 ? 'bg-section' : 'bg-white'}`}
            >
              <div className="container-custom">
                <div className={`grid lg:grid-cols-2 gap-20 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Text Content */}
                  <div className={`text-column ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className="w-14 h-14 rounded-md bg-accent/10 text-accent flex items-center justify-center mb-8 animate-float">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <h2 className="font-heading font-black text-3xl md:text-4xl text-charcoal mb-6">
                      <span className="text-gradient-wood">{service.title}</span>
                    </h2>
                    <p className="text-charcoal-light/85 text-lg leading-relaxed mb-10">
                      {service.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8 mb-12">
                      {/* Features */}
                      <div>
                        <h4 className="font-heading font-bold text-sm text-charcoal mb-4 border-b border-gray-150 pb-2 uppercase tracking-wider">Key Features</h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <FaCheckCircle className="text-accent mt-1 shrink-0 animate-float" />
                              <span className="text-charcoal-light/80 text-sm leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-heading font-bold text-sm text-charcoal mb-4 border-b border-gray-150 pb-2 uppercase tracking-wider">Your Benefits</h4>
                        <ul className="space-y-3">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <FaCheckCircle className="text-wood mt-1 shrink-0 animate-float-slow" />
                              <span className="text-charcoal-light/80 text-sm leading-snug">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link
                      to={`/get-quote?service=${service.id}`}
                      className="btn-wood-primary"
                    >
                      Request Quote for {service.title}
                    </Link>
                  </div>

                  {/* Image / Visual */}
                  <div className={`image-column ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl border border-gray-150">
                      {service.image ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <IconComponent className="text-9xl text-charcoal/10" />
                        </div>
                      )}
                      {/* Industrial Protection Badge */}
                      <div className="absolute bottom-4 left-4 right-4 bg-charcoal/95 backdrop-blur-md rounded-md p-4 border border-charcoal-light shadow-md flex items-center justify-between z-10">
                        <div>
                          <p className="font-heading font-bold text-white text-xs uppercase tracking-wider">Premium Quality</p>
                          <p className="text-white/60 text-xxs">Guaranteed Protection</p>
                        </div>
                        <div className="w-8 h-8 rounded-sm bg-accent/20 flex items-center justify-center text-accent">
                          <FaCheckCircle className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}

      </div>

      <CTASection
        headline="Ready to secure your cargo?"
        subtitle="Contact our packaging experts today for a customized solution tailored to your specific requirements."
        buttonText="Contact Us Now"
        buttonLink="/contact"
        dark={false}
      />
    </main>
  );
}

