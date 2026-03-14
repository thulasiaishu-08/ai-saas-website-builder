import React, { useState } from 'react';
import { API_URL } from '../../services/api';
import api from '../../services/api';

export default function StartupTemplate({ site }) {
  const primary = site.colorScheme?.primary || '#ea580c';
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
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0f172a' }}>
      {/* Nav */}
      <nav style={{ padding: '16px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {logoSrc ? <img src={logoSrc} alt="logo" style={{ height: 36, objectFit: 'contain', borderRadius: 8 }} /> : (
            <div style={{ width: 36, height: 36, borderRadius: 8, background: primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontFamily: 'Syne, sans-serif', fontSize: '1rem' }}>
              {site.siteName.charAt(0)}
            </div>
          )}
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>{site.siteName}</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Product', 'Features', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>{item}</a>
          ))}
          <a href="#contact" style={{ background: primary, color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none' }}>Get Started →</a>
        </div>
      </nav>

      {/* Hero — bold startup */}
      <section id="product" style={{ padding: '100px 60px 80px', background: `linear-gradient(160deg, #0f172a 0%, ${primary}88 100%)`, color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {logoSrc && <img src={logoSrc} alt="logo" style={{ height: 64, marginBottom: 28, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />}

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '7px 18px', borderRadius: 99, fontSize: '0.78rem', fontWeight: 700, marginBottom: 28, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          🚀 Now Available — Join the Waitlist
        </div>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.04em', maxWidth: 800 }}>
          {site.siteName} <span style={{ color: primary, WebkitTextStroke: '0px', filter: 'brightness(1.4)' }}>Changes Everything</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)', maxWidth: 580, lineHeight: 1.75, marginBottom: 44 }}>
          {site.description}
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" style={{ background: primary, color: '#fff', padding: '15px 36px', borderRadius: 12, fontWeight: 800, fontSize: '1rem', textDecoration: 'none', boxShadow: `0 8px 28px ${primary}60` }}>
            Start for Free 🚀
          </a>
          <a href="#features" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '15px 36px', borderRadius: 12, fontWeight: 700, fontSize: '1rem', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
            See Features →
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, marginTop: 64, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ v: '10K+', l: 'Users' }, { v: '99.9%', l: 'Uptime' }, { v: '5★', l: 'Rating' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '2rem', color: '#fff' }}>{s.v}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      {site.services?.length > 0 && (
        <section id="features" style={{ padding: '80px 60px', background: '#fff' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Features</span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 900, marginTop: 8 }}>Why Choose {site.siteName}?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
            {site.services.map((svc, i) => {
              const emojis = ['⚡', '🎯', '🔒', '📊', '🤝', '💡', '🚀', '✨'];
              return (
                <div key={i} style={{ padding: 28, borderRadius: 16, border: '1px solid #f1f5f9', transition: 'all 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${primary}40`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${primary}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.border = '1px solid #f1f5f9'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <div style={{ fontSize: '2rem', marginBottom: 16 }}>{emojis[i % emojis.length]}</div>
                  <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', marginBottom: 8 }}>{svc}</h5>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0, lineHeight: 1.6 }}>
                    Industry-leading {svc.toLowerCase()} capabilities built for scale and performance.
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* About CTA */}
      <section style={{ padding: '80px 60px', background: `linear-gradient(135deg, ${primary}10, ${primary}05)` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.4rem', fontWeight: 900, marginBottom: 20 }}>About {site.siteName}</h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.8, marginBottom: 36 }}>{site.description}</p>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: primary, color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 800, fontSize: '1rem', textDecoration: 'none' }}>
            Join {site.siteName} Today →
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '80px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: primary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact</span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 900, marginTop: 8 }}>Get in Touch</h2>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
              {[{ icon: '📞', v: site.contact?.phone }, { icon: '📧', v: site.contact?.email }, { icon: '📍', v: site.contact?.address }].filter(c => c.v).map((c, i) => (
                <span key={i} style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>{c.icon} {c.v}</span>
              ))}
            </div>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: 48, background: '#f0fdf4', borderRadius: 20, border: '1px solid #bbf7d0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
              <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#166534', fontSize: '1.3rem' }}>You're on the list!</h5>
              <p style={{ color: '#4ade80' }}>We'll be in touch very soon.</p>
              <button onClick={() => setSent(false)} style={{ background: '#166534', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 700, marginTop: 8 }}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleContact} style={{ background: '#f8fafc', padding: 36, borderRadius: 20, border: '1px solid #e2e8f0' }}>
              {contactError && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: '0.85rem' }}>{contactError}</div>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {[{ key: 'name', label: 'Name', type: 'text' }, { key: 'email', label: 'Email', type: 'email' }].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>{f.label}</label>
                    <input type={f.type} value={contactForm[f.key]} onChange={e => setContactForm({ ...contactForm, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontFamily: 'inherit', fontSize: '0.88rem', outline: 'none', background: '#fff' }}
                      onFocus={e => e.target.style.borderColor = primary}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      required />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 6, color: '#334155' }}>Message</label>
                <textarea value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={4} style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontFamily: 'inherit', fontSize: '0.88rem', resize: 'vertical', outline: 'none', background: '#fff' }}
                  onFocus={e => e.target.style.borderColor = primary}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  required />
              </div>
              <button type="submit" disabled={sending} style={{ width: '100%', background: `linear-gradient(135deg, ${primary}, ${primary}cc)`, color: '#fff', border: 'none', borderRadius: 12, padding: '14px', fontWeight: 800, cursor: 'pointer', fontSize: '1rem', boxShadow: `0 4px 16px ${primary}40`, opacity: sending ? 0.7 : 1 }}>
                {sending ? 'Sending...' : '🚀 Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer style={{ background: '#0f172a', padding: '28px 60px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
        <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 800, marginRight: 12 }}>{site.siteName}</span>
        © {new Date().getFullYear()} · Powered by SiteForge
      </footer>
    </div>
  );
}
