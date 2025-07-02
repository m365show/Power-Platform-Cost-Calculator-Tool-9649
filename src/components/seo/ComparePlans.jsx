import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheck, FiX, FiArrowRight, FiCalculator, FiUsers, FiDollarSign, FiInfo, FiTrendingUp } = FiIcons;

function ComparePlans() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(25);
  const [appCount, setAppCount] = useState(3);

  const plans = [
    {
      id: 'per-app',
      name: 'Power Apps Per App',
      price: 5,
      period: 'per user/month',
      description: 'Pay per app, per user',
      color: 'blue',
      pros: [
        'Lower cost for single-app scenarios',
        'Premium connectors included',
        'Dataverse for Teams storage',
        'Easy to budget and scale',
        'No commitment to multiple apps'
      ],
      cons: [
        'Costs add up with multiple apps',
        'Limited to specific applications',
        'Less cost-effective for power users'
      ],
      bestFor: 'Organizations with specific, single-purpose applications',
      includes: [
        'Run one specific Power App',
        'Premium connectors',
        '2GB Dataverse for Teams',
        'Basic Power Automate',
        'Mobile and web access',
        'Standard support'
      ]
    },
    {
      id: 'per-user',
      name: 'Power Apps Per User',
      price: 20,
      period: 'per user/month',
      description: 'Unlimited apps per user',
      color: 'green',
      popular: true,
      pros: [
        'Unlimited app access',
        'Better for power users',
        'Advanced features included',
        'AI Builder credits included',
        'Comprehensive platform access'
      ],
      cons: [
        'Higher upfront cost',
        'May be overkill for light users',
        'Fixed cost regardless of usage'
      ],
      bestFor: 'Power users who need multiple apps and advanced features',
      includes: [
        'Unlimited Power Apps',
        'All premium connectors',
        '1GB Dataverse per user',
        'Advanced Power Automate',
        'AI Builder (500 credits/month)',
        'Custom connectors',
        'Priority support'
      ]
    }
  ];

  const calculatePerAppCost = () => {
    return userCount * appCount * 5;
  };

  const calculatePerUserCost = () => {
    return userCount * 20;
  };

  const getRecommendation = () => {
    const perAppCost = calculatePerAppCost();
    const perUserCost = calculatePerUserCost();
    const breakEvenApps = 4;

    if (appCount >= breakEvenApps) {
      return {
        plan: 'per-user',
        reason: `With ${appCount} apps, Per User is more cost-effective`,
        savings: perAppCost - perUserCost
      };
    } else {
      return {
        plan: 'per-app',
        reason: `With ${appCount} apps, Per App is more cost-effective`,
        savings: perUserCost - perAppCost
      };
    }
  };

  const comparisonMatrix = [
    {
      feature: 'Number of Apps',
      perApp: 'One app per license',
      perUser: 'Unlimited apps',
      winner: 'per-user'
    },
    {
      feature: 'Premium Connectors',
      perApp: 'Included',
      perUser: 'Included + Custom',
      winner: 'per-user'
    },
    {
      feature: 'Data Storage',
      perApp: '2GB Dataverse for Teams',
      perUser: '1GB Dataverse per user',
      winner: 'tie'
    },
    {
      feature: 'AI Builder',
      perApp: 'Not included',
      perUser: '500 credits/month',
      winner: 'per-user'
    },
    {
      feature: 'Cost for 1 App',
      perApp: '$5/user/month',
      perUser: '$20/user/month',
      winner: 'per-app'
    },
    {
      feature: 'Cost for 4+ Apps',
      perApp: '$20+ per user/month',
      perUser: '$20/user/month',
      winner: 'per-user'
    }
  ];

  const scenarios = [
    {
      title: 'Small Department (10 users, 1 app)',
      description: 'Single expense tracking app for finance team',
      perAppCost: 50,
      perUserCost: 200,
      recommendation: 'per-app',
      savings: 150
    },
    {
      title: 'Growing Team (25 users, 3 apps)',
      description: 'HR, Project Management, and Inventory apps',
      perAppCost: 375,
      perUserCost: 500,
      recommendation: 'per-app',
      savings: 125
    },
    {
      title: 'Power Users (25 users, 5+ apps)',
      description: 'Multiple business apps with advanced features',
      perAppCost: 625,
      perUserCost: 500,
      recommendation: 'per-user',
      savings: 125
    },
    {
      title: 'Enterprise (100 users, 6+ apps)',
      description: 'Company-wide digital transformation',
      perAppCost: 3000,
      perUserCost: 2000,
      recommendation: 'per-user',
      savings: 1000
    }
  ];

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Per App vs Per User Pricing
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto"
            >
              Compare Power Apps licensing models and find the most cost-effective solution for your organization. Get detailed breakdowns and recommendations.
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
                <span>Full Project Calculator</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('comparison-tool').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                Compare Plans Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Comparison Tool */}
      <section id="comparison-tool" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Cost Comparison</h2>
            <p className="text-lg text-gray-600">Adjust the sliders to see which plan works best for you</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Number of Users: {userCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={userCount}
                  onChange={(e) => setUserCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Number of Apps: {appCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={appCount}
                  onChange={(e) => setAppCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Per App Plan</h3>
                <div className="text-3xl font-bold text-blue-600">
                  ${calculatePerAppCost().toLocaleString()}/month
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  {userCount} users × {appCount} apps × $5
                </div>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-2">Per User Plan</h3>
                <div className="text-3xl font-bold text-green-600">
                  ${calculatePerUserCost().toLocaleString()}/month
                </div>
                <div className="text-sm text-green-700 mt-1">
                  {userCount} users × $20
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg text-center ${
              recommendation.plan === 'per-user' ? 'bg-green-100 border-2 border-green-500' : 'bg-blue-100 border-2 border-blue-500'
            }`}>
              <h3 className="text-xl font-bold mb-2">💡 Recommendation</h3>
              <p className="text-lg mb-2">{recommendation.reason}</p>
              <p className="text-sm">
                You could save <strong>${Math.abs(recommendation.savings).toLocaleString()}/month</strong> with the {recommendation.plan === 'per-user' ? 'Per User' : 'Per App'} plan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Plan Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Detailed Plan Comparison</h2>
            <p className="text-lg text-gray-600">Complete feature breakdown and pricing analysis</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-8 border-2 relative ${
                  plan.popular
                    ? 'border-green-500 bg-green-50'
                    : 'border-blue-500 bg-blue-50'
                } transition-colors`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Versatile
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className={`text-4xl font-bold mb-1 ${
                    plan.color === 'green' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    ${plan.price}
                  </div>
                  <div className="text-gray-600">{plan.period}</div>
                  <p className="text-gray-700 mt-2">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {plan.includes.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Advantages:</h4>
                  <ul className="space-y-2">
                    {plan.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Considerations:</h4>
                  <ul className="space-y-2">
                    {plan.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <SafeIcon icon={FiInfo} className="text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 mb-1">Best for:</div>
                  <div className="text-sm text-gray-700">{plan.bestFor}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Feature Comparison Matrix</h2>
            <p className="text-lg text-gray-600">Side-by-side feature comparison</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Per App Plan</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Per User Plan</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonMatrix.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.feature}</td>
                    <td className="px-6 py-4 text-gray-700">{item.perApp}</td>
                    <td className="px-6 py-4 text-gray-700">{item.perUser}</td>
                    <td className="px-6 py-4 text-center">
                      {item.winner === 'per-app' && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          Per App
                        </span>
                      )}
                      {item.winner === 'per-user' && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          Per User
                        </span>
                      )}
                      {item.winner === 'tie' && (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                          Tie
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Real-World Scenarios */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-World Scenarios</h2>
            <p className="text-lg text-gray-600">See how different organizations choose their licensing strategy</p>
          </div>

          <div className="space-y-6">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{scenario.title}</h3>
                    <p className="text-gray-600 text-sm">{scenario.description}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-700 mb-1">Per App Cost</div>
                    <div className="text-xl font-bold text-blue-600">${scenario.perAppCost}/month</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-700 mb-1">Per User Cost</div>
                    <div className="text-xl font-bold text-green-600">${scenario.perUserCost}/month</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`inline-flex px-4 py-2 rounded-lg font-medium ${
                      scenario.recommendation === 'per-user' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {scenario.recommendation === 'per-user' ? 'Per User' : 'Per App'}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Saves ${scenario.savings}/month
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Analysis?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Get a detailed cost analysis and recommendation for your specific Power Apps project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Complete Project Calculator</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=Power Apps Licensing Consultation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiUsers} />
              <span>Expert Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ComparePlans;