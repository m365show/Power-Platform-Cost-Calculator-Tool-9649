import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiShield, FiUsers, FiSettings, FiTrendingUp, FiCheck, FiArrowRight, FiCalculator, FiDatabase, FiLock, FiGlobe } = FiIcons;

function EnterpriseLicensing() {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState('premium');

  const enterpriseTiers = [
    {
      id: 'premium',
      name: 'Power Platform Premium',
      price: '$20',
      period: 'per user/month',
      description: 'Full Power Platform capabilities for enterprise users',
      features: [
        'Unlimited Power Apps usage',
        'Premium connectors included',
        'Dataverse database (1GB per user)',
        'Power Automate flows',
        'AI Builder credits (500/month)',
        'Advanced security & compliance',
        '24/7 enterprise support'
      ],
      bestFor: 'Power users and developers',
      popular: true
    },
    {
      id: 'per-app',
      name: 'Power Apps Per App Plan',
      price: '$5',
      period: 'per user/month',
      description: 'Cost-effective for specific application usage',
      features: [
        'Access to one specific app',
        'Premium connectors',
        'Dataverse for Teams (2GB)',
        'Basic Power Automate',
        'Standard support',
        'Enterprise security'
      ],
      bestFor: 'Targeted app deployment'
    },
    {
      id: 'power-bi-pro',
      name: 'Power BI Pro',
      price: '$10',
      period: 'per user/month',
      description: 'Business intelligence for enterprise teams',
      features: [
        'Power BI Pro capabilities',
        'Share dashboards & reports',
        'Collaborate on workspaces',
        '10GB storage per user',
        'Standard refresh rates',
        'Enterprise security'
      ],
      bestFor: 'Business intelligence teams'
    },
    {
      id: 'power-bi-premium',
      name: 'Power BI Premium',
      price: '$4,995',
      period: 'per capacity/month',
      description: 'Advanced BI with dedicated capacity',
      features: [
        'Dedicated cloud capacity',
        'Unlimited content sharing',
        'Advanced AI capabilities',
        'Automated machine learning',
        'Large dataset support (>1GB)',
        'Enhanced refresh rates',
        'Premium features & APIs'
      ],
      bestFor: 'Large-scale BI deployments'
    }
  ];

  const enterpriseFeatures = [
    {
      icon: FiShield,
      title: 'Enterprise Security',
      description: 'Advanced security, compliance, and governance features for large organizations'
    },
    {
      icon: FiUsers,
      title: 'User Management',
      description: 'Centralized user management with Azure Active Directory integration'
    },
    {
      icon: FiDatabase,
      title: 'Dataverse Enterprise',
      description: 'Scalable data platform with advanced security and compliance'
    },
    {
      icon: FiSettings,
      title: 'Admin Controls',
      description: 'Comprehensive admin center with detailed usage analytics and controls'
    },
    {
      icon: FiLock,
      title: 'Data Loss Prevention',
      description: 'Prevent sensitive data from leaving your organization'
    },
    {
      icon: FiGlobe,
      title: 'Global Deployment',
      description: 'Multi-region deployment with data residency compliance'
    }
  ];

  const licensingScenarios = [
    {
      title: '500-User Manufacturing Company',
      scenario: 'Mixed usage across departments',
      recommendation: '200 Premium + 300 Per App licenses',
      monthlyCost: '$5,500',
      annualCost: '$66,000',
      description: 'Premium for power users, Per App for specific department applications'
    },
    {
      title: '2,000-User Financial Services',
      scenario: 'Heavy Power BI usage with compliance needs',
      recommendation: 'Premium capacity + 1,500 Pro licenses',
      monthlyCost: '$19,995',
      annualCost: '$239,940',
      description: 'Dedicated capacity for performance with individual Pro access'
    },
    {
      title: '10,000-User Global Corporation',
      scenario: 'Enterprise-wide digital transformation',
      recommendation: 'Multiple Premium capacities + mixed licensing',
      monthlyCost: '$75,000+',
      annualCost: '$900,000+',
      description: 'Complex multi-region deployment with various licensing strategies'
    }
  ];

  const complianceStandards = [
    'SOC 1, SOC 2, SOC 3',
    'ISO 27001, ISO 27018',
    'HIPAA, HITECH',
    'GDPR, CCPA',
    'FedRAMP (Government)',
    'FISMA (Federal)',
    'PCI DSS',
    'FERPA (Education)'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Enterprise Power Platform Licensing
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto"
            >
              Navigate complex Power Platform licensing for large organizations. 
              Get enterprise-grade security, compliance, and scalability with optimized cost structure.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/calculator')}
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiCalculator} />
                <span>Enterprise Calculator</span>
              </button>
              <a
                href="mailto:pp@m365.show?subject=Enterprise Power Platform Consultation"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiUsers} />
                <span>Enterprise Consultation</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Capabilities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced features designed for large-scale deployments and complex organizational needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <SafeIcon icon={feature.icon} className="text-xl text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Licensing Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise Licensing Options
            </h2>
            <p className="text-lg text-gray-600">
              Choose the right combination for your organization's needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enterpriseTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-6 border-2 relative ${
                  tier.popular
                    ? 'border-purple-500 bg-purple-50'
                    : selectedTier === tier.id
                    ? 'border-purple-300 bg-purple-25'
                    : 'border-gray-200 bg-white hover:border-purple-200'
                } transition-colors cursor-pointer`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {tier.price}
                  </div>
                  <div className="text-gray-600 text-sm">{tier.period}</div>
                </div>
                <p className="text-gray-600 mb-4 text-sm text-center">{tier.description}</p>
                <ul className="space-y-2 mb-4">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-gray-100 rounded-lg p-2 text-center">
                  <div className="text-xs font-medium text-gray-900">Best for:</div>
                  <div className="text-xs text-gray-600">{tier.bestFor}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Licensing Scenarios */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise Licensing Scenarios
            </h2>
            <p className="text-lg text-gray-600">
              Real-world examples of how enterprises optimize their Power Platform licensing
            </p>
          </div>
          <div className="space-y-6">
            {licensingScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{scenario.title}</h3>
                    <p className="text-gray-600">{scenario.scenario}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Recommendation</div>
                    <div className="text-lg font-semibold text-purple-600">{scenario.recommendation}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Monthly Cost</div>
                    <div className="text-2xl font-bold text-green-600">{scenario.monthlyCost}</div>
                    <div className="text-sm text-gray-600">Annual: {scenario.annualCost}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Strategy</div>
                    <p className="text-sm text-gray-600">{scenario.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise Compliance & Security
            </h2>
            <p className="text-lg text-gray-600">
              Meet the highest industry standards for security and compliance
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {complianceStandards.map((standard, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 text-center border border-gray-200"
                >
                  <div className="font-medium text-gray-900">{standard}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Enterprise Power Platform?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get expert guidance on licensing strategy and implementation for your organization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Enterprise Calculator</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=Enterprise Power Platform Strategy Consultation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiUsers} />
              <span>Strategy Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EnterpriseLicensing;