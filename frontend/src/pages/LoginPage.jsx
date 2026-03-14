import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(form.email, form.password);
    if (res.success) navigate('/dashboard');
    else setError(res.message);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc' }}>
      {/* Left panel */}
      <div style={{ flex: '0 0 420px', background: 'linear-gradient(160deg, #6366f1 0%, #8b5cf6 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, color: '#fff' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', color: '#fff' }}>S</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#fff' }}>SiteForge</span>
        </Link>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.8rem', marginBottom: 16, textAlign: 'center' }}>Welcome Back!</h2>
        <p style={{ opacity: 0.8, textAlign: 'center', lineHeight: 1.7, fontSize: '0.95rem' }}>Your websites are waiting. Sign in to manage, edit, and grow your online presence.</p>
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          {['Dashboard & Analytics', 'Edit Your Websites', 'View Contact Messages'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.12)', padding: '12px 16px', borderRadius: 10 }}>
              <i className="bi bi-check-circle-fill" style={{ color: '#a5f3fc' }} />
              <span style={{ fontSize: '0.88rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 420 }} className="fade-in">
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.8rem', marginBottom: 8 }}>Sign In</h3>
          <p style={{ color: '#64748b', marginBottom: 32, fontSize: '0.9rem' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#6366f1', fontWeight: 600 }}>Create one free</Link>
          </p>

          {error && (
            <div className="alert-custom alert-error" style={{ marginBottom: 20 }}>
              <i className="bi bi-exclamation-circle" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: '#334155' }}>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="input-custom" placeholder="you@example.com" required />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: '#334155' }}>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} className="input-custom" placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary-custom" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', opacity: loading ? 0.7 : 1 }}>
              {loading ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2, marginRight: 8 }} /> Signing in...</> : <><i className="bi bi-box-arrow-in-right" /> Sign In</>}
            </button>
          </form>

          <div style={{ marginTop: 24, padding: 16, background: '#f1f5f9', borderRadius: 10, fontSize: '0.8rem', color: '#64748b' }}>
            <strong>Demo Admin:</strong> admin@websitebuilder.com / admin123
          </div>
        </div>
      </div>
    </div>
  );
}
