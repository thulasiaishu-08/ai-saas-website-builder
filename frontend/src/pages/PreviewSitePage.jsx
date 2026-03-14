import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { getSite } from '../services/siteService';

export default function PreviewSitePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('desktop');

  useEffect(() => {
    getSite(id)
      .then(({ data }) => setSite(data.site))
      .catch(() => navigate('/dashboard'))
      .finally(() => setLoading(false));
  }, [id]);

  const widths = { desktop: '100%', tablet: '768px', mobile: '375px' };

  if (loading) return (
    <DashboardLayout title="Preview">
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title={`Preview: ${site?.siteName}`}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => navigate('/dashboard')} className="btn-outline-custom" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
            <i className="bi bi-arrow-left" /> Dashboard
          </button>
          <button onClick={() => navigate(`/dashboard/edit/${id}`)} className="btn-primary-custom" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
            <i className="bi bi-pencil" /> Edit
          </button>
          <button onClick={() => window.open(`/site/${site?.slug}`, '_blank')} style={{ padding: '8px 16px', borderRadius: 8, background: '#f0fdf4', color: '#166534', border: '1.5px solid #bbf7d0', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="bi bi-box-arrow-up-right" /> Open Live
          </button>
        </div>

        {/* Device toggles */}
        <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', padding: 4, borderRadius: 10 }}>
          {[
            { key: 'desktop', icon: 'bi-display', label: 'Desktop' },
            { key: 'tablet', icon: 'bi-tablet', label: 'Tablet' },
            { key: 'mobile', icon: 'bi-phone', label: 'Mobile' },
          ].map(d => (
            <button key={d.key} onClick={() => setViewMode(d.key)} style={{
              padding: '7px 14px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
              background: viewMode === d.key ? '#fff' : 'transparent',
              color: viewMode === d.key ? 'var(--primary)' : 'var(--muted)',
              boxShadow: viewMode === d.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <i className={`bi ${d.icon}`} /> {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* URL bar */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <i className="bi bi-lock-fill" style={{ color: '#10b981', fontSize: '0.8rem' }} />
        <span style={{ fontSize: '0.85rem', color: 'var(--muted)', flex: 1 }}>
          localhost:5173<span style={{ color: 'var(--dark)', fontWeight: 600 }}>/site/{site?.slug}</span>
        </span>
        <span className={`badge-custom ${site?.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
          {site?.status}
        </span>
      </div>

      {/* Preview iframe container */}
      <div style={{ background: '#e2e8f0', borderRadius: 16, padding: '20px', display: 'flex', justifyContent: 'center', minHeight: 600 }}>
        <div style={{
          width: widths[viewMode],
          maxWidth: '100%',
          transition: 'width 0.3s ease',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          borderRadius: viewMode === 'desktop' ? 8 : 20,
          overflow: 'hidden',
          background: '#fff',
        }}>
          <iframe
            src={`/site/${site?.slug}`}
            style={{ width: '100%', height: '80vh', border: 'none', display: 'block' }}
            title={`Preview: ${site?.siteName}`}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
