import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUsers, FiDollarSign, FiTrendingUp, FiCheck, FiArrowRight, FiCalculator, FiTarget, FiClock } = FiIcons;

function SmallBusinessCalculator() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('per-app');

  const plans = [
    {
      id: 'per-app',
      name: 'Power Apps Per App',
      price: '$5',
      period: 'per user/month',
      description: 'Perfect for small businesses with specific app needs',
      features: [
        'Run one specific app',
        'Premium connectors included',
        'Dataverse for Teams storage',
        'Basic support included'
      ],
      bestFor: 'Teams using 1-2 specific apps'
    },
    {
      id: 'per-user',
      name: 'Power Apps Per User',
      price: '$20',
      period: 'per user/month',
      description: 'Ideal for power users who need multiple apps',
      features: [
        'Unlimited Power Apps',
        'Premium connectors',
        'Dataverse database',
        'Advanced features',
        'Priority support'
      ],
      bestFor: 'Users needing multiple apps'
    },
    {
      id: 'office-365',
      name: 'Office 365 Included',
      price: 'Included',
      period: 'with Office 365',
      description: 'Basic Power Platform capabilities',
      features: [
        'Basic Power Apps',
        'Standard connectors only',
        'SharePoint lists as data',
        'Limited functionality'
      ],
      bestFor: 'Simple automation needs'
    }
  ];

  const smallBusinessBenefits = [
    {
      icon: FiDollarSign,
      title: 'Cost-Effective Solutions',
      description: 'Start with per-app licensing at just $5/user/month for targeted solutions'
    },
    {
      icon: FiUsers,
      title: 'Scale as You Grow',
      description: 'Begin small and expand your Power Platform usage as your business grows'
    },
    {
      icon: FiTrendingUp,
      title: 'Quick ROI',
      description: 'See immediate returns through process automation and efficiency gains'
    },
    {
      icon: FiTarget,
      title: 'No IT Overhead',
      description: 'Cloud-based solution with minimal IT infrastructure requirements'
    }
  ];

  const useCases = [
    {
      title: 'Employee Onboarding App',
      cost: '$50-150/month',
      users: '10-30 employees',
      description: 'Streamline new hire paperwork and training tracking'
    },
    {
      title: 'Expense Tracking System',
      cost: '$25-100/month',
      users: '5-20 employees',
      description: 'Digital expense submission and approval workflow'
    },
    {
      title: 'Customer Service Portal',
      cost: '$100-300/month',
      users: '20-60 customers',
      description: 'Self-service customer support and ticket tracking'
    },
    {
      title: 'Inventory Management',
      cost: '$75-200/month',
      users: '15-40 staff',
      description: 'Track inventory, orders, and supplier information'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Power Platform for Small Business
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Affordable Microsoft Power Platform solutions designed specifically for small and medium-sized businesses. 
              Start automating your processes without breaking the budget.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/calculator')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiCalculator} />
                <span>Get Your Estimate</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('pricing-plans').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Pricing Plans
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Small Businesses Choose Power Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed for businesses that need powerful solutions without enterprise complexity
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {smallBusinessBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <SafeIcon icon={benefit.icon} className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section id="pricing-plans" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Power Platform Plan
            </h2>
            <p className="text-lg text-gray-600">
              Flexible pricing options that grow with your business
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-8 border-2 ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                } transition-colors cursor-pointer`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {plan.price}
                  </div>
                  <div className="text-gray-600 text-sm">{plan.period}</div>
                </div>
                <p className="text-gray-600 mb-6 text-center">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-gray-900">Best for:</div>
                  <div className="text-sm text-gray-600">{plan.bestFor}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Small Business Solutions
            </h2>
            <p className="text-lg text-gray-600">
              See how other small businesses are using Power Platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {useCase.cost}
                  </div>
                  <div className="text-gray-600 text-sm">{useCase.users}</div>
                </div>
                <p className="text-gray-600">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Small Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a personalized cost estimate for your Power Platform project in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Start Free Calculator</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=Small Business Power Platform Consultation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiUsers} />
              <span>Talk to an Expert</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SmallBusinessCalculator;