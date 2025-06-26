import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

// Components
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import Calculator from './components/Calculator';
import Results from './components/Results';
import GetStartedGuide from './components/GetStartedGuide';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import UserRoleManagement from './components/UserRoleManagement';
import SuperAdminSetup from './components/SuperAdminSetup';

// Context Providers
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { questConfig } from './config/questConfig';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <AuthProvider>
        <AppProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
              <Navigation />
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/get-started" element={<GetStartedGuide />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/super-admin-setup" element={<SuperAdminSetup />} />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute requiredPermission="manage_users">
                        <UserManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-roles"
                    element={
                      <ProtectedRoute requiredPermission="manage_users">
                        <UserRoleManagement />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </QuestProvider>
  );
}

export default App;