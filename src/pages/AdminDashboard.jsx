import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaUsers, FaClipboardList, FaSignOutAlt, FaTrash,
  FaSearch, FaEnvelope, FaBuilding, FaPhone,
  FaCheckCircle, FaChartBar,
} from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

/* ── helpers ────────────────────────────────────────────────────── */
const STATUS_COLORS = {
  pending:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  new:       'bg-blue-500/15 text-blue-400 border-blue-500/20',
  reviewed:  'bg-purple-500/15 text-purple-400 border-purple-500/20',
  read:      'bg-purple-500/15 text-purple-400 border-purple-500/20',
  quoted:    'bg-green-500/15 text-green-400 border-green-500/20',
  completed: 'bg-gray-500/15 text-gray-400 border-gray-500/20',
  responded: 'bg-green-500/15 text-green-400 border-green-500/20',
};

const statusCls = (s) => STATUS_COLORS[s] || 'bg-gray-500/15 text-gray-400 border-gray-500/20';

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const fmtFull = (d) => new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

/* ── component ──────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const navigate  = useNavigate();
  const [tab,     setTab]     = useState('dashboard');
  const [stats,   setStats]   = useState(null);
  const [quotes,  setQuotes]  = useState([]);
  const [contacts,setContacts]= useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [sidebar, setSidebar] = useState(false);
  const [expanded,setExpanded]= useState(null); // expanded row id

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin/login'); return; }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [s, q, c] = await Promise.all([
        axios.get('/api/analytics'),
        axios.get('/api/quotes'),
        axios.get('/api/contacts'),
      ]);
      setStats(s.data.data);
      setQuotes(q.data.data);
      setContacts(c.data.data);
    } catch (e) {
      if (e.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin/login');
  };

  const updateStatus = async (type, id, status) => {
    await axios.patch(`/api/${type}/${id}/status`, { status });
    if (type === 'quotes')   setQuotes(prev  => prev.map(x => x._id === id ? { ...x, status } : x));
    else                     setContacts(prev => prev.map(x => x._id === id ? { ...x, status } : x));
  };

  const del = async (type, id) => {
    if (!window.confirm('Delete this record permanently?')) return;
    await axios.delete(`/api/${type}/${id}`);
    if (type === 'quotes')   setQuotes(prev  => prev.filter(x => x._id !== id));
    else                     setContacts(prev => prev.filter(x => x._id !== id));
    fetchAll();
  };

  const fQ = quotes.filter(q =>
    [q.name, q.email, q.companyName, q.serviceType].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );
  const fC = contacts.filter(c =>
    [c.name, c.email, c.companyName].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  /* ── nav items ── */
  const NAV = [
    { id: 'dashboard', label: 'Dashboard',         icon: FaChartBar,      badge: null },
    { id: 'quotes',    label: 'Quote Requests',    icon: FaClipboardList, badge: stats?.pendingQuotes },
    { id: 'contacts',  label: 'Contact Enquiries', icon: FaUsers,         badge: stats?.newContacts },
  ];

  /* ── Sidebar ── */
  const Sidebar = () => (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0D1520] border-r border-white/5
      flex flex-col transition-transform duration-300
      ${sidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="font-heading font-black text-accent text-xs">FM</span>
          </div>
          <div>
            <p className="font-heading font-bold text-white text-sm">FM Wood Packers</p>
            <p className="text-[9px] uppercase tracking-[0.18em] text-accent font-bold">Admin Panel</p>
          </div>
        </div>
        <button onClick={() => setSidebar(false)} className="lg:hidden text-white/30 hover:text-white">
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ id, label, icon: Icon, badge }) => (
          <button key={id} onClick={() => { setTab(id); setSidebar(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-[13px] font-bold transition-all duration-200 ${
              tab === id
                ? 'bg-primary text-white'
                : 'text-white/40 hover:bg-white/5 hover:text-white'
            }`}>
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">{label}</span>
            {badge > 0 && (
              <span className="w-5 h-5 rounded-full bg-accent text-[#111827] text-[10px] font-black flex items-center justify-center">
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/5">
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-[13px] font-bold text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all">
          <FaSignOutAlt className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-[#0D1520] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-white/10 border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/30 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1520] flex text-white">
      <Sidebar />

      {/* Overlay for mobile */}
      {sidebar && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebar(false)} />}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="bg-[#111827] border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebar(true)} className="lg:hidden text-white/40 hover:text-white">
            <FiMenu className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <h1 className="font-heading font-bold text-white text-lg capitalize">
              {tab === 'dashboard' ? 'Overview' : tab === 'quotes' ? 'Quote Requests' : 'Contact Enquiries'}
            </h1>
          </div>

          {/* Search */}
          {tab !== 'dashboard' && (
            <div className="relative hidden sm:block">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
              <input
                type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-2.5 text-[13px] text-white
                           placeholder-white/20 outline-none focus:border-accent/40 w-56 transition-all"
              />
            </div>
          )}

          {/* Admin badge */}
          <div className="flex items-center gap-2 pl-4 border-l border-white/5">
            <div className="w-8 h-8 bg-primary/30 rounded-sm flex items-center justify-center">
              <span className="font-heading font-bold text-accent text-xs">A</span>
            </div>
            <span className="text-[12px] text-white/40 hidden sm:block">Admin</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">

          {/* ── DASHBOARD TAB ── */}
          {tab === 'dashboard' && (
            <div className="space-y-8">

              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Quotes',    value: stats?.totalQuotes   || 0, color: 'text-blue-400',   bg: 'bg-blue-500/10',   icon: FaClipboardList },
                  { label: 'Pending Quotes',  value: stats?.pendingQuotes || 0, color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: FaClipboardList },
                  { label: 'Total Contacts',  value: stats?.totalContacts || 0, color: 'text-green-400',  bg: 'bg-green-500/10',  icon: FaUsers },
                  { label: 'New Contacts',    value: stats?.newContacts   || 0, color: 'text-accent',     bg: 'bg-accent/10',     icon: FaEnvelope },
                ].map((s, i) => (
                  <div key={i} className="bg-[#111827] border border-white/5 rounded-sm p-5">
                    <div className={`w-10 h-10 ${s.bg} rounded-sm flex items-center justify-center mb-4`}>
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                    </div>
                    <p className={`font-heading font-black text-3xl ${s.color} mb-1`}>{s.value}</p>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-white/30 font-bold">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent tables */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Quotes */}
                <div className="bg-[#111827] border border-white/5 rounded-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-heading font-bold text-white text-sm">Recent Quotes</h3>
                    <button onClick={() => setTab('quotes')} className="text-[11px] text-accent hover:text-accent-light font-bold uppercase tracking-wider">
                      View All →
                    </button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {(stats?.recentQuotes || []).slice(0, 5).map(q => (
                      <div key={q._id} className="px-6 py-3.5 flex items-center justify-between hover:bg-white/3 transition-colors">
                        <div>
                          <p className="text-[13px] font-semibold text-white">{q.name}</p>
                          <p className="text-[11px] text-white/35 capitalize">{q.serviceType?.replace('-', ' ')}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border ${statusCls(q.status)}`}>
                          {q.status}
                        </span>
                      </div>
                    ))}
                    {!stats?.recentQuotes?.length && (
                      <p className="px-6 py-8 text-center text-white/20 text-sm">No quotes yet</p>
                    )}
                  </div>
                </div>

                {/* Recent Contacts */}
                <div className="bg-[#111827] border border-white/5 rounded-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-heading font-bold text-white text-sm">Recent Enquiries</h3>
                    <button onClick={() => setTab('contacts')} className="text-[11px] text-accent hover:text-accent-light font-bold uppercase tracking-wider">
                      View All →
                    </button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {(stats?.recentContacts || []).slice(0, 5).map(c => (
                      <div key={c._id} className="px-6 py-3.5 flex items-center justify-between hover:bg-white/3 transition-colors">
                        <div className="min-w-0 flex-1 mr-3">
                          <p className="text-[13px] font-semibold text-white">{c.name}</p>
                          <p className="text-[11px] text-white/35 truncate">{c.message}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border shrink-0 ${statusCls(c.status)}`}>
                          {c.status}
                        </span>
                      </div>
                    ))}
                    {!stats?.recentContacts?.length && (
                      <p className="px-6 py-8 text-center text-white/20 text-sm">No contacts yet</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ── QUOTES TAB ── */}
          {tab === 'quotes' && (
            <div className="space-y-4">
              <p className="text-[12px] text-white/25">{fQ.length} record{fQ.length !== 1 ? 's' : ''} found</p>
              <div className="bg-[#111827] border border-white/5 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-white/5">
                        {['Client', 'Service', 'Requirements', 'Date', 'Status', ''].map(h => (
                          <th key={h} className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-white/25">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {fQ.map(q => (
                        <>
                          <tr key={q._id} className="hover:bg-white/3 transition-colors cursor-pointer"
                              onClick={() => setExpanded(expanded === q._id ? null : q._id)}>
                            <td className="px-5 py-4">
                              <p className="font-semibold text-white">{q.name}</p>
                              {q.companyName && <p className="text-white/35 text-[11px] flex items-center gap-1 mt-0.5"><FaBuilding className="w-2.5 h-2.5" />{q.companyName}</p>}
                              <p className="text-white/30 text-[11px] flex items-center gap-1 mt-0.5"><FaEnvelope className="w-2.5 h-2.5" />{q.email}</p>
                              <p className="text-white/30 text-[11px] flex items-center gap-1"><FaPhone className="w-2.5 h-2.5" />{q.phone}</p>
                            </td>
                            <td className="px-5 py-4">
                              <span className="bg-primary/20 text-primary-light text-[11px] font-bold px-2.5 py-1 rounded-sm capitalize">
                                {q.serviceType?.replace(/-/g, ' ')}
                              </span>
                              {q.quantity && <p className="text-white/35 text-[11px] mt-1.5">Qty: {q.quantity}</p>}
                              {q.deliveryLocation && <p className="text-white/25 text-[11px]">Loc: {q.deliveryLocation}</p>}
                            </td>
                            <td className="px-5 py-4 max-w-[200px]">
                              <p className="text-white/45 text-[12px] line-clamp-2">{q.packagingRequirements || '—'}</p>
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <p className="text-white/35 text-[11px]">{fmt(q.createdAt)}</p>
                            </td>
                            <td className="px-5 py-4">
                              <select value={q.status}
                                onChange={e => { e.stopPropagation(); updateStatus('quotes', q._id, e.target.value); }}
                                onClick={e => e.stopPropagation()}
                                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm border outline-none cursor-pointer bg-transparent ${statusCls(q.status)}`}>
                                <option value="pending">Pending</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="quoted">Quoted</option>
                                <option value="completed">Completed</option>
                              </select>
                            </td>
                            <td className="px-5 py-4">
                              <button onClick={e => { e.stopPropagation(); del('quotes', q._id); }}
                                className="w-8 h-8 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors">
                                <FaTrash className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                          {/* Expanded notes row */}
                          {expanded === q._id && q.additionalNotes && (
                            <tr className="bg-white/2">
                              <td colSpan={6} className="px-5 py-3 text-[12px] text-white/40 italic border-b border-white/5">
                                <span className="text-accent font-bold not-italic">Notes: </span>{q.additionalNotes}
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                  {!fQ.length && <p className="px-6 py-12 text-center text-white/20">No quote requests found.</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── CONTACTS TAB ── */}
          {tab === 'contacts' && (
            <div className="space-y-4">
              <p className="text-[12px] text-white/25">{fC.length} record{fC.length !== 1 ? 's' : ''} found</p>
              <div className="bg-[#111827] border border-white/5 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-white/5">
                        {['Sender', 'Service', 'Message', 'Received', 'Status', ''].map(h => (
                          <th key={h} className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-white/25">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {fC.map(c => (
                        <tr key={c._id} className="hover:bg-white/3 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-semibold text-white">{c.name}</p>
                            {c.companyName && <p className="text-white/35 text-[11px] flex items-center gap-1 mt-0.5"><FaBuilding className="w-2.5 h-2.5" />{c.companyName}</p>}
                            <p className="text-white/30 text-[11px] flex items-center gap-1 mt-0.5"><FaEnvelope className="w-2.5 h-2.5" />{c.email}</p>
                            <p className="text-white/30 text-[11px] flex items-center gap-1"><FaPhone className="w-2.5 h-2.5" />{c.phone}</p>
                          </td>
                          <td className="px-5 py-4">
                            {c.serviceRequired
                              ? <span className="bg-primary/20 text-primary-light text-[11px] font-bold px-2.5 py-1 rounded-sm">{c.serviceRequired}</span>
                              : <span className="text-white/20 text-[11px]">—</span>}
                          </td>
                          <td className="px-5 py-4 max-w-[280px]">
                            <p className="text-white/55 text-[12px] leading-relaxed line-clamp-3">{c.message}</p>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <p className="text-white/35 text-[11px]">{fmtFull(c.createdAt)}</p>
                          </td>
                          <td className="px-5 py-4">
                            <select value={c.status}
                              onChange={e => updateStatus('contacts', c._id, e.target.value)}
                              className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm border outline-none cursor-pointer bg-transparent ${statusCls(c.status)}`}>
                              <option value="new">New</option>
                              <option value="read">Read</option>
                              <option value="responded">Responded</option>
                            </select>
                          </td>
                          <td className="px-5 py-4">
                            <button onClick={() => del('contacts', c._id)}
                              className="w-8 h-8 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors">
                              <FaTrash className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!fC.length && <p className="px-6 py-12 text-center text-white/20">No contact enquiries found.</p>}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
