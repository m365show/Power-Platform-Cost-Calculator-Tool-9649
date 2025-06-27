import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { QuestLogin } from '@questlabs/react-sdk';
import { useQuestAuth } from '../context/QuestAuthContext';
import { questConfig } from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiZap, FiShield, FiUsers, FiTarget } = FiIcons;

function QuestLoginPage() {
  const navigate = useNavigate();
  const { login } = useQuestAuth();

  const handleLogin = ({ userId, token, newUser }) => {
    login({ userId, token, newUser });
    
    if (newUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  const features = [
    {
      icon: FiTarget,
      title: 'Accurate Estimates',
      description: 'Get precise Power Platform project costs instantly'
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Share estimates and collaborate with your team'
    },
    {
      icon: FiShield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <SafeIcon icon={FiZap} className="text-4xl" />
              <h1 className="text-3xl font-bold">Power Platform Calculator</h1>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Welcome Back to Your
              <span className="block text-accent-200">Project Estimator</span>
            </h2>
            
            <p className="text-xl text-primary-100 mb-12 leading-relaxed">
              Access your saved estimates, create new project calculations, and collaborate with your team.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={feature.icon} className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-primary-100">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <SafeIcon icon={FiZap} className="text-3xl text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Power Platform Calculator</h1>
            </div>
            <p className="text-gray-600">Sign in to access your project estimates</p>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Calculator</span>
          </button>

          {/* Quest Login Component */}
          <div className="quest-login-container">
            <QuestLogin
              onSubmit={handleLogin}
              email={true}
              google={false}
              accent={questConfig.PRIMARY_COLOR}
              style={{
                width: '100%',
                maxWidth: '400px',
              }}
            />
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Create one here
              </button>
            </p>
          </div>

          {/* Features for Mobile */}
          <div className="lg:hidden mt-12 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Why sign in?</h3>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={feature.icon} className="text-sm text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default QuestLoginPage;