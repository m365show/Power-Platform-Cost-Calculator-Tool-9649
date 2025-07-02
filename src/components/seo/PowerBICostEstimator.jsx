import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBarChart3, FiUsers, FiDollarSign, FiCheck, FiArrowRight, FiCalculator, FiTrendingUp, FiDatabase, FiEye, FiShare2 } = FiIcons;

function PowerBICostEstimator() {
  const navigate = useNavigate();
  const [selectedLicense, setSelectedLicense] = useState('pro');
  const [userCount, setUserCount] = useState(50);
  
  const powerBILicenses = [
    {
      id: 'pro',
      name: 'Power BI Pro',
      price: 10,
      period: 'per user/month',
      description: 'Full-featured business intelligence for individual users',
      features: [
        'Create and share dashboards',
        'Collaborate in workspaces',
        '10GB storage per user',
        'Standard refresh (8x daily)',
        'Export to Excel and PowerPoint',
        'Email subscriptions',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 1GB dataset size',
        'Standard refresh rates only',
        'No dedicated capacity'
      ],
      bestFor: 'Individual analysts and business users'
    },
    {
      id: 'premium-per-user',
      name: 'Power BI Premium Per User',
      price: 20,
      period: 'per user/month',
      description: 'Premium features without dedicated capacity',
      features: [
        'All Power BI Pro features',
        'AI-powered insights',
        'Dataflows and datasets',
        'XMLA endpoint access',
        'Deployment pipelines',
        'Multi-geo support',
        'Advanced security features'
      ],
      limitations: [
        'Still subject to capacity limits',
        'No unlimited sharing capability'
      ],
      bestFor: 'Power users needing advanced features',
      popular: true
    },
    {
      id: 'premium-capacity',
      name: 'Power BI Premium',
      price: 4995,
      period: 'per capacity/month',
      description: 'Dedicated cloud capacity for enterprise deployments',
      features: [
        'Unlimited content sharing',
        'Large datasets (>10GB)',
        'Faster refresh rates (48x daily)',
        'Advanced AI capabilities',
        'Paginated reports',
        'Multi-geo deployment',
        'Dedicated capacity management'
      ],
      limitations: [
        'High upfront cost',
        'Requires capacity planning'
      ],
      bestFor: 'Large organizations with many viewers'
    }
  ];

  const calculateMonthlyCost = () => {
    const license = powerBILicenses.find(l => l.id === selectedLicense);
    if (!license) return 0;
    
    if (selectedLicense === 'premium-capacity') {
      return license.price;
    }
    
    return license.price * userCount;
  };

  const calculateAnnualCost = () => {
    return calculateMonthlyCost() * 12;
  };

  const useCases = [
    {
      icon: FiTrendingUp,
      title: 'Sales Analytics Dashboard',
      description: 'Track sales performance, pipeline, and forecasting',
      estimatedCost: '$500-2,000/month',
      complexity: 'Medium',
      features: ['Real-time sales data', 'Pipeline visualization', 'Forecasting models', 'Territory analysis']
    },
    {
      icon: FiDatabase,
      title: 'Financial Reporting Suite',
      description: 'Comprehensive financial dashboards and reports',
      estimatedCost: '$1,000-5,000/month',
      complexity: 'High',
      features: ['P&L statements', 'Budget vs actual', 'Cash flow analysis', 'Regulatory reporting']
    },
    {
      icon: FiUsers,
      title: 'HR Analytics Platform',
      description: 'Workforce analytics and performance tracking',
      estimatedCost: '$300-1,500/month',
      complexity: 'Medium',
      features: ['Employee metrics', 'Retention analysis', 'Performance dashboards', 'Diversity reporting']
    },
    {
      icon: FiBarChart3,
      title: 'Operations Dashboard',
      description: 'Real-time operational KPIs and metrics',
      estimatedCost: '$400-2,500/month',
      complexity: 'Medium',
      features: ['KPI monitoring', 'Process optimization', 'Resource utilization', 'Quality metrics']
    }
  ];

  const comparisonFactors = [
    {
      factor: 'User Collaboration',
      pro: 'Share with Pro users only',
      premiumPerUser: 'Enhanced sharing options',
      premiumCapacity: 'Unlimited sharing to anyone'
    },
    {
      factor: 'Dataset Size',
      pro: 'Up to 1GB per dataset',
      premiumPerUser: 'Up to 1GB per dataset',
      premiumCapacity: 'Large datasets (>10GB)'
    },
    {
      factor: 'Refresh Frequency',
      pro: '8 times per day',
      premiumPerUser: '8 times per day',
      premiumCapacity: '48 times per day'
    },
    {
      factor: 'AI Features',
      pro: 'Basic insights',
      premiumPerUser: 'Advanced AI capabilities',
      premiumCapacity: 'Full AI suite + custom models'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Power BI Cost Estimator
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto"
            >
              Calculate exact Power BI licensing costs for your organization. Compare Pro, Premium Per User, and Premium Capacity options with detailed cost breakdowns.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/calculator')}
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiCalculator} />
                <span>Full Platform Calculator</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('cost-calculator').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors"
              >
                Power BI Calculator
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section id="cost-calculator" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Power BI Cost Calculator</h2>
            <p className="text-lg text-gray-600">Estimate your Power BI licensing costs instantly</p>
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
                  max="1000"
                  value={userCount}
                  onChange={(e) => setUserCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>1</span>
                  <span className="font-bold text-lg">{userCount} users</span>
                  <span>1000+</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  License Type
                </label>
                <select
                  value={selectedLicense}
                  onChange={(e) => setSelectedLicense(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="pro">Power BI Pro ($10/user/month)</option>
                  <option value="premium-per-user">Premium Per User ($20/user/month)</option>
                  <option value="premium-capacity">Premium Capacity ($4,995/month)</option>
                </select>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
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
                    ${selectedLicense === 'premium-capacity' 
                      ? Math.round(calculateMonthlyCost() / userCount).toLocaleString()
                      : powerBILicenses.find(l => l.id === selectedLicense)?.price || '0'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Power BI License Comparison</h2>
            <p className="text-lg text-gray-600">Choose the right Power BI license for your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {powerBILicenses.map((license, index) => (
              <motion.div
                key={license.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-6 border-2 relative ${
                  license.popular
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-orange-200'
                } transition-colors`}
              >
                {license.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{license.name}</h3>
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    ${license.price.toLocaleString()}
                  </div>
                  <div className="text-gray-600 text-sm">{license.period}</div>
                </div>

                <p className="text-gray-600 mb-6 text-center">{license.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {license.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {license.limitations && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Considerations:</h4>
                    <ul className="space-y-2">
                      {license.limitations.map((limitation, idx) => (
                        <li key={idx} className="text-gray-600 text-sm">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-gray-900">Best for:</div>
                  <div className="text-sm text-gray-600">{license.bestFor}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Power BI Implementation Examples</h2>
            <p className="text-lg text-gray-600">Real-world Power BI solutions and their costs</p>
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
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={useCase.icon} className="text-xl text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 mb-4">{useCase.description}</p>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {useCase.estimatedCost}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        useCase.complexity === 'High' ? 'bg-red-100 text-red-800' :
                        useCase.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {useCase.complexity} Complexity
                      </span>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Detailed License Comparison</h2>
            <p className="text-lg text-gray-600">Compare Power BI licensing options side by side</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Pro ($10)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Premium Per User ($20)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Premium Capacity ($4,995)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonFactors.map((factor, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{factor.factor}</td>
                    <td className="px-6 py-4 text-gray-700">{factor.pro}</td>
                    <td className="px-6 py-4 text-gray-700">{factor.premiumPerUser}</td>
                    <td className="px-6 py-4 text-gray-700">{factor.premiumCapacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Implement Power BI?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Get a comprehensive project estimate including Power BI development and deployment costs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Complete Project Calculator</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=Power BI Implementation Quote"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiUsers} />
              <span>Talk to Power BI Expert</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PowerBICostEstimator;