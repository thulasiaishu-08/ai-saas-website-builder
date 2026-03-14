import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    const res = await signup(form.name, form.email, form.password);
    if (res.success) navigate('/dashboard');
    else setError(res.message);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc' }}>
      {/* Left panel */}
      <div style={{ flex: '0 0 420px', background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, color: '#fff' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', color: '#fff' }}>S</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#fff' }}>SiteForge</span>
        </Link>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.8rem', marginBottom: 16, textAlign: 'center' }}>Launch Your Business Online</h2>
        <p style={{ opacity: 0.7, textAlign: 'center', lineHeight: 1.7, fontSize: '0.95rem' }}>Create a professional website in under 60 seconds. No design skills required.</p>
        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%' }}>
          {[
            { icon: 'bi-lightning-fill', label: 'Instant', color: '#f59e0b' },
            { icon: 'bi-phone-fill', label: 'Responsive', color: '#10b981' },
            { icon: 'bi-graph-up', label: 'Analytics', color: '#6366f1' },
            { icon: 'bi-envelope-fill', label: 'Contact Form', color: '#8b5cf6' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '14px', textAlign: 'center' }}>
              <i className={`bi ${item.icon}`} style={{ color: item.color, fontSize: '1.3rem', display: 'block', marginBottom: 6 }} />
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 420 }} className="fade-in">
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.8rem', marginBottom: 8 }}>Create Account</h3>
          <p style={{ color: '#64748b', marginBottom: 32, fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: '#6366f1', fontWeight: 600 }}>Sign in</Link>
          </p>

          {error && (
            <div className="alert-custom alert-error" style={{ marginBottom: 20 }}>
              <i className="bi bi-exclamation-circle" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
              { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
              { name: 'password', label: 'Password', type: 'password', placeholder: 'Min 6 characters' },
              { name: 'confirm', label: 'Confirm Password', type: 'password', placeholder: 'Repeat your password' },
            ].map((f) => (
              <div key={f.name} style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: '#334155' }}>{f.label}</label>
                <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} className="input-custom" placeholder={f.placeholder} required />
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-primary-custom" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', marginTop: 6, opacity: loading ? 0.7 : 1 }}>
              {loading ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2, marginRight: 8 }} /> Creating account...</> : <><i className="bi bi-person-plus-fill" /> Create Free Account</>}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.78rem', color: '#94a3b8' }}>
            By signing up you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
