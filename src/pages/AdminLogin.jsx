import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { FaShieldAlt } from 'react-icons/fa';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      if (data.success) {
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminData', JSON.stringify(data.data));
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1520] flex">

      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 bg-[#111827] border-r border-white/5 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

        {/* Logo */}
        <div className="flex items-center gap-4 relative z-10">
          <img src="/logo.png?v=2" alt="FM Wood Packers Logo" className="w-11 h-11 object-cover rounded-sm" />
          <div>
            <p className="font-heading font-bold text-white text-base">FM Wood Packers</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">Admin Portal</p>
          </div>
        </div>

        {/* Center text */}
        <div className="relative z-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold mb-4">Management System</p>
          <h1 className="font-heading font-extrabold text-4xl xl:text-5xl text-white leading-tight mb-6">
            Control Centre<br />
            <span className="text-gradient-gold">at Your Fingertips</span>
          </h1>
          <p className="text-white/40 text-[15px] leading-relaxed max-w-sm">
            Manage all enquiries, quote requests, and client data from one secure dashboard.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { label: 'Quote Requests', val: 'Live' },
              { label: 'Contact Enquiries', val: 'Live' },
              { label: 'Status Tracking', val: 'Yes' },
              { label: 'Email Alerts', val: 'Active' },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/8 rounded-sm p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-bold">{s.label}</p>
                <p className="font-heading font-bold text-accent text-sm mt-1">{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-[11px] text-white/20 relative z-10">
          © {new Date().getFullYear()} FM Wood Packers — Authorised Personnel Only
        </p>
      </div>

      {/* ── Right login panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #C9A227 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="w-full max-w-md relative z-10">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <img src="/logo.png?v=2" alt="FM Wood Packers Logo" className="w-10 h-10 object-cover rounded-sm" />
            <div>
              <p className="font-heading font-bold text-white text-sm">FM Wood Packers</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-accent font-bold">Admin Portal</p>
            </div>
          </div>

          {/* Card */}
          <div className="bg-[#111827] border border-white/8 rounded-sm overflow-hidden shadow-2xl">

            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-white/5">
              <div className="w-12 h-12 bg-accent/15 rounded-sm flex items-center justify-center mb-5">
                <FaShieldAlt className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-heading font-bold text-white text-2xl">Sign In</h2>
              <p className="text-white/35 text-[13px] mt-1">Access the FM Wood Packers admin panel</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="px-8 py-8 space-y-5">

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-sm px-4 py-3">
                  <p className="text-red-400 text-[13px] font-medium">{error}</p>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/40 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="admin@fmwoodpackers.com"
                    className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-4 py-3.5
                               text-white text-[14px] placeholder-white/20 outline-none
                               focus:border-accent/60 focus:bg-white/8 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/40 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type={showPw ? 'text' : 'password'} required
                    value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-sm pl-11 pr-12 py-3.5
                               text-white text-[14px] placeholder-white/20 outline-none
                               focus:border-accent/60 focus:bg-white/8 transition-all duration-200"
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-bold
                           text-[13px] uppercase tracking-[0.12em] py-4 rounded-sm
                           transition-all duration-250 hover:-translate-y-0.5
                           hover:shadow-[0_8px_24px_rgba(91,58,41,0.4)]
                           disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-2">
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                ) : (
                  <><FiLock className="w-4 h-4" /> Sign In to Dashboard</>
                )}
              </button>

            </form>

            {/* Footer */}
            <div className="px-8 pb-6">
              <p className="text-center text-[11px] text-white/20">
                Protected system — unauthorised access is prohibited
              </p>
            </div>
          </div>

          {/* Credentials hint */}
          <div className="mt-4 bg-accent/10 border border-accent/20 rounded-sm px-5 py-3 flex items-center gap-3">
            <FaShieldAlt className="w-4 h-4 text-accent shrink-0" />
            <p className="text-[12px] text-accent/80 font-medium">
              Default: admin@fmwoodpackers.com / admin123
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
