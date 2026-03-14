import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicSite } from '../services/siteService';
import BusinessTemplate from '../components/templates/BusinessTemplate';
import PortfolioTemplate from '../components/templates/PortfolioTemplate';
import StartupTemplate from '../components/templates/StartupTemplate';

const TEMPLATES = {
  business: BusinessTemplate,
  portfolio: PortfolioTemplate,
  startup: StartupTemplate,
};

export default function GeneratedSitePage() {
  const { slug } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPublicSite(slug)
      .then(({ data }) => setSite(data.site))
      .catch(() => setError('Site not found or not published.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" style={{ margin: '0 auto 16px' }} />
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading your website...</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif', background: '#f8fafc' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem' }}>🔍</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.6rem', marginBottom: 12 }}>Site Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: 28 }}>{error}</p>
        <Link to="/" style={{ background: '#6366f1', color: '#fff', padding: '12px 28px', borderRadius: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          ← Back to SiteForge
        </Link>
      </div>
    </div>
  );

  const TemplateComponent = TEMPLATES[site.template] || TEMPLATES.business;

  return (
    <>
      {/* SiteForge badge */}
      <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(15,23,42,0.85)', color: '#fff', padding: '7px 14px', borderRadius: 99, fontSize: '0.74rem', fontWeight: 700, backdropFilter: 'blur(12px)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
          <div style={{ width: 16, height: 16, borderRadius: 4, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 900 }}>S</div>
          Made with SiteForge
        </Link>
      </div>
      <TemplateComponent site={site} />
    </>
  );
}
