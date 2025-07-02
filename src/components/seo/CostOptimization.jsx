import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiDollarSign, FiTrendingDown, FiCheck, FiArrowRight, FiCalculator, FiTarget, FiUsers, FiZap, FiShield } = FiIcons;

function CostOptimization() {
  const navigate = useNavigate();
  const [currentSpend, setCurrentSpend] = useState(10000);
  const [userCount, setUserCount] = useState(100);

  const optimizationStrategies = [
    {
      icon: FiUsers,
      title: 'Right-Size Licensing',
      description: 'Optimize Per App vs Per User licensing based on usage patterns',
      potentialSavings: '25-40%',
      difficulty: 'Easy',
      timeToImplement: '1-2 weeks',
      strategies: [
        'Analyze actual app usage per user',
        'Switch light users to Per App licensing',
        'Use Per User for power users with multiple apps',
        'Regular license usage audits'
      ]
    },
    {
      icon: FiZap,
      title: 'Consolidate Apps',
      description: 'Combine similar apps to reduce licensing costs',
      potentialSavings: '15-30%',
      difficulty: 'Medium',
      timeToImplement: '4-8 weeks',
      strategies: [
        'Identify overlapping functionality',
        'Merge similar business processes',
        'Create unified user experiences',
        'Eliminate redundant data storage'
      ]
    },
    {
      icon: FiTarget,
      title: 'Optimize Data Storage',
      description: 'Reduce Dataverse storage costs through data management',
      potentialSavings: '20-35%',
      difficulty: 'Medium',
      timeToImplement: '3-6 weeks',
      strategies: [
        'Archive old data regularly',
        'Implement data retention policies',
        'Use SharePoint for document storage',
        'Optimize data models'
      ]
    },
    {
      icon: FiShield,
      title: 'Environment Optimization',
      description: 'Consolidate environments and reduce Premium capacity usage',
      potentialSavings: '30-50%',
      difficulty: 'Hard',
      timeToImplement: '8-12 weeks',
      strategies: [
        'Consolidate development environments',
        'Use shared environments where possible',
        'Optimize Power BI Premium usage',
        'Implement environment governance'
      ]
    }
  ];

  const costBreakdown = [
    {
      category: 'Power Apps Licensing',
      current: Math.round(currentSpend * 0.4),
      optimized: Math.round(currentSpend * 0.4 * 0.7),
      savings: Math.round(currentSpend * 0.4 * 0.3)
    },
    {
      category: 'Power BI Licensing',
      current: Math.round(currentSpend * 0.25),
      optimized: Math.round(currentSpend * 0.25 * 0.8),
      savings: Math.round(currentSpend * 0.25 * 0.2)
    },
    {
      category: 'Dataverse Storage',
      current: Math.round(currentSpend * 0.2),
      optimized: Math.round(currentSpend * 0.2 * 0.65),
      savings: Math.round(currentSpend * 0.2 * 0.35)
    },
    {
      category: 'Premium Connectors',
      current: Math.round(currentSpend * 0.1),
      optimized: Math.round(currentSpend * 0.1 * 0.9),
      savings: Math.round(currentSpend * 0.1 * 0.1)
    },
    {
      category: 'Environment Costs',
      current: Math.round(currentSpend * 0.05),
      optimized: Math.round(currentSpend * 0.05 * 0.6),
      savings: Math.round(currentSpend * 0.05 * 0.4)
    }
  ];

  const totalSavings = costBreakdown.reduce((sum, item) => sum + item.savings, 0);
  const totalOptimized = costBreakdown.reduce((sum, item) => sum + item.optimized, 0);
  const savingsPercentage = Math.round((totalSavings / currentSpend) * 100);

  const quickWins = [
    {
      title: 'License Audit',
      description: 'Review and reassign unused licenses',
      effort: 'Low',
      impact: 'High',
      timeframe: '1 week',
      savings: '10-20%'
    },
    {
      title: 'App Consolidation',
      description: 'Merge similar apps to reduce Per App licenses',
      effort: 'Medium',
      impact: 'High',
      timeframe: '2-4 weeks',
      savings: '15-25%'
    },
    {
      title: 'Data Cleanup',
      description: 'Remove unnecessary data and optimize storage',
      effort: 'Low',
      impact: 'Medium',
      timeframe: '1-2 weeks',
      savings: '5-15%'
    },
    {
      title: 'Environment Review',
      description: 'Consolidate or remove unused environments',
      effort: 'Medium',
      impact: 'Medium',
      timeframe: '2-3 weeks',
      savings: '10-30%'
    }
  ];

  const bestPractices = [
    {
      category: 'Licensing Management',
      practices: [
        'Regular license usage audits',
        'Implement license request workflows',
        'Monitor app usage analytics',
        'Set up automated alerts for unused licenses'
      ]
    },
    {
      category: 'Data Management',
      practices: [
        'Implement data retention policies',
        'Use SharePoint for document storage',
        'Archive historical data',
        'Optimize data models and relationships'
      ]
    },
    {
      category: 'Environment Governance',
      practices: [
        'Limit environment creation',
        'Regular environment cleanup',
        'Shared development environments',
        'Production environment monitoring'
      ]
    },
    {
      category: 'Cost Monitoring',
      practices: [
        'Monthly cost reviews',
        'Department-level cost allocation',
        'Trend analysis and forecasting',
        'ROI measurement and reporting'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Power Platform Cost Optimization
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-red-100 mb-8 max-w-3xl mx-auto"
            >
              Reduce your Power Platform costs by 20-50% with proven optimization strategies. Analyze current spending and implement cost-saving measures.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/calculator')}
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiCalculator} />
                <span>Cost Calculator</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('optimization-tool').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-colors"
              >
                Optimize Costs
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cost Optimization Tool */}
      <section id="optimization-tool" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cost Optimization Calculator</h2>
            <p className="text-lg text-gray-600">Input your current spending to see potential savings</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Current Situation</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Power Platform Spend: ${currentSpend.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={currentSpend}
                    onChange={(e) => setCurrentSpend(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$1K</span>
                    <span>$100K</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Users: {userCount}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="5000"
                    step="10"
                    value={userCount}
                    onChange={(e) => setUserCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>10</span>
                    <span>5,000</span>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Cost Breakdown</h4>
                <div className="space-y-3">
                  {costBreakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{item.category}</span>
                      <span className="font-medium">${item.current.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Optimization Results */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Optimization Potential</h3>
              
              <div className="mb-6 p-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg text-white text-center">
                <div className="text-sm opacity-90 mb-1">Potential Monthly Savings</div>
                <div className="text-3xl font-bold mb-1">${totalSavings.toLocaleString()}</div>
                <div className="text-sm opacity-90">{savingsPercentage}% reduction</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-red-600 mb-1">Current Cost</div>
                  <div className="text-xl font-bold text-red-700">
                    ${currentSpend.toLocaleString()}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-green-600 mb-1">Optimized Cost</div>
                  <div className="text-xl font-bold text-green-700">
                    ${totalOptimized.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Optimization Breakdown:</h4>
                {costBreakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.category}</span>
                    <span className="text-sm font-medium text-green-600">
                      -${item.savings.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Annual Savings:</strong> ${(totalSavings * 12).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optimization Strategies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Optimization Strategies</h2>
            <p className="text-lg text-gray-600">Proven methods to reduce Power Platform costs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {optimizationStrategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={strategy.icon} className="text-xl text-red-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{strategy.title}</h3>
                    <p className="text-gray-600 mb-4">{strategy.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Savings</div>
                        <div className="font-semibold text-green-600">{strategy.potentialSavings}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Difficulty</div>
                        <div className={`font-semibold ${
                          strategy.difficulty === 'Easy' ? 'text-green-600' :
                          strategy.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {strategy.difficulty}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Timeline</div>
                        <div className="font-semibold text-blue-600">{strategy.timeToImplement}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Implementation Steps:</h4>
                      <ul className="space-y-1">
                        {strategy.strategies.map((step, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <SafeIcon icon={FiCheck} className="text-green-500 text-sm mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{step}</span>
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

      {/* Quick Wins */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Wins</h2>
            <p className="text-lg text-gray-600">Immediate actions for cost reduction</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickWins.map((win, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{win.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{win.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Effort:</span>
                    <span className={`text-xs font-medium ${
                      win.effort === 'Low' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {win.effort}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Impact:</span>
                    <span className={`text-xs font-medium ${
                      win.impact === 'High' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {win.impact}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Timeframe:</span>
                    <span className="text-xs font-medium text-purple-600">{win.timeframe}</span>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <div className="text-sm font-semibold text-red-700">{win.savings} Savings</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cost Optimization Best Practices</h2>
            <p className="text-lg text-gray-600">Long-term strategies for sustainable cost management</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {bestPractices.map((category, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.practices.map((practice, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <SafeIcon icon={FiCheck} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{practice}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Costs?</h2>
          <p className="text-xl text-red-100 mb-8">
            Get expert help implementing these cost optimization strategies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Calculate Project Costs</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=Power Platform Cost Optimization Consultation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiTrendingDown} />
              <span>Optimization Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CostOptimization;