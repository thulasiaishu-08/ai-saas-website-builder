import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: 'bi-lightning-charge-fill', title: 'Instant Generation', desc: 'Fill a form, get a fully functional website in seconds. No coding needed.', color: '#f59e0b' },
  { icon: 'bi-palette-fill', title: '3 Pro Templates', desc: 'Business, Portfolio, and Startup templates — each beautifully crafted.', color: '#6366f1' },
  { icon: 'bi-phone-fill', title: 'Fully Responsive', desc: 'Every generated site looks perfect on mobile, tablet, and desktop.', color: '#10b981' },
  { icon: 'bi-graph-up-arrow', title: 'Built-in Analytics', desc: 'Track visitor counts and contact requests right from your dashboard.', color: '#ef4444' },
  { icon: 'bi-envelope-fill', title: 'Contact Forms', desc: 'Every site comes with a working contact form. Messages delivered to your inbox.', color: '#8b5cf6' },
  { icon: 'bi-shield-check-fill', title: 'Secure & Fast', desc: 'JWT auth, bcrypt passwords, and optimized React rendering.', color: '#0ea5e9' },
];

const templates = [
  { name: 'Business', desc: 'Professional layout for established businesses and agencies', color: '#1d4ed8', bg: '#eff6ff', icon: 'bi-briefcase-fill' },
  { name: 'Portfolio', desc: 'Elegant showcase for creatives, freelancers, and artists', color: '#7e22ce', bg: '#fdf4ff', icon: 'bi-person-bounding-box' },
  { name: 'Startup', desc: 'Bold and energetic design for startups and new ventures', color: '#c2410c', bg: '#fff7ed', icon: 'bi-rocket-fill' },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Navbar */}
      <nav style={{ padding: '18px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontFamily: 'Syne, sans-serif', fontSize: '1rem' }}>S</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>SiteForge</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/login" style={{ color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>Sign In</Link>
          <Link to="/signup" className="btn-primary-custom" style={{ color: '#fff', padding: '9px 20px', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Get Started Free <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '100px 60px 80px', textAlign: 'center', background: 'linear-gradient(180deg, #f8faff 0%, #fff 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -50, right: -50, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e0e7ff', color: '#4338ca', padding: '6px 16px', borderRadius: 99, fontSize: '0.8rem', fontWeight: 600, marginBottom: 28 }}>
          <i className="bi bi-stars" /> AI-Powered Website Builder
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, marginBottom: 24, maxWidth: 780, margin: '0 auto 24px' }}>
          Build a Full Website in<br />
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>60 Seconds Flat</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Fill a simple business form and SiteForge generates a complete, professional, responsive website with your own domain-like URL.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/signup" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}>
            <i className="bi bi-rocket-fill" /> Start Building Free
          </Link>
          <Link to="/site/demo-business" style={{ background: '#fff', color: '#0f172a', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: '1rem', border: '1.5px solid #e2e8f0', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <i className="bi bi-eye" /> View Demo Site
          </Link>
        </div>
        <p style={{ marginTop: 20, fontSize: '0.8rem', color: '#94a3b8' }}>No credit card required · Free forever plan</p>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 60px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Everything You Need</h2>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>From authentication to analytics — SiteForge handles the full stack so you can focus on your business.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
          {features.map((f, i) => (
            <div key={i} style={{ padding: '28px', background: '#f8fafc', borderRadius: 16, border: '1px solid #e2e8f0', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <i className={`bi ${f.icon}`} style={{ color: f.color, fontSize: '1.3rem' }} />
              </div>
              <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 8, fontSize: '1rem' }}>{f.title}</h5>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section style={{ padding: '80px 60px', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.2rem', fontWeight: 800, marginBottom: 12 }}>3 Beautiful Templates</h2>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>Each template is a completely different design system.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto' }}>
          {templates.map((t, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', overflow: 'hidden', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ height: 100, background: `linear-gradient(135deg, ${t.color}22, ${t.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={`bi ${t.icon}`} style={{ color: t.color, fontSize: '2.5rem' }} />
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'inline-block', background: t.bg, color: t.color, padding: '3px 12px', borderRadius: 99, fontSize: '0.72rem', fontWeight: 700, marginBottom: 10 }}>{t.name}</div>
                <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 60px', textAlign: 'center', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: 16 }}>Ready to Launch Your Website?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', marginBottom: 36 }}>Join thousands of businesses already using SiteForge.</p>
        <Link to="/signup" style={{ background: '#fff', color: '#6366f1', padding: '15px 40px', borderRadius: 12, fontWeight: 800, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Syne, sans-serif' }}>
          Create Your Free Account <i className="bi bi-arrow-right" />
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: 'rgba(255,255,255,0.6)', padding: '32px 60px', textAlign: 'center', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '0.8rem' }}>S</div>
          <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>SiteForge</span>
        </div>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} SiteForge — AI SaaS Website Builder. Built with React, Node.js, MySQL & MongoDB.</p>
      </footer>
    </div>
  );
}
