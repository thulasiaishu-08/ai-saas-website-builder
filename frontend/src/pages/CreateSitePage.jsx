import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { createSite } from '../services/siteService';

const templates = [
  { id: 'business', name: 'Business', desc: 'Professional layout for companies & agencies', icon: 'bi-briefcase-fill', color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'portfolio', name: 'Portfolio', desc: 'Elegant showcase for creatives & freelancers', icon: 'bi-person-bounding-box', color: '#7e22ce', bg: '#fdf4ff' },
  { id: 'startup', name: 'Startup', desc: 'Bold & energetic for new ventures', icon: 'bi-rocket-fill', color: '#c2410c', bg: '#fff7ed' },
];

const STEPS = ['Template', 'Business Info', 'Contact & Media', 'Review'];

export default function CreateSitePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);

  const [form, setForm] = useState({
    template: 'business',
    siteName: '',
    description: '',
    services: [''],
    phone: '',
    email: '',
    address: '',
    colorPrimary: '#6366f1',
    colorSecondary: '#6c757d',
    status: 'published',
    logo: null,
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      set('logo', file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const addService = () => set('services', [...form.services, '']);
  const removeService = (i) => set('services', form.services.filter((_, idx) => idx !== i));
  const updateService = (i, val) => {
    const s = [...form.services];
    s[i] = val;
    set('services', s);
  };

  const validateStep = () => {
    if (step === 0 && !form.template) return 'Please select a template.';
    if (step === 1) {
      if (!form.siteName.trim()) return 'Business name is required.';
      if (!form.description.trim()) return 'Description is required.';
    }
    return null;
  };

  const next = () => {
    const err = validateStep();
    if (err) return setError(err);
    setError('');
    setStep(s => s + 1);
  };
  const back = () => { setError(''); setStep(s => s - 1); };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('siteName', form.siteName);
      fd.append('template', form.template);
      fd.append('description', form.description);
      fd.append('services', JSON.stringify(form.services.filter(s => s.trim())));
      fd.append('phone', form.phone);
      fd.append('email', form.email);
      fd.append('address', form.address);
      fd.append('colorScheme', JSON.stringify({ primary: form.colorPrimary, secondary: form.colorSecondary }));
      fd.append('status', form.status);
      if (form.logo) fd.append('logo', form.logo);

      const { data } = await createSite(fd);
      navigate('/dashboard', { state: { success: 'Website created successfully!' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create website.');
    } finally {
      setLoading(false);
    }
  };

  const selectedTemplate = templates.find(t => t.id === form.template);

  return (
    <DashboardLayout title="Create Website">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Stepper */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 36, background: '#fff', borderRadius: 14, border: '1px solid var(--border)', overflow: 'hidden' }}>
          {STEPS.map((label, i) => (
            <div key={i} style={{
              flex: 1, padding: '14px 10px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600,
              background: i === step ? 'var(--primary)' : i < step ? 'var(--primary-light)' : '#fff',
              color: i === step ? '#fff' : i < step ? 'var(--primary)' : 'var(--muted)',
              borderRight: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
              cursor: i < step ? 'pointer' : 'default',
              transition: 'all 0.2s',
            }} onClick={() => i < step && setStep(i)}>
              <span style={{ marginRight: 6, opacity: i < step ? 1 : 0.5 }}>
                {i < step ? <i className="bi bi-check-circle-fill" /> : `${i + 1}.`}
              </span>
              {label}
            </div>
          ))}
        </div>

        {error && <div className="alert-custom alert-error" style={{ marginBottom: 20 }}><i className="bi bi-exclamation-circle" /> {error}</div>}

        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', padding: 32 }} className="fade-in">

          {/* STEP 0: Template */}
          {step === 0 && (
            <div>
              <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 6 }}>Choose a Template</h5>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 24 }}>Select the design that best fits your business.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                {templates.map(t => (
                  <div key={t.id} onClick={() => set('template', t.id)} style={{
                    border: `2px solid ${form.template === t.id ? t.color : 'var(--border)'}`,
                    borderRadius: 14, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: form.template === t.id ? `0 4px 20px ${t.color}30` : 'none',
                    transform: form.template === t.id ? 'translateY(-2px)' : 'none',
                  }}>
                    <div style={{ height: 80, background: `linear-gradient(135deg, ${t.color}22, ${t.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={`bi ${t.icon}`} style={{ fontSize: '2rem', color: t.color }} />
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontFamily: 'Syne, sans-serif', fontSize: '0.95rem' }}>{t.name}</span>
                        {form.template === t.id && <i className="bi bi-check-circle-fill" style={{ color: t.color }} />}
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: 0 }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Business Info */}
          {step === 1 && (
            <div>
              <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 6 }}>Business Information</h5>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 24 }}>Tell us about your business. This will be displayed on your website.</p>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Business Name *</label>
                <input value={form.siteName} onChange={e => set('siteName', e.target.value)} className="input-custom" placeholder="e.g. Acme Design Studio" />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Business Description *</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} className="input-custom" placeholder="Describe what your business does, your mission, and what makes you unique..." rows={4} style={{ resize: 'vertical' }} />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>
                  Services / Products
                  <span style={{ fontWeight: 400, color: 'var(--muted)', marginLeft: 6 }}>(optional)</span>
                </label>
                {form.services.map((svc, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input value={svc} onChange={e => updateService(i, e.target.value)} className="input-custom" placeholder={`Service ${i + 1}, e.g. Web Design`} />
                    {form.services.length > 1 && (
                      <button onClick={() => removeService(i)} style={{ padding: '8px 12px', borderRadius: 8, background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', cursor: 'pointer' }}>
                        <i className="bi bi-trash" />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={addService} style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--primary-light)', color: 'var(--primary)', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
                  <i className="bi bi-plus" /> Add Service
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Primary Color</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="color" value={form.colorPrimary} onChange={e => set('colorPrimary', e.target.value)} style={{ width: 44, height: 38, borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer', padding: 3 }} />
                    <input value={form.colorPrimary} onChange={e => set('colorPrimary', e.target.value)} className="input-custom" style={{ flex: 1 }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)} className="input-custom">
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Contact & Media */}
          {step === 2 && (
            <div>
              <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 6 }}>Contact & Media</h5>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 24 }}>Add contact details and upload your logo.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Phone Number</label>
                  <input value={form.phone} onChange={e => set('phone', e.target.value)} className="input-custom" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Business Email</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input-custom" placeholder="hello@yourbusiness.com" />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>Business Address</label>
                <input value={form.address} onChange={e => set('address', e.target.value)} className="input-custom" placeholder="123 Main St, City, State, ZIP" />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#334155' }}>
                  Logo <span style={{ fontWeight: 400, color: 'var(--muted)' }}>(PNG, JPG, SVG — max 5MB)</span>
                </label>
                <div style={{ border: '2px dashed var(--border)', borderRadius: 12, padding: 24, textAlign: 'center', background: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => document.getElementById('logo-upload').click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) { set('logo', file); setLogoPreview(URL.createObjectURL(file)); } }}>
                  {logoPreview ? (
                    <div>
                      <img src={logoPreview} alt="Logo preview" style={{ maxHeight: 80, maxWidth: 200, objectFit: 'contain', borderRadius: 8, marginBottom: 8 }} />
                      <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>Click to change</p>
                    </div>
                  ) : (
                    <>
                      <i className="bi bi-cloud-arrow-up" style={{ fontSize: '2rem', color: 'var(--muted)', marginBottom: 8, display: 'block' }} />
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)' }}>Click or drag & drop your logo here</p>
                    </>
                  )}
                  <input id="logo-upload" type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Review */}
          {step === 3 && (
            <div>
              <h5 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 6 }}>Review & Launch</h5>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 24 }}>Everything look good? Hit the button to generate your website!</p>

              <div style={{ display: 'grid', gap: 14 }}>
                {[
                  { label: 'Template', value: selectedTemplate?.name, icon: selectedTemplate?.icon, iconColor: selectedTemplate?.color },
                  { label: 'Business Name', value: form.siteName },
                  { label: 'Status', value: form.status === 'published' ? '🟢 Published' : '🟡 Draft' },
                  { label: 'Services', value: form.services.filter(s => s.trim()).join(', ') || 'None added' },
                  { label: 'Phone', value: form.phone || '—' },
                  { label: 'Email', value: form.email || '—' },
                  { label: 'Address', value: form.address || '—' },
                  { label: 'Logo', value: logoPreview ? '✅ Uploaded' : 'No logo' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: 10 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>{item.label}</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {item.icon && <i className={`bi ${item.icon}`} style={{ color: item.iconColor }} />}
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, padding: 16, background: '#eff6ff', borderRadius: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <i className="bi bi-info-circle-fill" style={{ color: '#3b82f6', marginTop: 2 }} />
                <p style={{ margin: 0, fontSize: '0.83rem', color: '#1e40af' }}>
                  Your website will be accessible at <strong>/site/[your-business-name]</strong> instantly after creation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          <button onClick={step === 0 ? () => navigate('/dashboard') : back} className="btn-outline-custom">
            <i className="bi bi-arrow-left" /> {step === 0 ? 'Cancel' : 'Back'}
          </button>
          {step < STEPS.length - 1 ? (
            <button onClick={next} className="btn-primary-custom">
              Next <i className="bi bi-arrow-right" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading} className="btn-primary-custom" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', opacity: loading ? 0.7 : 1 }}>
              {loading ? <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Generating...</> : <><i className="bi bi-rocket-fill" /> Launch Website!</>}
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
