import React, { useState } from 'react';
import { API_URL } from '../../services/api';
import api from '../../services/api';

export default function PortfolioTemplate({ site }) {
  const primary = site.colorScheme?.primary || '#7e22ce';
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [contactError, setContactError] = useState('');
  const logoSrc = site.logo ? `${API_URL}${site.logo}` : null;

  const handleContact = async (e) => {
    e.preventDefault();
    setSending(true); setContactError('');
    try {
      await api.post('/contact', { ...contactForm, siteSlug: site.slug });
      setSent(true);
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setContactError(err.response?.data?.message || 'Failed to send.');
    } finally { setSending(false); }
  };

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', background: '#fafafa', color: '#0f172a' }}>
      {/* Minimal Nav */}
      <nav style={{ padding: '20px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, mixBlendMode: 'normal' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {logoSrc && <img src={logoSrc} alt="logo" style={{ height: 32, width: 32, objectFit: 'contain', borderRadius: '50%' }} />}
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>{site.siteName}</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Work', 'About', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = primary}
              onMouseLeave={e => e.target.style.color = '#64748b'}>{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero — asymmetric */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 80px 80px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', background: `linear-gradient(135deg, ${primary}08, ${primary}18)`, clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)' }} />
        <div style={{ maxWidth: 600, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${primary}12`, color: primary, padding: '6px 16px', borderRadius: 99, fontSize: '0.78rem', fontWeight: 700, marginBottom: 28, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            ✦ Available for Work
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.03em' }}>
            {site.siteName}
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.75, marginBottom: 40, maxWidth: 520 }}>{site.description}</p>
          <div style={{ display: 'flex', gap: 14 }}>
            <a href="#work" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: primary, color: '#fff', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none' }}>
              View My Work →
            </a>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#0f172a', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: '0.92rem', border: '1.5px solid #e2e8f0', textDecoration: 'none' }}>
              Hire Me
            </a>
          </div>
        </div>
        {logoSrc && (
          <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
            <div style={{ width: 240, height: 240, borderRadius: '50%', background: `${primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${primary}30` }}>
              <img src={logoSrc} alt="logo" style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: '50%' }} />
            </div>
          </div>
        )}
      </section>

      {/* Services as "Work" grid */}
      {site.services?.length > 0 && (
        <section id="work" style={{ padding: '80px 80px', background: '#fafafa' }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>What I Do</span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 800, marginTop: 8 }}>Services & Skills</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
            {site.services.map((svc, i) => (
              <div key={i} style={{ padding: '32px 28px', background: '#fff', border: '1px solid #e2e8f0', transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.background = primary; e.currentTarget.querySelector('.svc-title').style.color = '#fff'; e.currentTarget.querySelector('.svc-num').style.color = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.querySelector('.svc-title').style.color = '#0f172a'; e.currentTarget.querySelector('.svc-num').style.color = `${primary}60`; }}>
                <div className="svc-num" style={{ fontSize: '2.5rem', fontFamily: 'Syne, sans-serif', fontWeight: 900, color: `${primary}60`, lineHeight: 1, marginBottom: 16 }}>0{i + 1}</div>
                <div className="svc-title" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{svc}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      <section id="about" style={{ padding: '80px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>About Me</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 800, marginTop: 8, marginBottom: 24 }}>My Story</h2>
          <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.85 }}>{site.description}</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '80px 80px', background: '#0f172a', color: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Let's Talk</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', fontWeight: 900, marginTop: 8, marginBottom: 12 }}>Start a Project</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 48, fontSize: '1rem' }}>Ready to bring your ideas to life? Reach out.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              {[{ icon: '📞', v: site.contact?.phone }, { icon: '📧', v: site.contact?.email }, { icon: '📍', v: site.contact?.address }].filter(c => c.v).map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
                  <span>{c.icon}</span> {c.v}
                </div>
              ))}
            </div>

            {sent ? (
              <div style={{ textAlign: 'center', padding: 32, background: 'rgba(255,255,255,0.06)', borderRadius: 16 }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
                <p style={{ color: '#a3e635', fontWeight: 600 }}>Message sent! I'll respond soon.</p>
                <button onClick={() => setSent(false)} style={{ background: primary, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 600 }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleContact}>
                {contactError && <div style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: '0.85rem' }}>{contactError}</div>}
                {[{ key: 'name', label: 'Name', type: 'text' }, { key: 'email', label: 'Email', type: 'email' }].map(f => (
                  <div key={f.key} style={{ marginBottom: 14 }}>
                    <input type={f.type} placeholder={f.label} value={contactForm[f.key]} onChange={e => setContactForm({ ...contactForm, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '11px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'inherit', fontSize: '0.88rem', outline: 'none' }}
                      required />
                  </div>
                ))}
                <textarea placeholder="Tell me about your project..." value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={4} style={{ width: '100%', padding: '11px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'inherit', fontSize: '0.88rem', resize: 'vertical', outline: 'none', marginBottom: 16 }}
                  required />
                <button type="submit" disabled={sending} style={{ background: primary, color: '#fff', border: 'none', borderRadius: 10, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: '0.92rem', width: '100%', opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer style={{ background: '#0a0f1e', padding: '24px 80px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
        © {new Date().getFullYear()} {site.siteName} · Built with SiteForge
      </footer>
    </div>
  );
}
