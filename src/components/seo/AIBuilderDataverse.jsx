import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBrain, FiDatabase, FiZap, FiCheck, FiArrowRight, FiCalculator, FiCpu, FiLayers, FiShield } = FiIcons;

function AIBuilderDataverse() {
  const navigate = useNavigate();
  const [selectedCreditPack, setSelectedCreditPack] = useState('500');
  const [dataverseStorage, setDataverseStorage] = useState(10);

  const aiBuilderCredits = [
    {
      pack: '500',
      price: 0,
      included: 'Included with Power Apps Per User',
      description: 'Basic AI capabilities for small projects'
    },
    {
      pack: '1000',
      price: 500,
      period: 'per month',
      description: 'Enhanced AI for medium workloads'
    },
    {
      pack: '5000',
      price: 2000,
      period: 'per month',
      description: 'Advanced AI for large-scale automation'
    },
    {
      pack: '10000',
      price: 3500,
      period: 'per month',
      description: 'Enterprise-grade AI processing'
    }
  ];

  const aiCapabilities = [
    {
      icon: FiBrain,
      title: 'Prediction Models',
      description: 'Create custom machine learning models without coding',
      creditCost: '100-500 credits per model training',
      useCases: ['Sales forecasting', 'Customer churn prediction', 'Demand planning'],
      complexity: 'Medium'
    },
    {
      icon: FiCpu,
      title: 'Form Processing',
      description: 'Extract data from documents and forms automatically',
      creditCost: '1 credit per page processed',
      useCases: ['Invoice processing', 'Receipt scanning', 'Contract analysis'],
      complexity: 'Low'
    },
    {
      icon: FiZap,
      title: 'Object Detection',
      description: 'Identify and analyze objects in images',
      creditCost: '1 credit per image processed',
      useCases: ['Quality inspection', 'Inventory counting', 'Safety monitoring'],
      complexity: 'Medium'
    },
    {
      icon: FiLayers,
      title: 'Text Analytics',
      description: 'Analyze sentiment, extract key phrases, and classify text',
      creditCost: '1 credit per 1000 characters',
      useCases: ['Customer feedback analysis', 'Document classification', 'Content moderation'],
      complexity: 'Low'
    }
  ];

  const dataverseFeatures = [
    {
      icon: FiDatabase,
      title: 'Secure Data Storage',
      description: 'Enterprise-grade database with built-in security',
      pricing: '$10 per GB/month',
      features: ['Row-level security', 'Field-level security', 'Audit logging', 'Data encryption']
    },
    {
      icon: FiShield,
      title: 'Compliance & Governance',
      description: 'Meet regulatory requirements with built-in compliance',
      pricing: 'Included with licensing',
      features: ['GDPR compliance', 'HIPAA ready', 'SOC 2 certified', 'Data residency']
    },
    {
      icon: FiLayers,
      title: 'Data Integration',
      description: 'Connect and sync data from multiple sources',
      pricing: 'Varies by connector',
      features: ['Real-time sync', 'Batch processing', '500+ connectors', 'Custom APIs']
    },
    {
      icon: FiZap,
      title: 'Business Logic',
      description: 'Implement complex business rules and workflows',
      pricing: 'Included with platform',
      features: ['Calculated fields', 'Business rules', 'Workflows', 'Plugin architecture']
    }
  ];

  const pricingTiers = [
    {
      name: 'Dataverse for Teams',
      price: 'Included',
      storage: '2GB per team',
      description: 'Basic data storage for Teams apps',
      features: [
        'Integrated with Teams',
        'Basic table structure',
        'Simple relationships',
        'Standard security'
      ],
      limitations: [
        'Teams environment only',
        'Limited external access',
        'Basic customization'
      ]
    },
    {
      name: 'Dataverse',
      price: '$10',
      period: 'per GB/month',
      storage: 'Scalable',
      description: 'Full-featured enterprise database',
      features: [
        'Advanced data modeling',
        'Complex relationships',
        'Custom entities',
        'Advanced security',
        'API access',
        'Integration capabilities'
      ],
      limitations: [
        'Additional cost per GB',
        'Requires planning for scale'
      ]
    }
  ];

  const calculateAICost = () => {
    const selectedPack = aiBuilderCredits.find(pack => pack.pack === selectedCreditPack);
    return selectedPack?.price || 0;
  };

  const calculateDataverseCost = () => {
    return dataverseStorage * 10;
  };

  const getTotalMonthlyCost = () => {
    return calculateAICost() + calculateDataverseCost();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              AI Builder & Dataverse Calculator
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto"
            >
              Calculate costs for AI Builder credits and Dataverse storage. Build intelligent apps with machine learning and secure data management capabilities.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/calculator')}
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiCalculator} />
                <span>Full Platform Calculator</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('ai-calculator').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors"
              >
                AI & Data Calculator
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section id="ai-calculator" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Builder & Dataverse Cost Calculator</h2>
            <p className="text-lg text-gray-600">Estimate your monthly costs for AI capabilities and data storage</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  AI Builder Credits per Month
                </label>
                <select
                  value={selectedCreditPack}
                  onChange={(e) => setSelectedCreditPack(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {aiBuilderCredits.map(pack => (
                    <option key={pack.pack} value={pack.pack}>
                      {pack.pack} credits - {pack.price === 0 ? 'Included' : `$${pack.price}/month`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Dataverse Storage: {dataverseStorage} GB
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={dataverseStorage}
                  onChange={(e) => setDataverseStorage(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>1 GB</span>
                  <span>100 GB</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
              <div className="text-center">
                <div className="text-sm opacity-90">AI Builder Credits</div>
                <div className="text-2xl font-bold">
                  ${calculateAICost().toLocaleString()}/month
                </div>
                <div className="text-xs opacity-80">{selectedCreditPack} credits</div>
              </div>
              <div className="text-center">
                <div className="text-sm opacity-90">Dataverse Storage</div>
                <div className="text-2xl font-bold">
                  ${calculateDataverseCost().toLocaleString()}/month
                </div>
                <div className="text-xs opacity-80">{dataverseStorage} GB at $10/GB</div>
              </div>
              <div className="text-center">
                <div className="text-sm opacity-90">Total Monthly Cost</div>
                <div className="text-3xl font-bold">
                  ${getTotalMonthlyCost().toLocaleString()}
                </div>
                <div className="text-xs opacity-80">AI + Data combined</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Builder Capabilities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Builder Capabilities</h2>
            <p className="text-lg text-gray-600">Powerful AI features to enhance your business applications</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={capability.icon} className="text-xl text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{capability.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded ${
                        capability.complexity === 'High' ? 'bg-red-100 text-red-700' :
                        capability.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {capability.complexity}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{capability.description}</p>
                    
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-900">Credit Cost: </span>
                      <span className="text-sm text-indigo-600 font-medium">{capability.creditCost}</span>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Common Use Cases:</h4>
                      <div className="flex flex-wrap gap-2">
                        {capability.useCases.map((useCase, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {useCase}
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

      {/* Dataverse Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dataverse Capabilities</h2>
            <p className="text-lg text-gray-600">Enterprise-grade data platform for your business applications</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {dataverseFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={feature.icon} className="text-xl text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-3">{feature.description}</p>
                    
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-900">Pricing: </span>
                      <span className="text-sm text-purple-600 font-medium">{feature.pricing}</span>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <SafeIcon icon={FiCheck} className="text-green-500 text-sm" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dataverse Pricing Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dataverse Pricing Options</h2>
            <p className="text-lg text-gray-600">Choose the right data storage solution for your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-200"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {tier.price}
                  </div>
                  {tier.period && <div className="text-gray-600 text-sm">{tier.period}</div>}
                  <div className="text-sm text-gray-600 mt-1">Storage: {tier.storage}</div>
                </div>

                <p className="text-gray-600 text-center mb-6">{tier.description}</p>

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

                {tier.limitations && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {tier.limitations.map((limitation, idx) => (
                        <li key={idx} className="text-gray-600 text-sm">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Usage Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Builder Credit Usage Guide</h2>
            <p className="text-lg text-gray-600">Understand how credits are consumed for different AI operations</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">AI Model Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Credit Cost</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Example Usage</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Monthly Estimate (500 credits)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Form Processing</td>
                  <td className="px-6 py-4 text-sm text-gray-700">1 credit per page</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Invoice processing</td>
                  <td className="px-6 py-4 text-sm text-green-600">500 pages/month</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Object Detection</td>
                  <td className="px-6 py-4 text-sm text-gray-700">1 credit per image</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Quality inspection</td>
                  <td className="px-6 py-4 text-sm text-green-600">500 images/month</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Prediction Model</td>
                  <td className="px-6 py-4 text-sm text-gray-700">1 credit per prediction</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Sales forecasting</td>
                  <td className="px-6 py-4 text-sm text-green-600">500 predictions/month</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Text Classification</td>
                  <td className="px-6 py-4 text-sm text-gray-700">1 credit per 1000 chars</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Document categorization</td>
                  <td className="px-6 py-4 text-sm text-green-600">500,000 characters/month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Intelligent Applications?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Get a complete project estimate including AI Builder and Dataverse implementation costs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Complete Project Calculator</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=AI Builder & Dataverse Consultation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiBrain} />
              <span>AI Strategy Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AIBuilderDataverse;