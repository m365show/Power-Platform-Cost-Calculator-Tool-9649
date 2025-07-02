import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiLayers, FiDatabase, FiCheck, FiArrowRight, FiCalculator, FiCloud, FiUsers, FiZap, FiShield } = FiIcons;

function IntegrationCosts() {
  const navigate = useNavigate();
  const [selectedIntegrations, setSelectedIntegrations] = useState([]);
  const [userCount, setUserCount] = useState(100);
  const [complexityLevel, setComplexityLevel] = useState('medium');

  const integrationOptions = [
    {
      id: 'dynamics-365',
      name: 'Dynamics 365',
      category: 'Microsoft',
      baseCost: 15000,
      monthlyCost: 500,
      complexity: 'high',
      timeframe: '8-12 weeks',
      description: 'Full CRM/ERP integration with bidirectional data sync',
      features: ['Real-time data sync', 'Workflow automation', 'Custom entities', 'Advanced reporting'],
      useCases: ['Sales automation', 'Customer service', 'Financial management', 'Supply chain']
    },
    {
      id: 'office-365',
      name: 'Office 365 Suite',
      category: 'Microsoft',
      baseCost: 5000,
      monthlyCost: 200,
      complexity: 'low',
      timeframe: '2-4 weeks',
      description: 'Deep integration with Teams, Outlook, SharePoint, and OneDrive',
      features: ['Email automation', 'Document management', 'Calendar sync', 'Teams integration'],
      useCases: ['Document workflows', 'Email processing', 'Meeting automation', 'File management']
    },
    {
      id: 'azure-ad',
      name: 'Azure Active Directory',
      category: 'Microsoft',
      baseCost: 3000,
      monthlyCost: 100,
      complexity: 'medium',
      timeframe: '3-5 weeks',
      description: 'Identity and access management integration',
      features: ['Single sign-on', 'User provisioning', 'Security groups', 'Conditional access'],
      useCases: ['User management', 'Security compliance', 'Access control', 'Identity governance']
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      category: 'Third-party',
      baseCost: 12000,
      monthlyCost: 800,
      complexity: 'high',
      timeframe: '6-10 weeks',
      description: 'Comprehensive CRM integration with Salesforce platform',
      features: ['Lead management', 'Opportunity tracking', 'Custom objects', 'Workflow sync'],
      useCases: ['Sales processes', 'Lead generation', 'Customer tracking', 'Pipeline management']
    },
    {
      id: 'sap',
      name: 'SAP ERP',
      category: 'Enterprise',
      baseCost: 25000,
      monthlyCost: 1200,
      complexity: 'high',
      timeframe: '12-20 weeks',
      description: 'Enterprise resource planning system integration',
      features: ['Financial data sync', 'HR integration', 'Supply chain', 'Manufacturing data'],
      useCases: ['Financial reporting', 'HR processes', 'Inventory management', 'Production planning']
    },
    {
      id: 'oracle',
      name: 'Oracle Database',
      category: 'Enterprise',
      baseCost: 18000,
      monthlyCost: 900,
      complexity: 'high',
      timeframe: '8-14 weeks',
      description: 'Enterprise database integration with Oracle systems',
      features: ['Data warehousing', 'Complex queries', 'Stored procedures', 'Real-time sync'],
      useCases: ['Data analytics', 'Reporting', 'Business intelligence', 'Data migration']
    },
    {
      id: 'servicenow',
      name: 'ServiceNow',
      category: 'Third-party',
      baseCost: 15000,
      monthlyCost: 700,
      complexity: 'medium',
      timeframe: '6-8 weeks',
      description: 'IT service management and workflow automation',
      features: ['Incident management', 'Change requests', 'Asset tracking', 'Workflow automation'],
      useCases: ['IT service desk', 'Asset management', 'Change management', 'Service requests']
    },
    {
      id: 'workday',
      name: 'Workday HCM',
      category: 'Third-party',
      baseCost: 20000,
      monthlyCost: 1000,
      complexity: 'high',
      timeframe: '10-16 weeks',
      description: 'Human capital management system integration',
      features: ['Employee data sync', 'Payroll integration', 'Performance management', 'Benefits'],
      useCases: ['HR processes', 'Employee onboarding', 'Performance reviews', 'Payroll automation']
    }
  ];

  const complexityMultipliers = {
    low: { multiplier: 0.8, description: 'Simple data sync, standard connectors' },
    medium: { multiplier: 1.0, description: 'Custom logic, moderate complexity' },
    high: { multiplier: 1.5, description: 'Complex workflows, custom development' },
    enterprise: { multiplier: 2.0, description: 'Mission-critical, high availability' }
  };

  const calculateIntegrationCost = () => {
    const selected = integrationOptions.filter(option => selectedIntegrations.includes(option.id));
    const multiplier = complexityMultipliers[complexityLevel].multiplier;
    const userMultiplier = Math.min(1 + (userCount - 100) / 1000, 2.0);

    let totalBaseCost = 0;
    let totalMonthlyCost = 0;

    selected.forEach(integration => {
      totalBaseCost += integration.baseCost * multiplier * userMultiplier;
      totalMonthlyCost += integration.monthlyCost * multiplier * userMultiplier;
    });

    return {
      baseCost: Math.round(totalBaseCost),
      monthlyCost: Math.round(totalMonthlyCost),
      annualCost: Math.round(totalMonthlyCost * 12),
      totalFirstYear: Math.round(totalBaseCost + (totalMonthlyCost * 12))
    };
  };

  const toggleIntegration = (integrationId) => {
    setSelectedIntegrations(prev => 
      prev.includes(integrationId)
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    );
  };

  const costs = calculateIntegrationCost();

  const integrationBenefits = [
    {
      icon: FiDatabase,
      title: 'Unified Data Access',
      description: 'Single source of truth across all business systems',
      value: 'Reduce data silos by 80%'
    },
    {
      icon: FiZap,
      title: 'Process Automation',
      description: 'Automate workflows between systems',
      value: 'Save 15-20 hours/week per user'
    },
    {
      icon: FiUsers,
      title: 'Improved User Experience',
      description: 'Seamless experience across platforms',
      value: '40% increase in user adoption'
    },
    {
      icon: FiShield,
      title: 'Enhanced Security',
      description: 'Centralized security and compliance',
      value: 'Reduce security incidents by 60%'
    }
  ];

  const implementationPhases = [
    {
      phase: 'Discovery & Planning',
      duration: '2-3 weeks',
      activities: ['Requirements analysis', 'System assessment', 'Integration design', 'Timeline planning'],
      deliverables: ['Integration architecture', 'Project plan', 'Risk assessment']
    },
    {
      phase: 'Development & Configuration',
      duration: '4-8 weeks',
      activities: ['Connector development', 'Data mapping', 'Business logic', 'Testing environment'],
      deliverables: ['Integration components', 'Data flows', 'Test scenarios']
    },
    {
      phase: 'Testing & Validation',
      duration: '2-3 weeks',
      activities: ['Unit testing', 'Integration testing', 'User acceptance', 'Performance testing'],
      deliverables: ['Test reports', 'Performance metrics', 'User feedback']
    },
    {
      phase: 'Deployment & Go-Live',
      duration: '1-2 weeks',
      activities: ['Production deployment', 'User training', 'Monitoring setup', 'Support handover'],
      deliverables: ['Live system', 'Training materials', 'Support documentation']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Power Platform Integration Costs
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Calculate integration costs for connecting Power Platform with your existing systems. From Dynamics 365 to third-party applications.
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
                <span>Full Project Calculator</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('integration-calculator').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Calculate Integration Costs
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Calculator */}
      <section id="integration-calculator" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Integration Cost Calculator</h2>
            <p className="text-lg text-gray-600">Select your integrations and see estimated costs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configuration */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Project Configuration</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Users: {userCount}
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="5000"
                      value={userCount}
                      onChange={(e) => setUserCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complexity Level
                    </label>
                    <select
                      value={complexityLevel}
                      onChange={(e) => setComplexityLevel(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Object.entries(complexityMultipliers).map(([key, value]) => (
                        <option key={key} value={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)} - {value.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Integration Options */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Select Integrations</h3>
                
                <div className="grid gap-4">
                  {integrationOptions.map((integration) => (
                    <div
                      key={integration.id}
                      onClick={() => toggleIntegration(integration.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedIntegrations.includes(integration.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{integration.name}</h4>
                            <span className={`px-2 py-1 text-xs rounded ${
                              integration.category === 'Microsoft' ? 'bg-blue-100 text-blue-800' :
                              integration.category === 'Third-party' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {integration.category}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded ${
                              integration.complexity === 'low' ? 'bg-green-100 text-green-800' :
                              integration.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {integration.complexity} complexity
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{integration.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Base Cost:</strong> ${integration.baseCost.toLocaleString()}
                            </div>
                            <div>
                              <strong>Monthly:</strong> ${integration.monthlyCost.toLocaleString()}
                            </div>
                            <div>
                              <strong>Timeframe:</strong> {integration.timeframe}
                            </div>
                            <div>
                              <strong>Use Cases:</strong> {integration.useCases.slice(0, 2).join(', ')}
                            </div>
                          </div>
                        </div>
                        
                        {selectedIntegrations.includes(integration.id) && (
                          <SafeIcon icon={FiCheck} className="text-blue-500 text-xl ml-4" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cost Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-blue-600 mb-1">Implementation Cost</div>
                    <div className="text-2xl font-bold text-blue-700">
                      ${costs.baseCost.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-green-600 mb-1">Monthly Ongoing</div>
                    <div className="text-2xl font-bold text-green-700">
                      ${costs.monthlyCost.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-purple-600 mb-1">First Year Total</div>
                    <div className="text-2xl font-bold text-purple-700">
                      ${costs.totalFirstYear.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Selected Integrations:</h4>
                  {selectedIntegrations.length === 0 ? (
                    <p className="text-gray-500 text-sm">No integrations selected</p>
                  ) : (
                    <ul className="space-y-1">
                      {selectedIntegrations.map(id => {
                        const integration = integrationOptions.find(opt => opt.id === id);
                        return (
                          <li key={id} className="text-sm text-gray-700">
                            • {integration?.name}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => navigate('/calculator')}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Get Complete Estimate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Integration Benefits</h2>
            <p className="text-lg text-gray-600">Why integrate Power Platform with your existing systems</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {integrationBenefits.map((benefit, index) => (
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
                <p className="text-gray-600 mb-2">{benefit.description}</p>
                <p className="text-sm font-medium text-blue-600">{benefit.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Phases */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Implementation Process</h2>
            <p className="text-lg text-gray-600">Our proven approach to Power Platform integrations</p>
          </div>

          <div className="grid gap-8">
            {implementationPhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-200"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{phase.phase}</h3>
                      <p className="text-blue-600 font-medium">{phase.duration}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Activities:</h4>
                      <ul className="space-y-1">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {activity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Deliverables:</h4>
                      <ul className="space-y-1">
                        {phase.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {deliverable}</li>
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Integrate Your Systems?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get expert help planning and implementing your Power Platform integrations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Complete Project Calculator</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=Power Platform Integration Consultation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiLayers} />
              <span>Integration Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IntegrationCosts;