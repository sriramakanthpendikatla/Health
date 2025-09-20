import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CaseReporting from './pages/CaseReporting';
import WaterQuality from './pages/WaterQuality';
import Tips from './pages/Tips';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OfflineProvider } from './contexts/OfflineContext';
import OfflineIndicator from './components/OfflineIndicator';
import LoadingSpinner from './components/LoadingSpinner';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/case-reporting" element={<CaseReporting />} />
            <Route path="/water-quality" element={<WaterQuality />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <OfflineIndicator />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <OfflineProvider>
        <Router>
          <AppContent />
        </Router>
      </OfflineProvider>
    </AuthProvider>
  );
}

export default App;