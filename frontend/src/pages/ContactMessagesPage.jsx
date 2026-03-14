import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import api from '../services/api';
import { getSite } from '../services/siteService';

export default function ContactMessagesPage() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [siteRes, msgRes] = await Promise.all([
          getSite(siteId),
          api.get(`/contact/${siteId}`),
        ]);
        setSite(siteRes.data.site);
        setMessages(msgRes.data.messages);
      } catch {
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [siteId]);

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/contact/read/${id}`);
      setMessages(m => m.map(msg => msg._id === id ? { ...msg, read: true } : msg));
      if (selected?._id === id) setSelected(s => ({ ...s, read: true }));
    } catch {}
  };

  const unread = messages.filter(m => !m.read).length;

  if (loading) return (
    <DashboardLayout title="Messages">
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title={`Messages — ${site?.siteName}`}>
      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
          <i className="bi bi-arrow-left" /> Dashboard
        </button>
        <div style={{ width: 1, height: 18, background: 'var(--border)' }} />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Contact Messages</span>
          {unread > 0 && (
            <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>
              {unread} new
            </span>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: 16, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>📭</div>
          <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 8 }}>No messages yet</h5>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>When visitors submit the contact form on your site, messages will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
          {/* List */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{messages.length} message{messages.length !== 1 ? 's' : ''}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>from /site/{site?.slug}</span>
            </div>
            {messages.map((msg) => (
              <div key={msg._id}
                onClick={() => { setSelected(msg); if (!msg.read) handleMarkRead(msg._id); }}
                style={{
                  padding: '16px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.15s',
                  background: selected?._id === msg._id ? 'var(--primary-light)' : msg.read ? '#fff' : '#f0f4ff',
                  borderLeft: `3px solid ${selected?._id === msg._id ? 'var(--primary)' : msg.read ? 'transparent' : '#6366f1'}`,
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0 }}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.87rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        {msg.name}
                        {!msg.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{msg.email}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', flexShrink: 0, marginLeft: 8 }}>
                    {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginLeft: 40, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          {/* Detail pane */}
          {selected ? (
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', padding: 28, position: 'sticky', top: 20 }} className="fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h6 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, margin: 0 }}>Message Detail</h6>
                {!selected.read && (
                  <button onClick={() => handleMarkRead(selected._id)} style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}>
                    Mark as Read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, padding: '16px', background: '#f8fafc', borderRadius: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                  {selected.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{selected.name}</div>
                  <a href={`mailto:${selected.email}`} style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 500 }}>{selected.email}</a>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Received</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--dark)' }}>
                  {new Date(selected.createdAt).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Message</div>
                <div style={{ background: '#f8fafc', borderRadius: 12, padding: '18px 20px', fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--dark)', border: '1px solid var(--border)' }}>
                  {selected.message}
                </div>
              </div>

              <a href={`mailto:${selected.email}?subject=Re: Your message`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20, background: 'var(--primary)', color: '#fff', padding: '11px', borderRadius: 10, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>
                <i className="bi bi-reply-fill" /> Reply via Email
              </a>
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
              <i className="bi bi-envelope-open" style={{ fontSize: '2.5rem', display: 'block', marginBottom: 12, opacity: 0.4 }} />
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Select a message to read it</p>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
