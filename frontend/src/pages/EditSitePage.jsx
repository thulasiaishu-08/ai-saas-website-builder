import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { getSite, updateSite } from '../services/siteService';
import { API_URL } from '../services/api';

export default function EditSitePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);

  const [form, setForm] = useState({
    siteName: '', template: 'business', description: '',
    services: [''], phone: '', email: '', address: '',
    colorPrimary: '#6366f1', status: 'published', logo: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getSite(id);
        const s = data.site;
        setForm({
          siteName: s.siteName || '',
          template: s.template || 'business',
          description: s.description || '',
          services: s.services?.length ? s.services : [''],
          phone: s.contact?.phone || '',
          email: s.contact?.email || '',
          address: s.contact?.address || '',
          colorPrimary: s.colorScheme?.primary || '#6366f1',
          status: s.status || 'published',
          logo: null,
        });
        if (s.logo) setLogoPreview(`${API_URL}${s.logo}`);
      } catch {
        setError('Failed to load website data.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) { set('logo', file); setLogoPreview(URL.createObjectURL(file)); }
  };

  const addService = () => set('services', [...form.services, '']);
  const removeService = (i) => set('services', form.services.filter((_, idx) => idx !== i));
  const updateService = (i, val) => { const s = [...form.services]; s[i] = val; set('services', s); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.siteName.trim()) return setError('Business name is required.');
    if (!form.description.trim()) return setError('Description is required.');

    setSaving(true); setError(''); setSuccess('');
    try {
      const fd = new FormData();
      fd.append('siteName', form.siteName);
      fd.append('template', form.template);
      fd.append('description', form.description);
      fd.append('services', JSON.stringify(form.services.filter(s => s.trim())));
      fd.append('phone', form.phone);
      fd.append('email', form.email);
      fd.append('address', form.address);
      fd.append('colorScheme', JSON.stringify({ primary: form.colorPrimary }));
      fd.append('status', form.status);
      if (form.logo) fd.append('logo', form.logo);

      await updateSite(id, fd);
      setSuccess('Website updated successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update website.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <DashboardLayout title="Edit Website">
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
    </DashboardLayout>
  );

  const inputRow = (label, key, type = 'text', placeholder = '') => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>{label}</label>
      <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} className="input-custom" placeholder={placeholder} />
    </div>
  );

  return (
    <DashboardLayout title="Edit Website">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="bi bi-arrow-left" /> Back
          </button>
          <div style={{ width: 1, height: 18, background: 'var(--border)' }} />
          <h5 style={{ margin: 0, fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Edit: {form.siteName}</h5>
        </div>

        {error && <div className="alert-custom alert-error" style={{ marginBottom: 20 }}><i className="bi bi-exclamation-circle" /> {error}</div>}
        {success && <div className="alert-custom alert-success" style={{ marginBottom: 20 }}><i className="bi bi-check-circle-fill" /> {success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', padding: 28, marginBottom: 20 }}>
            <h6 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="bi bi-info-circle" style={{ color: 'var(--primary)' }} /> Basic Info
            </h6>

            {inputRow('Business Name *', 'siteName', 'text', 'Your business name')}

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Template</label>
              <select value={form.template} onChange={e => set('template', e.target.value)} className="input-custom">
                <option value="business">Business</option>
                <option value="portfolio">Portfolio</option>
                <option value="startup">Startup</option>
              </select>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Description *</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} className="input-custom" rows={4} placeholder="Describe your business..." style={{ resize: 'vertical' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Primary Color</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input type="color" value={form.colorPrimary} onChange={e => set('colorPrimary', e.target.value)} style={{ width: 44, height: 38, border: '1px solid var(--border)', borderRadius: 8, padding: 3, cursor: 'pointer' }} />
                  <input value={form.colorPrimary} onChange={e => set('colorPrimary', e.target.value)} className="input-custom" style={{ flex: 1 }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)} className="input-custom">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Services */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', padding: 28, marginBottom: 20 }}>
            <h6 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="bi bi-list-check" style={{ color: 'var(--primary)' }} /> Services
            </h6>
            {form.services.map((svc, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <input value={svc} onChange={e => updateService(i, e.target.value)} className="input-custom" placeholder={`Service ${i + 1}`} />
                {form.services.length > 1 && (
                  <button type="button" onClick={() => removeService(i)} style={{ padding: '8px 12px', borderRadius: 8, background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', cursor: 'pointer' }}>
                    <i className="bi bi-trash" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addService} style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--primary-light)', color: 'var(--primary)', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
              <i className="bi bi-plus" /> Add Service
            </button>
          </div>

          {/* Contact */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', padding: 28, marginBottom: 20 }}>
            <h6 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="bi bi-telephone" style={{ color: 'var(--primary)' }} /> Contact Details
            </h6>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {inputRow('Phone', 'phone', 'text', '+1 555 000 0000')}
              {inputRow('Business Email', 'email', 'email', 'hello@business.com')}
            </div>
            {inputRow('Address', 'address', 'text', '123 Main St, City, ZIP')}
          </div>

          {/* Logo */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', padding: 28, marginBottom: 24 }}>
            <h6 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="bi bi-image" style={{ color: 'var(--primary)' }} /> Logo
            </h6>
            <div style={{ border: '2px dashed var(--border)', borderRadius: 12, padding: 24, textAlign: 'center', background: '#f8fafc', cursor: 'pointer' }}
              onClick={() => document.getElementById('edit-logo').click()}>
              {logoPreview ? (
                <div>
                  <img src={logoPreview} alt="logo" style={{ maxHeight: 80, maxWidth: 200, objectFit: 'contain', borderRadius: 8, marginBottom: 8 }} />
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>Click to replace</p>
                </div>
              ) : (
                <>
                  <i className="bi bi-cloud-arrow-up" style={{ fontSize: '2rem', color: 'var(--muted)', display: 'block', marginBottom: 8 }} />
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)' }}>Click to upload logo</p>
                </>
              )}
              <input id="edit-logo" type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" onClick={() => navigate('/dashboard')} className="btn-outline-custom" style={{ flex: 1, justifyContent: 'center' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary-custom" style={{ flex: 2, justifyContent: 'center', opacity: saving ? 0.7 : 1 }}>
              {saving ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Saving...</> : <><i className="bi bi-floppy-fill" /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
