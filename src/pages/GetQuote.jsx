import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PageHero from '../components/PageHero';
import { FaCheckCircle } from 'react-icons/fa';
import { gsap } from 'gsap';

export default function GetQuote() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialService = queryParams.get('service') || '';

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    serviceType: initialService,
    quantity: '',
    packagingRequirements: '',
    deliveryLocation: '',
    additionalNotes: '',
  });

  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const containerRef = useRef(null);

  // Update service if URL changes
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await axios.post('/api/quotes', formData);
      setStatus('success');
      setFormData({
        name: '', companyName: '', phone: '', email: '', 
        serviceType: '', quantity: '', packagingRequirements: '', 
        deliveryLocation: '', additionalNotes: ''
      });
      setTimeout(() => setStatus('idle'), 8000);
    } catch (error) {
      setStatus('error');
      setErrorMsg(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.animate-quote-load',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-section min-h-screen pb-20">
      <PageHero
        title="Request a Free Quote"
        subtitle="Provide us with details about your packaging needs, and our experts will get back to you with a customized quotation."
        breadcrumb="Get Quote"
      />

      <div className="container-custom -mt-10 relative z-20 animate-quote-load">
        <div className="max-w-4xl mx-auto bg-white rounded-md shadow-xl border border-gray-150 p-8 md:p-12">
          
          {status === 'success' ? (
            <div className="py-16 text-center animate-fade-in">
              <FaCheckCircle className="w-20 h-20 text-wood mx-auto mb-6" />
              <h2 className="font-heading font-extrabold text-3xl text-charcoal mb-4">Quotation Request Received!</h2>
              <p className="text-charcoal-light/70 text-lg max-w-xl mx-auto">
                Thank you for choosing FM Wood Packers. Our packaging experts are reviewing your requirements and will contact you within 24 hours with a detailed quotation.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 btn-wood-outline"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-150">
                <span className="w-12 h-12 rounded-md bg-accent/10 text-accent flex items-center justify-center text-xl font-bold">📝</span>
                <div>
                  <h3 className="font-heading font-bold text-2xl text-charcoal">Quotation Form</h3>
                  <p className="text-xs text-charcoal-light/50 uppercase tracking-wider font-semibold">Fields marked with * are required.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Section 1: Contact Info */}
                <div>
                  <h4 className="font-heading font-bold text-sm text-wood uppercase tracking-wider mb-8 pb-3 border-b border-gray-100">1. Contact Information</h4>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal/80 uppercase tracking-widest mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="input-premium" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal/80 uppercase tracking-widest mb-1">Company Name</label>
                      <input 
                        type="text" 
                        name="companyName" 
                        value={formData.companyName} 
                        onChange={handleChange} 
                        className="input-premium" 
                        placeholder="Your Company Ltd." 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal/80 uppercase tracking-widest mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="input-premium" 
                        placeholder="john@example.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal/80 uppercase tracking-widest mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="input-premium" 
                        placeholder="+91 98765 43210" 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Project Details */}
                <div>
                  <h4 className="font-heading font-bold text-sm text-wood uppercase tracking-wider mb-8 pb-3 border-b border-gray-100">2. Packaging Requirements</h4>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal/80 uppercase tracking-widest mb-1">Service Type *</label>
                      <select 
                        name="serviceType" 
                        required 
                        value={formData.serviceType} 
                        onChange={handleChange} 
                        className="input-premium"
                      >
                        <option value="">Select Service...</option>
                        <option value="wooden-pallets">Wooden Pallets</option>
                        <option value="wooden-crates">Wooden Crates</option>
                        <option value="export-packaging">Export Packaging</option>
                        <option value="industrial-packing">Industrial Packing</option>
                        <option value="machinery-packing">Machinery Packing</option>
                        <option value="container-stuffing">Container Stuffing</option>
                        <option value="custom-packaging">Custom Packaging</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal/80 uppercase tracking-widest mb-1">Estimated Quantity/Volume</label>
                      <input 
                        type="text" 
                        name="quantity" 
                        value={formData.quantity} 
                        onChange={handleChange} 
                        className="input-premium" 
                        placeholder="e.g. 500 Pallets, 1 Machine" 
                      />
                    </div>
                  </div>
                  <div className="mb-8">
                    <label className="block text-[11px] font-bold text-charcoal/80 uppercase tracking-widest mb-1">Delivery/Service Location</label>
                    <input 
                      type="text" 
                      name="deliveryLocation" 
                      value={formData.deliveryLocation} 
                      onChange={handleChange} 
                      className="input-premium" 
                      placeholder="City, State, Zip Code" 
                    />
                  </div>
                  <div className="mb-8">
                    <label className="block text-[11px] font-bold text-charcoal/80 uppercase tracking-widest mb-1">Detailed Requirements</label>
                    <textarea 
                      name="packagingRequirements" 
                      rows="3" 
                      value={formData.packagingRequirements} 
                      onChange={handleChange} 
                      className="input-premium resize-none" 
                      placeholder="Describe the item dimensions, weight, fragility, ISPM-15 needs, etc."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-charcoal/80 uppercase tracking-widest mb-1">Additional Notes (Optional)</label>
                    <textarea 
                      name="additionalNotes" 
                      rows="2" 
                      value={formData.additionalNotes} 
                      onChange={handleChange} 
                      className="input-premium resize-none" 
                      placeholder="Any timelines, budgets, or special instructions?"
                    ></textarea>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm font-medium border border-red-100">
                    {errorMsg}
                  </div>
                )}

                <div className="pt-8 border-t border-gray-150">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full md:w-auto btn-wood-primary"
                  >
                    {status === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      'Submit Quotation Request'
                    )}
                  </button>
                  <p className="text-xxs text-charcoal-light/50 mt-4 uppercase tracking-wider font-semibold">
                    By submitting this form, you agree to our privacy policy. We protect your data and never share it with third parties.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

