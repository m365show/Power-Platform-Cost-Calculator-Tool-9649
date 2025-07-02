import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiShield, FiUsers, FiCheck, FiArrowRight, FiCalculator, FiFlag, FiLock, FiFileText, FiGlobe } = FiIcons;

function GovernmentPricing() {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState('gcc');
  const [userCount, setUserCount] = useState(100);

  const governmentTiers = [
    {
      id: 'gcc',
      name: 'Government Community Cloud (GCC)',
      description: 'For US federal, state, and local government',
      priceMultiplier: 1.2,
      features: [
        'FedRAMP Moderate authorized',
        'US citizen admin requirements',
        'Isolated from commercial cloud',
        'CJIS compliant',
        'IRS 1075 compliant'
      ],
      compliance: ['FedRAMP Moderate', 'CJIS', 'IRS 1075', 'FISMA'],
      dataResidency: 'United States'
    },
    {
      id: 'gcc-high',
      name: 'Government Community Cloud High (GCC High)',
      description: 'For DoD and federal agencies with higher security needs',
      priceMultiplier: 2.0,
      features: [
        'FedRAMP High authorized',
        'DoD Impact Level 4 & 5',
        'Controlled Unclassified Information (CUI)',
        'ITAR compliance ready',
        'Enhanced security controls'
      ],
      compliance: ['FedRAMP High', 'DoD IL4/IL5', 'ITAR', 'DFARS'],
      dataResidency: 'United States (Government Cloud)'
    },
    {
      id: 'dod',
      name: 'DoD Environment',
      description: 'For Department of Defense with classified data',
      priceMultiplier: 3.0,
      features: [
        'DoD Impact Level 6',
        'Secret classification level',
        'Air-gapped environment',
        'Maximum security controls',
        'Dedicated infrastructure'
      ],
      compliance: ['DoD IL6', 'Secret Classification', 'NIST 800-171'],
      dataResidency: 'DoD Dedicated Environment'
    }
  ];

  const governmentUseCases = [
    {
      icon: FiUsers,
      title: 'Citizen Services Portal',
      description: 'Self-service portal for citizen requests and applications',
      estimatedUsers: '1,000-10,000',
      complexity: 'Medium',
      complianceNeeds: ['Section 508', 'WCAG 2.1', 'Privacy Act'],
      features: ['Form processing', 'Document upload', 'Status tracking', 'Multi-language support']
    },
    {
      icon: FiFileText,
      title: 'Grant Management System',
      description: 'End-to-end grant lifecycle management',
      estimatedUsers: '50-500',
      complexity: 'High',
      complianceNeeds: ['Federal Financial Management', 'Audit Requirements'],
      features: ['Application processing', 'Approval workflows', 'Financial tracking', 'Reporting']
    },
    {
      icon: FiShield,
      title: 'Emergency Response Coordination',
      description: 'Real-time emergency management and response',
      estimatedUsers: '100-1,000',
      complexity: 'High',
      complianceNeeds: ['NIMS', 'ICS Standards', 'FEMA Requirements'],
      features: ['Incident tracking', 'Resource management', 'Communication tools', 'GIS integration']
    },
    {
      icon: FiLock,
      title: 'Personnel Security Management',
      description: 'Security clearance and personnel tracking',
      estimatedUsers: '200-2,000',
      complexity: 'High',
      complianceNeeds: ['Security Executive Agent Directive', 'SF-86 Processing'],
      features: ['Clearance tracking', 'Investigation management', 'Renewal automation', 'Reporting']
    }
  ];

  const complianceFrameworks = [
    {
      name: 'FedRAMP',
      description: 'Federal Risk and Authorization Management Program',
      levels: ['Low', 'Moderate', 'High'],
      applicability: 'All federal agencies'
    },
    {
      name: 'FISMA',
      description: 'Federal Information Security Management Act',
      levels: ['Low', 'Moderate', 'High'],
      applicability: 'Federal information systems'
    },
    {
      name: 'NIST 800-171',
      description: 'Protecting Controlled Unclassified Information',
      levels: ['Basic', 'Derived', 'Enhanced'],
      applicability: 'DoD contractors and CUI handling'
    },
    {
      name: 'CJIS',
      description: 'Criminal Justice Information Services',
      levels: ['Security Policy'],
      applicability: 'Law enforcement agencies'
    }
  ];

  const calculateMonthlyCost = () => {
    const selectedGovTier = governmentTiers.find(tier => tier.id === selectedTier);
    const baseCostPerUser = 20; // Power Apps Per User base price
    const govPricing = baseCostPerUser * selectedGovTier.priceMultiplier;
    return userCount * govPricing;
  };

  const calculateAnnualCost = () => {
    return calculateMonthlyCost() * 12;
  };

  const getEstimatedSavings = () => {
    // Government often gets volume discounts for large deployments
    if (userCount >= 500) {
      return calculateAnnualCost() * 0.15; // 15% volume discount
    } else if (userCount >= 100) {
      return calculateAnnualCost() * 0.10; // 10% volume discount
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Government Power Platform Pricing
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Specialized Power Platform pricing for federal, state, and local government agencies. FedRAMP authorized with compliance-ready solutions.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/calculator')}
                className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiCalculator} />
                <span>Government Calculator</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('gov-pricing').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-800 transition-colors"
              >
                View Pricing Tiers
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Government Pricing Calculator */}
      <section id="gov-pricing" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Government Pricing Calculator</h2>
            <p className="text-lg text-gray-600">Calculate costs for government-specific Power Platform deployments</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Number of Government Users: {userCount}
                </label>
                <input
                  type="range"
                  min="10"
                  max="10000"
                  value={userCount}
                  onChange={(e) => setUserCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>10</span>
                  <span>10,000+</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Government Cloud Tier
                </label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {governmentTiers.map(tier => (
                    <option key={tier.id} value={tier.id}>
                      {tier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white">
              <div className="text-center">
                <div className="text-sm opacity-90">Monthly Cost</div>
                <div className="text-2xl font-bold">
                  ${calculateMonthlyCost().toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm opacity-90">Annual Cost</div>
                <div className="text-2xl font-bold">
                  ${calculateAnnualCost().toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm opacity-90">Cost per User/Month</div>
                <div className="text-2xl font-bold">
                  ${Math.round(calculateMonthlyCost() / userCount)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm opacity-90">Volume Savings</div>
                <div className="text-2xl font-bold text-green-200">
                  ${Math.round(getEstimatedSavings()).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Government Cloud Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Government Cloud Options</h2>
            <p className="text-lg text-gray-600">Choose the right compliance level for your agency</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {governmentTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-6 border-2 ${
                  selectedTier === tier.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-200'
                } transition-colors cursor-pointer`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {tier.priceMultiplier}x pricing
                  </div>
                  <div className="text-gray-600 text-sm">vs commercial pricing</div>
                </div>

                <p className="text-gray-600 mb-6 text-center">{tier.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Compliance:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tier.compliance.map((comp, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium text-gray-900">Data Residency:</div>
                  <div className="text-sm text-gray-700">{tier.dataResidency}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Government Use Cases</h2>
            <p className="text-lg text-gray-600">Common Power Platform implementations in government</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {governmentUseCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={useCase.icon} className="text-xl text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 mb-4">{useCase.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Estimated Users: </span>
                        <span className="text-sm text-blue-600">{useCase.estimatedUsers}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Complexity: </span>
                        <span className={`text-sm ${
                          useCase.complexity === 'High' ? 'text-red-600' : 
                          useCase.complexity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {useCase.complexity}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Compliance Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.complianceNeeds.map((compliance, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs"
                          >
                            {compliance}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
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

      {/* Compliance Frameworks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Government Compliance Frameworks</h2>
            <p className="text-lg text-gray-600">Understanding the regulatory landscape</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {complianceFrameworks.map((framework, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{framework.name}</h3>
                <p className="text-gray-600 mb-4">{framework.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Security Levels:</h4>
                  <div className="flex flex-wrap gap-2">
                    {framework.levels.map((level, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Applicability:</h4>
                  <p className="text-sm text-gray-700">{framework.applicability}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Benefits */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Government-Specific Benefits</h2>
            <p className="text-lg text-gray-600">Why government agencies choose Power Platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <SafeIcon icon={FiShield} className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Security First</h3>
              <p className="text-gray-600">FedRAMP authorized with continuous monitoring and government-grade security controls</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <SafeIcon icon={FiFlag} className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Citizen-Focused</h3>
              <p className="text-gray-600">Build citizen-facing applications with accessibility compliance and multi-language support</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <SafeIcon icon={FiGlobe} className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Sovereignty</h3>
              <p className="text-gray-600">Keep sensitive government data within US boundaries with guaranteed data residency</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Modernize Government Services?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get a comprehensive government-specific Power Platform implementation estimate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Government Project Calculator</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=Government Power Platform Implementation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-800 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiShield} />
              <span>Government Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GovernmentPricing;