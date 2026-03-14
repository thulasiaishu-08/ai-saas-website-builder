import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const navItems = [
  { to: '/dashboard', icon: 'bi-grid-fill', label: 'Dashboard', exact: true },
  { to: '/dashboard/create', icon: 'bi-plus-circle-fill', label: 'Create Website' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', color: '#fff', fontWeight: 800,
            fontFamily: 'Syne, sans-serif',
          }}>S</div>
          <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>
            SiteForge
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', padding: '0 8px', marginBottom: 8, textTransform: 'uppercase' }}>Menu</p>
        {navItems.map(({ to, icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, marginBottom: 2,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
              background: isActive ? 'rgba(99,102,241,0.25)' : 'transparent',
              fontWeight: isActive ? 600 : 400,
              fontSize: '0.88rem', transition: 'all 0.2s',
            })}
          >
            <i className={`bi ${icon}`} style={{ fontSize: '1rem' }} />
            {label}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', padding: '16px 8px 8px', textTransform: 'uppercase' }}>Admin</p>
            <NavLink
              to="/admin"
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 8, marginBottom: 2,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                background: isActive ? 'rgba(99,102,241,0.25)' : 'transparent',
                fontWeight: isActive ? 600 : 400, fontSize: '0.88rem', transition: 'all 0.2s',
              })}
            >
              <i className="bi bi-shield-fill" style={{ fontSize: '1rem' }} />
              Admin Panel
            </NavLink>
          </>
        )}
      </nav>

      {/* User info */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0,
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          width: '100%', padding: '8px', background: 'rgba(239,68,68,0.15)', color: '#fca5a5',
          border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, fontSize: '0.82rem',
          fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <i className="bi bi-box-arrow-right" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
