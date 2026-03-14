import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/api';

const templateColors = {
  business: { bg: '#eff6ff', color: '#1d4ed8', icon: 'bi-briefcase-fill' },
  portfolio: { bg: '#fdf4ff', color: '#7e22ce', icon: 'bi-person-bounding-box' },
  startup: { bg: '#fff7ed', color: '#c2410c', icon: 'bi-rocket-fill' },
};

export default function SiteCard({ site, onDelete }) {
  const navigate = useNavigate();
  const tpl = templateColors[site.template] || templateColors.business;

  return (
    <div className="card-custom" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Header banner */}
      <div style={{ height: 80, background: `linear-gradient(135deg, ${tpl.color}22, ${tpl.color}44)`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {site.logo ? (
          <img src={`${API_URL}${site.logo}`} alt="logo" style={{ height: 52, width: 52, objectFit: 'contain', borderRadius: 8, background: '#fff', padding: 4 }} />
        ) : (
          <div style={{ width: 52, height: 52, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className={`bi ${tpl.icon}`} style={{ color: tpl.color, fontSize: '1.4rem' }} />
          </div>
        )}
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <span className={`badge-custom ${site.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
            {site.status === 'published' ? <><i className="bi bi-circle-fill" style={{ fontSize: '0.5rem' }} /> Live</> : 'Draft'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ background: tpl.bg, color: tpl.color, padding: '2px 8px', borderRadius: 99, fontSize: '0.7rem', fontWeight: 700, textTransform: 'capitalize' }}>
            {site.template}
          </span>
        </div>
        <h6 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 4, fontSize: '0.95rem' }}>{site.siteName}</h6>
        <p style={{ color: 'var(--muted)', fontSize: '0.78rem', margin: '0 0 12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {site.description}
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 14, padding: '10px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)' }}>{site.analytics?.visits || 0}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>Visits</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--success)' }}>{site.analytics?.contactRequests || 0}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>Contacts</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--dark)' }}>{site.services?.length || 0}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>Services</div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={() => navigate(`/dashboard/preview/${site._id}`)} className="btn-outline-custom" style={{ flex: 1, padding: '7px 10px', fontSize: '0.78rem', justifyContent: 'center' }}>
            <i className="bi bi-eye" /> Preview
          </button>
          <button onClick={() => navigate(`/dashboard/edit/${site._id}`)} className="btn-primary-custom" style={{ flex: 1, padding: '7px 10px', fontSize: '0.78rem', justifyContent: 'center' }}>
            <i className="bi bi-pencil" /> Edit
          </button>
          <button
            onClick={() => window.open(`/site/${site.slug}`, '_blank')}
            style={{ padding: '7px 10px', borderRadius: 8, background: '#f0fdf4', color: '#166534', border: '1.5px solid #bbf7d0', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
          >
            <i className="bi bi-box-arrow-up-right" />
          </button>
          <button
            onClick={() => navigate(`/dashboard/messages/${site._id}`)}
            style={{ padding: '7px 10px', borderRadius: 8, background: '#fff7ed', color: '#c2410c', border: '1.5px solid #fed7aa', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
          >
            <i className="bi bi-envelope" />
          </button>
          <button
            onClick={() => onDelete(site._id)}
            style={{ padding: '7px 10px', borderRadius: 8, background: '#fef2f2', color: '#991b1b', border: '1.5px solid #fecaca', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
          >
            <i className="bi bi-trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
