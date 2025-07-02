import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
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
import Chatbot from './components/Chatbot';

// Quest Components
import QuestLoginPage from './components/QuestLogin';
import QuestOnboardingPage from './components/QuestOnboarding';
import QuestProtectedRoute from './components/QuestProtectedRoute';

// SEO Pages
import SmallBusinessCalculator from './components/seo/SmallBusinessCalculator';
import EnterpriseLicensing from './components/seo/EnterpriseLicensing';
import PowerAppsPricing from './components/seo/PowerAppsPricing';
import PowerBICostEstimator from './components/seo/PowerBICostEstimator';
import ComparePlans from './components/seo/ComparePlans';
import AIBuilderDataverse from './components/seo/AIBuilderDataverse';
import GovernmentPricing from './components/seo/GovernmentPricing';
import InternationalPricing from './components/seo/InternationalPricing';
import ROICalculator from './components/seo/ROICalculator';
import CostOptimization from './components/seo/CostOptimization';
import IntegrationCosts from './components/seo/IntegrationCosts';

// Context Providers
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { QuestAuthProvider } from './context/QuestAuthContext';
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
      <QuestAuthProvider>
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
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/super-admin-setup" element={<SuperAdminSetup />} />

                    {/* SEO Pages */}
                    <Route path="/small-business-calculator" element={<SmallBusinessCalculator />} />
                    <Route path="/enterprise-licensing" element={<EnterpriseLicensing />} />
                    <Route path="/power-apps-pricing" element={<PowerAppsPricing />} />
                    <Route path="/power-bi-cost-estimator" element={<PowerBICostEstimator />} />
                    <Route path="/compare-plans" element={<ComparePlans />} />
                    <Route path="/ai-builder-dataverse" element={<AIBuilderDataverse />} />
                    <Route path="/government-pricing" element={<GovernmentPricing />} />
                    <Route path="/international-pricing" element={<InternationalPricing />} />
                    <Route path="/roi-calculator" element={<ROICalculator />} />
                    <Route path="/cost-optimization" element={<CostOptimization />} />
                    <Route path="/integration-costs" element={<IntegrationCosts />} />

                    {/* Hidden Authentication Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/quest-login" element={<QuestLoginPage />} />
                    <Route path="/onboarding" element={
                      <QuestProtectedRoute>
                        <QuestOnboardingPage />
                      </QuestProtectedRoute>
                    } />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/users" element={
                      <ProtectedRoute requiredPermission="manage_users">
                        <UserManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/user-roles" element={
                      <ProtectedRoute requiredPermission="manage_users">
                        <UserRoleManagement />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </AnimatePresence>
                
                {/* Footer - Added to all pages */}
                <Footer />
                
                {/* Chatbot - Available on all pages */}
                <Chatbot />
              </div>
            </Router>
          </AppProvider>
        </AuthProvider>
      </QuestAuthProvider>
    </QuestProvider>
  );
}

export default App;