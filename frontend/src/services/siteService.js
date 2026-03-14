import api from './api';

export const getMySites = (params) => api.get('/sites', { params });
export const getSite = (id) => api.get(`/sites/${id}`);
export const getPublicSite = (slug) => api.get(`/sites/public/${slug}`);
export const createSite = (formData) =>
  api.post('/sites/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateSite = (id, formData) =>
  api.put(`/sites/update/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteSite = (id) => api.delete(`/sites/delete/${id}`);
export const getSiteAnalytics = (id) => api.get(`/sites/analytics/${id}`);
