import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuestAuth } from '../context/QuestAuthContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiLoader, FiLock } = FiIcons;

function QuestProtectedRoute({ children, requireOnboarding = false }) {
  const { isAuthenticated, loading, needsOnboarding } = useQuestAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <SafeIcon icon={FiLoader} className="text-4xl text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireOnboarding && needsOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  if (!requireOnboarding && needsOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

export default QuestProtectedRoute;