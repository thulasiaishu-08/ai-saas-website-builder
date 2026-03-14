import React, { useState } from 'react';
import { API_URL } from '../../services/api';
import api from '../../services/api';

export default function BusinessTemplate({ site }) {
  const primary = site.colorScheme?.primary || '#1d4ed8';
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleContact = async (e) => {
    e.preventDefault();
    setSending(true); setContactError('');
    try {
      await api.post('/contact', { ...contactForm, siteSlug: site.slug });
      setSent(true);
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setContactError(err.response?.data?.message || 'Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const logoSrc = site.logo ? `${API_URL}${site.logo}` : null;

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#0f172a' }}>
      {/* Navbar */}
      <nav style={{ background: '#fff', padding: '16px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {logoSrc && <img src={logoSrc} alt="logo" style={{ height: 40, width: 40, objectFit: 'contain', borderRadius: 8 }} />}
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: primary }}>{site.siteName}</span>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['Home', 'Services', 'About', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748b', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = primary}
              onMouseLeave={e => e.target.style.color = '#64748b'}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="home" style={{ padding: '100px 60px 80px', background: `linear-gradient(135deg, ${primary}12, ${primary}05)`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: `${primary}10` }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: `${primary}08` }} />
        {logoSrc && <img src={logoSrc} alt="logo" style={{ height: 72, marginBottom: 24, objectFit: 'contain' }} />}
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 20, color: '#0f172a' }}>{site.siteName}</h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: 600, margin: '0 auto 36px', lineHeight: 1.7 }}>{site.description}</p>
        <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: primary, color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: `0 6px 20px ${primary}40` }}>
          Get In Touch <span>→</span>
        </a>
      </section>

      {/* Services */}
      {site.services?.length > 0 && (
        <section id="services" style={{ padding: '80px 60px', background: '#fff' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>Our Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
            {site.services.map((svc, i) => (
              <div key={i} style={{ padding: 28, background: '#f8fafc', borderRadius: 16, border: `1px solid #e2e8f0`, borderTop: `3px solid ${primary}`, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <span style={{ color: primary, fontSize: '1.2rem', fontWeight: 800 }}>{i + 1}</span>
                </div>
                <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 8, fontSize: '1rem' }}>{svc}</h5>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Professional {svc.toLowerCase()} services tailored to your needs.</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      <section id="about" style={{ padding: '80px 60px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: 20 }}>About {site.siteName}</h2>
            <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 24 }}>{site.description}</p>
            {[
              { label: 'Professional', icon: '⭐' },
              { label: 'Reliable', icon: '🛡️' },
              { label: 'Expert Team', icon: '👥' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: '0.9rem', fontWeight: 600 }}>
                <span>{item.icon}</span> {item.label}
              </div>
            ))}
          </div>
          <div style={{ background: `linear-gradient(135deg, ${primary}18, ${primary}30)`, borderRadius: 20, padding: 40, textAlign: 'center' }}>
            {logoSrc ? (
              <img src={logoSrc} alt="logo" style={{ maxWidth: '100%', maxHeight: 160, objectFit: 'contain' }} />
            ) : (
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '3rem', fontWeight: 900, color: primary }}>
                {site.siteName.charAt(0)}
              </div>
            )}
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: primary, marginTop: 16 }}>{site.siteName}</h3>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '80px 60px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: 20 }}>Get In Touch</h2>
            <p style={{ color: '#64748b', marginBottom: 32, lineHeight: 1.7 }}>Have a question or want to work together? We'd love to hear from you.</p>
            {[
              { icon: '📞', label: 'Phone', value: site.contact?.phone },
              { icon: '📧', label: 'Email', value: site.contact?.email },
              { icon: '📍', label: 'Address', value: site.contact?.address },
            ].filter(c => c.value).map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: `${primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.1rem' }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            {sent ? (
              <div style={{ textAlign: 'center', padding: 40, background: '#f0fdf4', borderRadius: 16 }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#166534' }}>Message Sent!</h5>
                <p style={{ color: '#4ade80', marginBottom: 16 }}>We'll get back to you soon.</p>
                <button onClick={() => setSent(false)} style={{ background: '#166534', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 600 }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleContact} style={{ background: '#f8fafc', padding: 28, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 20 }}>Send a Message</h5>
                {contactError && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: '0.85rem' }}>{contactError}</div>}
                {[{ key: 'name', label: 'Your Name', type: 'text' }, { key: 'email', label: 'Email Address', type: 'email' }].map(f => (
                  <div key={f.key} style={{ marginBottom: 14 }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 5, color: '#334155' }}>{f.label}</label>
                    <input type={f.type} value={contactForm[f.key]} onChange={e => setContactForm({ ...contactForm, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontFamily: 'inherit', fontSize: '0.88rem', outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = primary}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      required />
                  </div>
                ))}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 5, color: '#334155' }}>Message</label>
                  <textarea value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={4} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontFamily: 'inherit', fontSize: '0.88rem', resize: 'vertical', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = primary}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    required />
                </div>
                <button type="submit" disabled={sending} style={{ width: '100%', background: primary, color: '#fff', border: 'none', borderRadius: 10, padding: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '0.92rem', opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: 'rgba(255,255,255,0.7)', padding: '32px 60px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: 8 }}>{site.siteName}</div>
        <p style={{ margin: '0 0 8px', fontSize: '0.85rem' }}>{site.description?.substring(0, 100)}{site.description?.length > 100 ? '...' : ''}</p>
        <p style={{ margin: 0, fontSize: '0.78rem', opacity: 0.5 }}>© {new Date().getFullYear()} {site.siteName}. Powered by SiteForge.</p>
      </footer>
    </div>
  );
}
