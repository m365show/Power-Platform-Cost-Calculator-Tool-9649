import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSmartphone, FiUsers, FiDollarSign, FiCheck, FiArrowRight, FiCalculator, FiDatabase, FiZap, FiSettings } = FiIcons;

function PowerAppsPricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('per-user');
  const [userCount, setUserCount] = useState(25);

  const powerAppsPlans = [
    {
      id: 'per-app',
      name: 'Power Apps Per App',
      price: 5,
      period: 'per user/month',
      description: 'Perfect for single-purpose applications',
      features: [
        'Run one specific Power App',
        'Premium connectors included',
        'Dataverse for Teams (2GB)',
        'Basic Power Automate flows',
        'Mobile and web access',
        'Standard support'
      ],
      limitations: [
        'Limited to one app per license',
        'Basic Dataverse storage',
        'Standard connectors priority'
      ],
      bestFor: 'Specific departmental apps'
    },
    {
      id: 'per-user',
      name: 'Power Apps Per User',
      price: 20,
      period: 'per user/month',
      description: 'Unlimited apps for power users',
      features: [
        'Unlimited Power Apps usage',
        'All premium connectors',
        'Dataverse database (1GB per user)',
        'Advanced Power Automate',
        'Custom connectors',
        'AI Builder credits (500/month)',
        'Priority support'
      ],
      limitations: [
        'Higher cost per user',
        'May be overkill for light users'
      ],
      bestFor: 'Power users and app makers',
      popular: true
    },
    {
      id: 'office-365',
      name: 'Office 365 Included',
      price: 0,
      period: 'included with Office 365',
      description: 'Basic Power Apps capabilities',
      features: [
        'Basic Power Apps',
        'Standard connectors only',
        'SharePoint lists as storage',
        'Basic templates',
        'Limited customization'
      ],
      limitations: [
        'No premium connectors',
        'No Dataverse access',
        'Limited functionality',
        'Basic support only'
      ],
      bestFor: 'Simple forms and workflows'
    },
    {
      id: 'teams',
      name: 'Power Apps for Teams',
      price: 0,
      period: 'included with Teams',
      description: 'Collaboration-focused apps',
      features: [
        'Apps within Teams',
        'Dataverse for Teams',
        'Teams connectors',
        'Collaboration features',
        'Basic workflows'
      ],
      limitations: [
        'Limited to Teams environment',
        'Reduced external connectivity',
        'Teams-only data storage'
      ],
      bestFor: 'Team collaboration apps'
    }
  ];

  const calculateMonthlyCost = () => {
    const plan = powerAppsPlans.find(p => p.id === selectedPlan);
    return plan ? plan.price * userCount : 0;
  };

  const calculateAnnualCost = () => {
    return calculateMonthlyCost() * 12;
  };

  const appTypes = [
    {
      icon: FiDatabase,
      title: 'Data Collection Apps',
      description: 'Forms, surveys, and data entry applications',
      examples: ['Employee onboarding', 'Customer feedback', 'Inventory tracking'],
      recommendedPlan: 'per-app'
    },
    {
      icon: FiUsers,
      title: 'Business Process Apps',
      description: 'Workflow and approval applications',
      examples: ['Expense approval', 'Leave requests', 'Purchase orders'],
      recommendedPlan: 'per-user'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Field Apps',
      description: 'Mobile-first applications for field workers',
      examples: ['Field service', 'Inspections', 'Asset management'],
      recommendedPlan: 'per-user'
    },
    {
      icon: FiSettings,
      title: 'Administrative Apps',
      description: 'Internal tools and dashboards',
      examples: ['Employee directory', 'Resource booking', 'Help desk'],
      recommendedPlan: 'per-app'
    }
  ];

  const pricingFactors = [
    {
      factor: 'Number of Apps',
      perApp: 'One app per license',
      perUser: 'Unlimited apps',
      recommendation: 'Choose Per User if you need 4+ apps per user'
    },
    {
      factor: 'Premium Connectors',
      perApp: 'Included',
      perUser: 'Included + Custom',
      recommendation: 'Both plans include premium connectors'
    },
    {
      factor: 'Data Storage',
      perApp: '2GB Dataverse for Teams',
      perUser: '1GB Dataverse per user',
      recommendation: 'Per User gives dedicated database capacity'
    },
    {
      factor: 'AI Builder',
      perApp: 'Not included',
      perUser: '500 credits/month',
      recommendation: 'Choose Per User for AI capabilities'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Power Apps Pricing Calculator
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-green-100 mb-8 max-w-3xl mx-auto"
            >
              Calculate the exact cost of Microsoft Power Apps for your organization. 
              Compare Per App vs Per User licensing and find the most cost-effective solution.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/calculator')}
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiCalculator} />
                <span>Full Calculator</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('pricing-calculator').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Quick Pricing
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Pricing Calculator */}
      <section id="pricing-calculator" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Power Apps Cost Calculator
            </h2>
            <p className="text-lg text-gray-600">
              Estimate your Power Apps licensing costs instantly
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Number of Users
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={userCount}
                  onChange={(e) => setUserCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>1</span>
                  <span className="font-bold text-lg">{userCount} users</span>
                  <span>100+</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Licensing Plan
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="per-app">Per App ($5/user/month)</option>
                  <option value="per-user">Per User ($20/user/month)</option>
                  <option value="office-365">Office 365 (Included)</option>
                  <option value="teams">Teams (Included)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-sm opacity-90">Monthly Cost</div>
                  <div className="text-3xl font-bold">
                    ${calculateMonthlyCost().toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Annual Cost</div>
                  <div className="text-3xl font-bold">
                    ${calculateAnnualCost().toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Cost per User/Month</div>
                  <div className="text-3xl font-bold">
                    ${selectedPlan === 'office-365' || selectedPlan === 'teams' ? '0' : 
                      powerAppsPlans.find(p => p.id === selectedPlan)?.price || '0'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Plans Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Power Apps Licensing Plans Comparison
            </h2>
            <p className="text-lg text-gray-600">
              Choose the right plan based on your usage patterns and requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {powerAppsPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-6 border-2 relative ${
                  plan.popular
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-green-200'
                } transition-colors`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </div>
                  <div className="text-gray-600 text-sm">{plan.period}</div>
                </div>
                
                <p className="text-gray-600 mb-6 text-center">{plan.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {plan.limitations && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="text-gray-600 text-sm">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-gray-900">Best for:</div>
                  <div className="text-sm text-gray-600">{plan.bestFor}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Power Apps Use Cases & Recommendations
            </h2>
            <p className="text-lg text-gray-600">
              See which licensing plan works best for different application types
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {appTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={type.icon} className="text-xl text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((example, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-green-900">
                        Recommended: {type.recommendedPlan === 'per-app' ? 'Per App Plan' : 'Per User Plan'}
                      </div>
                      <div className="text-sm text-green-700">
                        ${type.recommendedPlan === 'per-app' ? '5' : '20'}/user/month
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Matrix */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Per App vs Per User: Decision Matrix
            </h2>
            <p className="text-lg text-gray-600">
              Compare key factors to make the right licensing choice
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Factor</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Per App ($5)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Per User ($20)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pricingFactors.map((factor, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{factor.factor}</td>
                    <td className="px-6 py-4 text-gray-700">{factor.perApp}</td>
                    <td className="px-6 py-4 text-gray-700">{factor.perUser}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{factor.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Power Apps Solution?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Get a detailed project estimate including development costs, timeline, and licensing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Complete Project Calculator</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=Power Apps Development Quote"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiUsers} />
              <span>Talk to Power Apps Expert</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PowerAppsPricing;