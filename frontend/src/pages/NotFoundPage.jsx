import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans, sans-serif', background: '#f8fafc' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '7rem', lineHeight: 1, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>404</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, marginBottom: 12 }}>Page Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: 32, lineHeight: 1.7 }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', padding: '12px 28px', borderRadius: 12, fontWeight: 700, fontSize: '0.95rem' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
