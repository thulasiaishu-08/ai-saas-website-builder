import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../services/api';

const TABS = ['Overview', 'Users', 'Websites', 'Messages'];

export default function AdminPanelPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [sites, setSites] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, usersRes, sitesRes, contactsRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/users'),
          api.get('/admin/sites'),
          api.get('/admin/contacts'),
        ]);
        setStats(statsRes.data.stats);
        setUsers(usersRes.data.users);
        setSites(sitesRes.data.sites);
        setContacts(contactsRes.data.contacts);
      } catch {
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const deleteUser = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(u => u.filter(user => user._id !== id));
    } catch {}
  };

  if (loading) return (
    <DashboardLayout title="Admin Panel">
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title="Admin Panel">
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', padding: 4, borderRadius: 12, marginBottom: 28, width: 'fit-content' }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            padding: '9px 20px', borderRadius: 9, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'inherit',
            background: tab === i ? '#fff' : 'transparent',
            color: tab === i ? 'var(--primary)' : 'var(--muted)',
            boxShadow: tab === i ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          }}>{t}</button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === 0 && stats && (
        <div className="fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18, marginBottom: 32 }}>
            {[
              { label: 'Total Users', value: stats.userCount, icon: 'bi-people-fill', bg: '#eff6ff', color: '#3b82f6' },
              { label: 'Total Sites', value: stats.siteCount, icon: 'bi-globe', bg: '#f0fdf4', color: '#10b981' },
              { label: 'Published', value: stats.publishedCount, icon: 'bi-check-circle-fill', bg: '#fef3c7', color: '#f59e0b' },
              { label: 'Messages', value: stats.contactCount, icon: 'bi-envelope-fill', bg: '#fdf4ff', color: '#8b5cf6' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon" style={{ background: s.bg }}>
                  <i className={`bi ${s.icon}`} style={{ color: s.color }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', padding: 24 }}>
            <h6 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 16 }}>Recent Users</h6>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead><tr style={{ borderBottom: '2px solid var(--border)' }}>
                {['Name', 'Email', 'Role', 'Joined'].map(h => <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {users.slice(0, 5).map((u, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px' }}><strong>{u.name}</strong></td>
                    <td style={{ padding: '12px', color: 'var(--muted)' }}>{u.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: u.role === 'admin' ? '#eff6ff' : '#f0fdf4', color: u.role === 'admin' ? '#1d4ed8' : '#166534', padding: '3px 10px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700 }}>{u.role}</span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--muted)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* USERS */}
      {tab === 1 && (
        <div className="fade-in" style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h6 style={{ margin: 0, fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>All Users ({users.length})</h6>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead><tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                {['#', 'Name', 'Email', 'Role', 'Joined', 'Actions'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--muted)', fontSize: '0.77rem', textTransform: 'uppercase' }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '0.8rem' }}>{i + 1}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem' }}>
                          {u.name.charAt(0)}
                        </div>
                        <strong>{u.name}</strong>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>{u.email}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: u.role === 'admin' ? '#eff6ff' : '#f0fdf4', color: u.role === 'admin' ? '#1d4ed8' : '#166534', padding: '3px 10px', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700 }}>{u.role}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '0.83rem' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px 16px' }}>
                      {u.role !== 'admin' && (
                        <button onClick={() => deleteUser(u._id)} style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 7, padding: '5px 12px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>
                          <i className="bi bi-trash" /> Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* WEBSITES */}
      {tab === 2 && (
        <div className="fade-in" style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
            <h6 style={{ margin: 0, fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>All Websites ({sites.length})</h6>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead><tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                {['Site Name', 'Slug', 'Template', 'Status', 'Visits', 'Created'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--muted)', fontSize: '0.77rem', textTransform: 'uppercase' }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {sites.map((s, i) => (
                  <tr key={s._id} style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '12px 16px' }}><strong>{s.siteName}</strong></td>
                    <td style={{ padding: '12px 16px' }}>
                      <a href={`/site/${s.slug}`} target="_blank" style={{ color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 600 }}>/{s.slug}</a>
                    </td>
                    <td style={{ padding: '12px 16px', textTransform: 'capitalize', color: 'var(--muted)' }}>{s.template}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`badge-custom ${s.status === 'published' ? 'badge-published' : 'badge-draft'}`}>{s.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{s.analytics?.visits || 0}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '0.83rem' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MESSAGES */}
      {tab === 3 && (
        <div className="fade-in" style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
            <h6 style={{ margin: 0, fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>All Contact Messages ({contacts.length})</h6>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead><tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                {['From', 'Email', 'Site', 'Message', 'Date'].map(h => <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--muted)', fontSize: '0.77rem', textTransform: 'uppercase' }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {contacts.map((c, i) => (
                  <tr key={c._id} style={{ borderBottom: '1px solid var(--border)', background: c.read ? '' : '#f0f4ff' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = c.read ? '' : '#f0f4ff'}>
                    <td style={{ padding: '12px 16px' }}><strong>{c.name}</strong></td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>{c.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>{c.siteSlug}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)', maxWidth: 280 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: '0.83rem', whiteSpace: 'nowrap' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
