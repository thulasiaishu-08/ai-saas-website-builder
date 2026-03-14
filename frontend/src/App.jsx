import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import { ProtectedRoute, AdminRoute, GuestRoute } from './utils/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreateSitePage from './pages/CreateSitePage';
import EditSitePage from './pages/EditSitePage';
import PreviewSitePage from './pages/PreviewSitePage';
import GeneratedSitePage from './pages/GeneratedSitePage';
import ContactMessagesPage from './pages/ContactMessagesPage';
import AdminPanelPage from './pages/AdminPanelPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/site/:slug" element={<GeneratedSitePage />} />

          {/* Guest only */}
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />

          {/* Protected */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard/create" element={<ProtectedRoute><CreateSitePage /></ProtectedRoute>} />
          <Route path="/dashboard/edit/:id" element={<ProtectedRoute><EditSitePage /></ProtectedRoute>} />
          <Route path="/dashboard/preview/:id" element={<ProtectedRoute><PreviewSitePage /></ProtectedRoute>} />
          <Route path="/dashboard/messages/:siteId" element={<ProtectedRoute><ContactMessagesPage /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoute><AdminPanelPage /></AdminRoute>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
