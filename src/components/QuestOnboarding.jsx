import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { OnBoarding } from '@questlabs/react-sdk';
import { useQuestAuth } from '../context/QuestAuthContext';
import { questConfig } from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiRocket, FiTarget, FiUsers, FiTrendingUp, FiCheckCircle } = FiIcons;

function QuestOnboardingPage() {
  const navigate = useNavigate();
  const { user, token, completeOnboarding } = useQuestAuth();
  const [answers, setAnswers] = useState({});

  const handleOnboardingComplete = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  const benefits = [
    {
      icon: FiTarget,
      title: 'Accurate Estimates',
      description: 'Get precise project costs based on your specific requirements'
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Share estimates and collaborate with your team members'
    },
    {
      icon: FiTrendingUp,
      title: 'Project Insights',
      description: 'Track your estimates and gain valuable project insights'
    },
    {
      icon: FiCheckCircle,
      title: 'Professional Reports',
      description: 'Generate detailed PDF proposals for your clients'
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Welcome & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-green-700 to-emerald-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <SafeIcon icon={FiRocket} className="text-4xl" />
              <h1 className="text-3xl font-bold">Let's Get Started!</h1>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Welcome to Your
              <span className="block text-green-200">Power Platform Journey</span>
            </h2>
            
            <p className="text-xl text-green-100 mb-12 leading-relaxed">
              We're setting up your personalized experience. This quick setup will help us provide you with the most accurate estimates and relevant features.
            </p>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">What you'll get:</h3>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={benefit.icon} className="text-xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-green-100">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-green-100">
                <SafeIcon icon={FiCheckCircle} className="inline mr-2" />
                This setup takes less than 2 minutes and helps us personalize your experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Onboarding Form */}
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
              <SafeIcon icon={FiRocket} className="text-3xl text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Let's Get Started!</h1>
            </div>
            <p className="text-gray-600">Quick setup to personalize your experience</p>
          </div>

          {/* Quest Onboarding Component */}
          <div className="quest-onboarding-container">
            <OnBoarding
              userId={user?.userId}
              token={token}
              questId={questConfig.QUEST_ONBOARDING_QUESTID}
              answer={answers}
              setAnswer={setAnswers}
              getAnswers={handleOnboardingComplete}
              accent={questConfig.PRIMARY_COLOR}
              singleChoose="modal1"
              multiChoice="modal2"
              style={{
                width: '100%',
                maxWidth: '400px',
              }}
            >
              <OnBoarding.Header />
              <OnBoarding.Content />
              <OnBoarding.Footer />
            </OnBoarding>
          </div>

          {/* Skip Option */}
          <div className="mt-6 text-center">
            <button
              onClick={handleOnboardingComplete}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip setup for now
            </button>
          </div>

          {/* Benefits for Mobile */}
          <div className="lg:hidden mt-12 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What you'll get:</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={benefit.icon} className="text-sm text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default QuestOnboardingPage;