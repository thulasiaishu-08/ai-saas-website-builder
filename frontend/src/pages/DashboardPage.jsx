import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import SiteCard from '../components/SiteCard';
import { getMySites, deleteSite } from '../services/siteService';

export default function DashboardPage() {
  const [sites, setSites] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSites = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getMySites({ search, status: filter });
      setSites(data.sites);
      setStats(data.stats);
    } catch {
      setError('Failed to load websites.');
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => { fetchSites(); }, [fetchSites]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this website? This cannot be undone.')) return;
    try {
      await deleteSite(id);
      fetchSites();
    } catch {
      alert('Failed to delete website.');
    }
  };

  const statCards = [
    { label: 'Total Websites', value: stats.total, icon: 'bi-globe', bg: '#eff6ff', iconColor: '#3b82f6' },
    { label: 'Published', value: stats.published, icon: 'bi-check-circle-fill', bg: '#f0fdf4', iconColor: '#10b981' },
    { label: 'Drafts', value: stats.drafts, icon: 'bi-pencil-fill', bg: '#fefce8', iconColor: '#f59e0b' },
  ];

  return (
    <DashboardLayout title="My Websites">
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18, marginBottom: 32 }}>
        {statCards.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>
              <i className={`bi ${s.icon}`} style={{ color: s.iconColor }} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
        <div className="stat-card" style={{ cursor: 'pointer', border: '2px dashed #c7d2fe', background: '#f5f3ff' }} onClick={() => navigate('/dashboard/create')}>
          <div className="stat-icon" style={{ background: 'var(--primary-light)' }}>
            <i className="bi bi-plus-lg" style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Syne, sans-serif' }}>New Website</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 2 }}>Click to create</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <i className="bi bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: '0.85rem' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-custom"
            placeholder="Search websites..."
            style={{ paddingLeft: 36 }}
          />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="input-custom" style={{ width: 'auto', minWidth: 150 }}>
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button onClick={() => navigate('/dashboard/create')} className="btn-primary-custom">
          <i className="bi bi-plus-lg" /> Create Website
        </button>
      </div>

      {/* Error */}
      {error && <div className="alert-custom alert-error" style={{ marginBottom: 20 }}><i className="bi bi-exclamation-circle" /> {error}</div>}

      {/* Sites Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <div className="spinner" />
        </div>
      ) : sites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: 16, border: '1px solid var(--border)' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <i className="bi bi-globe" style={{ fontSize: '2rem', color: 'var(--primary)' }} />
          </div>
          <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 8 }}>
            {search ? 'No websites found' : 'No websites yet'}
          </h5>
          <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: '0.9rem' }}>
            {search ? 'Try a different search term' : 'Create your first website in under 60 seconds'}
          </p>
          {!search && (
            <button onClick={() => navigate('/dashboard/create')} className="btn-primary-custom">
              <i className="bi bi-plus-lg" /> Create Your First Website
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {sites.map(site => (
            <div key={site._id} className="fade-in">
              <SiteCard site={site} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
