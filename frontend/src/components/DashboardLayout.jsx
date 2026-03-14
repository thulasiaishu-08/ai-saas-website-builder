import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../utils/AuthContext';

export default function DashboardLayout({ children, title }) {
  const { user } = useAuth();
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <header className="top-navbar">
          <div>
            <h5 style={{ margin: 0, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>{title}</h5>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
              Welcome back, <strong style={{ color: 'var(--dark)' }}>{user?.name}</strong>
            </div>
            {user?.role === 'admin' && (
              <span className="badge-custom" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                <i className="bi bi-shield-fill" style={{ fontSize: '0.65rem' }} /> Admin
              </span>
            )}
          </div>
        </header>
        <div style={{ padding: '28px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
