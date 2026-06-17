import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaCheckCircle, FaWhatsapp,
} from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import PageHero from '../components/PageHero';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    companyName: '', serviceRequired: '', message: '',
  });
  const [status, setStatus]     = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left > *',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom-=80', toggleActions: 'play none none none' } }
      );
      gsap.fromTo('.contact-right',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom-=80', toggleActions: 'play none none none' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('/api/contacts', formData);
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', companyName: '', serviceRequired: '', message: '' });
      setTimeout(() => setStatus('idle'), 8000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  /* ── input style ── */
  const inp = `w-full bg-[#F8F9FA] border border-solid border-gray-300 rounded-sm px-5 py-4 text-[15px]
               text-charcoal-dark placeholder-gray-400 outline-none
               focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/15
               transition-all duration-250 font-body`;

  const lbl = `block text-[11px] font-black uppercase tracking-[0.15em] text-charcoal-muted mb-2`;

  return (
    <main className="bg-white">
      <PageHero
        title="Get In Touch"
        subtitle="Our packaging engineers are ready to discuss your requirements and provide a free, no-obligation quote within 24 hours."
        breadcrumb="Contact"
      />

      {/* ════════════════════════════════
          CONTACT SECTION
      ════════════════════════════════ */}
      <section ref={sectionRef} className="py-24 md:py-36 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 xl:gap-28 items-start">

            {/* ══ LEFT ══ */}
            <div className="contact-left space-y-10">

              {/* Heading */}
              <div>
                <p className="section-label mb-4">Let's Talk Business</p>
                <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-charcoal-dark leading-tight mb-6">
                  We're Ready to<br />
                  <span className="text-gradient-wood">Help You</span>
                </h2>
                <p className="text-[16px] text-charcoal-muted leading-relaxed max-w-md">
                  Whether it's wooden pallets, export crating, or heavy machinery packaging — our team
                  responds to every enquiry within 2 hours.
                </p>
              </div>

              {/* Info cards – big and spaced */}
              <div className="space-y-4">

                {/* Location */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mumbra+Shilphata+Thane+Maharashtra"
                  target="_blank" rel="noreferrer"
                  className="group flex items-start gap-6 p-6 border border-gray-100 rounded-sm
                             hover:border-accent/40 hover:bg-[#FDFAF5] transition-all duration-250"
                >
                  <div className="w-12 h-12 rounded-sm bg-primary/8 flex items-center justify-center shrink-0
                                  group-hover:bg-primary transition-colors duration-250">
                    <FaMapMarkerAlt className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent mb-1.5">Our Location</p>
                    <p className="text-[15px] font-semibold text-charcoal-dark">Mumbra Shilphata Road, Mumbra</p>
                    <p className="text-[14px] text-charcoal-muted">Thane, Maharashtra 400612, India</p>
                  </div>
                </a>

                {/* Phone + WhatsApp side by side */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <a href="tel:+919876543210"
                    className="group flex items-start gap-5 p-6 border border-gray-100 rounded-sm
                               hover:border-accent/40 hover:bg-[#FDFAF5] transition-all duration-250">
                    <div className="w-12 h-12 rounded-sm bg-primary/8 flex items-center justify-center shrink-0
                                    group-hover:bg-primary transition-colors duration-250">
                      <FaPhone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent mb-1.5">Phone</p>
                      <p className="text-[15px] font-semibold text-charcoal-dark">+91 98765 43210</p>
                      <p className="text-[13px] text-charcoal-muted">+91 98765 43211</p>
                    </div>
                  </a>

                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
                    className="group flex items-start gap-5 p-6 border border-gray-100 rounded-sm
                               hover:border-green-400/50 hover:bg-green-50/40 transition-all duration-250">
                    <div className="w-12 h-12 rounded-sm bg-green-500/10 flex items-center justify-center shrink-0
                                    group-hover:bg-green-500 transition-colors duration-250">
                      <FaWhatsapp className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-green-600 mb-1.5">WhatsApp</p>
                      <p className="text-[15px] font-semibold text-charcoal-dark">+91 98765 43210</p>
                      <p className="text-[13px] text-charcoal-muted">Chat instantly</p>
                    </div>
                  </a>
                </div>

                {/* Email + Hours side by side */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <a href="mailto:info@fmwoodpackers.com"
                    className="group flex items-start gap-5 p-6 border border-gray-100 rounded-sm
                               hover:border-accent/40 hover:bg-[#FDFAF5] transition-all duration-250">
                    <div className="w-12 h-12 rounded-sm bg-primary/8 flex items-center justify-center shrink-0
                                    group-hover:bg-primary transition-colors duration-250">
                      <FaEnvelope className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent mb-1.5">Email</p>
                      <p className="text-[14px] font-semibold text-charcoal-dark">info@fmwoodpackers.com</p>
                      <p className="text-[13px] text-charcoal-muted">sales@fmwoodpackers.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-5 p-6 border border-gray-100 rounded-sm">
                    <div className="w-12 h-12 rounded-sm bg-primary/8 flex items-center justify-center shrink-0">
                      <FaClock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent mb-1.5">Hours</p>
                      <p className="text-[15px] font-semibold text-charcoal-dark">Mon – Sat</p>
                      <p className="text-[13px] text-charcoal-muted">9:00 AM – 7:00 PM</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* ISPM badge */}
              <div className="flex items-center gap-4 p-6 bg-[#1F2937] rounded-sm border border-white/5">
                <div className="w-11 h-11 rounded-sm bg-accent/20 flex items-center justify-center shrink-0">
                  <FaCheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-[12px] font-black uppercase tracking-[0.15em] text-accent">ISPM-15 Certified Facility</p>
                  <p className="text-[13px] text-white/45 mt-0.5">All packaging meets international phytosanitary standards</p>
                </div>
              </div>

            </div>

            {/* ══ RIGHT – Form ══ */}
            <div className="contact-right">
              <div className="border border-gray-100 rounded-sm shadow-[0_4px_40px_rgba(0,0,0,0.07)] overflow-hidden">

                {/* Form header */}
                <div className="bg-[#1F2937] px-8 md:px-10 py-7">
                  <h3 className="font-heading font-bold text-white text-xl mb-1">Send Us a Message</h3>
                  <p className="text-white/40 text-[13px]">We reply within 2 business hours — guaranteed.</p>
                </div>

                {/* Success */}
                {status === 'success' ? (
                  <div className="p-16 text-center bg-white">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h4 className="font-heading font-bold text-2xl text-charcoal-dark mb-3">Message Sent!</h4>
                    <p className="text-[15px] text-charcoal-muted max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out. Our packaging experts will contact you very shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 space-y-6">

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={lbl}>Full Name <span className="text-accent">*</span></label>
                        <input type="text" name="name" required
                          value={formData.name} onChange={handleChange}
                          placeholder="Affan Khan" className={inp} />
                      </div>
                      <div>
                        <label className={lbl}>Phone Number <span className="text-accent">*</span></label>
                        <input type="tel" name="phone" required
                          value={formData.phone} onChange={handleChange}
                          placeholder="+91 98765 43210" className={inp} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={lbl}>Email Address <span className="text-accent">*</span></label>
                        <input type="email" name="email" required
                          value={formData.email} onChange={handleChange}
                          placeholder="you@company.com" className={inp} />
                      </div>
                      <div>
                        <label className={lbl}>Company Name</label>
                        <input type="text" name="companyName"
                          value={formData.companyName} onChange={handleChange}
                          placeholder="Your Company Ltd." className={inp} />
                      </div>
                    </div>

                    <div>
                      <label className={lbl}>Service Required</label>
                      <select name="serviceRequired"
                        value={formData.serviceRequired} onChange={handleChange}
                        className={inp}>
                        <option value="">Select a service...</option>
                        <option>Wooden Pallets</option>
                        <option>Wooden Crates</option>
                        <option>Export Packaging</option>
                        <option>Industrial Packing</option>
                        <option>Machinery Packing</option>
                        <option>Container Stuffing</option>
                        <option>Other / Custom Requirement</option>
                      </select>
                    </div>

                    <div>
                      <label className={lbl}>Your Message <span className="text-accent">*</span></label>
                      <textarea name="message" required rows="5"
                        value={formData.message} onChange={handleChange}
                        placeholder="Describe your packaging requirement in detail..."
                        className={`${inp} resize-none`} />
                    </div>

                    {status === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-sm px-5 py-3">
                        <p className="text-red-600 text-[13px] font-medium">{errorMsg}</p>
                      </div>
                    )}

                    <button type="submit" disabled={status === 'loading'}
                      className="w-full btn-primary !py-5 !text-[13px] flex items-center justify-center gap-3">
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending your message...
                        </>
                      ) : (
                        <>
                          <FiSend className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-gray-400 text-center">
                      Your information is protected and never shared with third parties.
                    </p>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          GOOGLE MAP
      ════════════════════════════════ */}
      <section
        className="h-[500px] w-full relative cursor-pointer overflow-hidden border-t border-gray-100 group"
        onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Mumbra+Shilphata+Thane+Maharashtra', '_blank')}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.9959648937517!2d73.0378044758455!3d19.15168014959085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c02b9ee4e6f3%3A0xc0fb1df8a9a0f443!2sShilphata%2C%20Thane%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717584100000!5m2!1sen!2sin"
          width="100%" height="100%"
          style={{ border: 0, pointerEvents: 'none' }}
          allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale"
          title="FM Wood Packers Location"
        />
        <div className="absolute inset-0 bg-[#1F2937]/15 group-hover:bg-[#1F2937]/5 transition-colors duration-300" />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2
                        bg-[#1F2937] border border-white/10 rounded-sm px-8 py-4
                        flex items-center gap-4 shadow-2xl
                        group-hover:border-accent/60 group-hover:shadow-[0_0_30px_rgba(201,162,39,0.2)]
                        transition-all duration-300">
          <FaMapMarkerAlt className="text-accent w-5 h-5 shrink-0" />
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.18em] text-accent">Mumbra Shilphata Facility</p>
            <p className="text-[11px] text-white/40 mt-0.5">Thane, Maharashtra — Click to open in Google Maps</p>
          </div>
        </div>
      </section>

    </main>
  );
}
