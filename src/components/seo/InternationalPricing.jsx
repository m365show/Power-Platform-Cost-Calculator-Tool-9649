import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiGlobe, FiMapPin, FiDollarSign, FiCheck, FiArrowRight, FiCalculator, FiTrendingUp, FiUsers, FiShield } = FiIcons;

function InternationalPricing() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('us');
  const [userCount, setUserCount] = useState(25);

  const regions = [
    {
      id: 'us',
      name: 'United States',
      currency: 'USD',
      flag: '🇺🇸',
      powerAppsPerUser: 20,
      powerAppsPerApp: 5,
      powerBIPro: 10,
      powerBIPremium: 4995,
      dataResidency: 'United States',
      compliance: ['SOC 1/2/3', 'ISO 27001', 'HIPAA', 'FedRAMP'],
      languages: ['English']
    },
    {
      id: 'europe',
      name: 'Europe (EMEA)',
      currency: 'EUR',
      flag: '🇪🇺',
      powerAppsPerUser: 18.60,
      powerAppsPerApp: 4.65,
      powerBIPro: 9.30,
      powerBIPremium: 4650,
      dataResidency: 'European Union',
      compliance: ['GDPR', 'ISO 27001', 'SOC 1/2/3', 'ENS High'],
      languages: ['English', 'German', 'French', 'Spanish', 'Italian', 'Dutch', 'Portuguese']
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      currency: 'GBP',
      flag: '🇬🇧',
      powerAppsPerUser: 15.60,
      powerAppsPerApp: 3.90,
      powerBIPro: 7.80,
      powerBIPremium: 3900,
      dataResidency: 'United Kingdom',
      compliance: ['UK GDPR', 'ISO 27001', 'Cyber Essentials Plus'],
      languages: ['English']
    },
    {
      id: 'canada',
      name: 'Canada',
      currency: 'CAD',
      flag: '🇨🇦',
      powerAppsPerUser: 25.00,
      powerAppsPerApp: 6.25,
      powerBIPro: 12.50,
      powerBIPremium: 6250,
      dataResidency: 'Canada',
      compliance: ['PIPEDA', 'ISO 27001', 'SOC 1/2/3'],
      languages: ['English', 'French']
    },
    {
      id: 'australia',
      name: 'Australia',
      currency: 'AUD',
      flag: '🇦🇺',
      powerAppsPerUser: 28.00,
      powerAppsPerApp: 7.00,
      powerBIPro: 14.00,
      powerBIPremium: 7000,
      dataResidency: 'Australia',
      compliance: ['Australian Privacy Act', 'ISO 27001', 'IRAP'],
      languages: ['English']
    },
    {
      id: 'japan',
      name: 'Japan',
      currency: 'JPY',
      flag: '🇯🇵',
      powerAppsPerUser: 2200,
      powerAppsPerApp: 550,
      powerBIPro: 1100,
      powerBIPremium: 550000,
      dataResidency: 'Japan',
      compliance: ['Personal Information Protection Law', 'ISO 27001'],
      languages: ['Japanese', 'English']
    },
    {
      id: 'india',
      name: 'India',
      currency: 'INR',
      flag: '🇮🇳',
      powerAppsPerUser: 1640,
      powerAppsPerApp: 410,
      powerBIPro: 820,
      powerBIPremium: 410000,
      dataResidency: 'India',
      compliance: ['Personal Data Protection Bill', 'ISO 27001'],
      languages: ['English', 'Hindi']
    },
    {
      id: 'brazil',
      name: 'Brazil',
      currency: 'BRL',
      flag: '🇧🇷',
      powerAppsPerUser: 100.00,
      powerAppsPerApp: 25.00,
      powerBIPro: 50.00,
      powerBIPremium: 25000,
      dataResidency: 'Brazil',
      compliance: ['LGPD', 'ISO 27001'],
      languages: ['Portuguese', 'English']
    }
  ];

  const regionalFeatures = [
    {
      icon: FiGlobe,
      title: 'Local Data Residency',
      description: 'Keep your data within your country or region boundaries',
      importance: 'Critical for compliance and performance'
    },
    {
      icon: FiShield,
      title: 'Regional Compliance',
      description: 'Meet local regulatory and privacy requirements',
      importance: 'GDPR, PIPEDA, LGPD, and other regional laws'
    },
    {
      icon: FiUsers,
      title: 'Multi-Language Support',
      description: 'Build applications in local languages',
      importance: 'Better user adoption and accessibility'
    },
    {
      icon: FiTrendingUp,
      title: 'Local Currency Billing',
      description: 'Simplified budgeting and financial planning',
      importance: 'Avoid currency fluctuation risks'
    }
  ];

  const pricingFactors = [
    {
      factor: 'Local Market Conditions',
      description: 'Pricing reflects local economic conditions and purchasing power',
      impact: 'Can vary significantly between regions'
    },
    {
      factor: 'Regulatory Compliance',
      description: 'Additional compliance features may affect pricing',
      impact: 'GDPR, data localization requirements'
    },
    {
      factor: 'Infrastructure Costs',
      description: 'Local data center and network costs influence pricing',
      impact: 'Remote regions may have higher costs'
    },
    {
      factor: 'Support and Services',
      description: 'Local language support and business hours',
      impact: 'Premium for 24/7 local language support'
    }
  ];

  const getSelectedRegion = () => {
    return regions.find(region => region.id === selectedRegion);
  };

  const calculatePerUserCost = () => {
    const region = getSelectedRegion();
    return userCount * region.powerAppsPerUser;
  };

  const calculatePerAppCost = () => {
    const region = getSelectedRegion();
    const assumedApps = 2; // Assuming 2 apps for comparison
    return userCount * assumedApps * region.powerAppsPerApp;
  };

  const formatCurrency = (amount, currency) => {
    const formatters = {
      USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
      EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }),
      GBP: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }),
      CAD: new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }),
      AUD: new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }),
      JPY: new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }),
      INR: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }),
      BRL: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    };
    
    return formatters[currency]?.format(amount) || `${amount} ${currency}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              International Power Platform Pricing
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto"
            >
              Global Power Platform pricing calculator with local currency, compliance requirements, and data residency options for international deployments.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/calculator')}
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiCalculator} />
                <span>Global Project Calculator</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('regional-calculator').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-colors"
              >
                Regional Pricing
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Regional Calculator */}
      <section id="regional-calculator" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Regional Pricing Calculator</h2>
            <p className="text-lg text-gray-600">Compare Power Platform costs across different regions</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Region/Country
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>
                      {region.flag} {region.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Number of Users: {userCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={userCount}
                  onChange={(e) => setUserCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            {(() => {
              const region = getSelectedRegion();
              return (
                <div className="grid md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white">
                  <div className="text-center">
                    <div className="text-sm opacity-90">Per User Plan</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(calculatePerUserCost(), region.currency)}/month
                    </div>
                    <div className="text-xs opacity-80">Unlimited apps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm opacity-90">Per App Plan</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(calculatePerAppCost(), region.currency)}/month
                    </div>
                    <div className="text-xs opacity-80">2 apps assumption</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm opacity-90">Power BI Pro</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(userCount * region.powerBIPro, region.currency)}/month
                    </div>
                    <div className="text-xs opacity-80">Business intelligence</div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Regional Comparison Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Pricing Comparison</h2>
            <p className="text-lg text-gray-600">Power Apps Per User pricing across major markets</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region, index) => (
              <motion.div
                key={region.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-6 border-2 transition-colors cursor-pointer ${
                  selectedRegion === region.id 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 bg-white hover:border-emerald-200'
                }`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{region.flag}</div>
                  <h3 className="text-lg font-bold text-gray-900">{region.name}</h3>
                </div>

                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Power Apps Per User</div>
                    <div className="text-xl font-bold text-emerald-600">
                      {formatCurrency(region.powerAppsPerUser, region.currency)}
                    </div>
                    <div className="text-xs text-gray-500">per user/month</div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-600">Power BI Pro</div>
                    <div className="text-lg font-semibold text-blue-600">
                      {formatCurrency(region.powerBIPro, region.currency)}
                    </div>
                    <div className="text-xs text-gray-500">per user/month</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-600">
                    <strong>Data Residency:</strong> {region.dataResidency}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    <strong>Languages:</strong> {region.languages.slice(0, 2).join(', ')}
                    {region.languages.length > 2 && ` +${region.languages.length - 2} more`}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">International Deployment Benefits</h2>
            <p className="text-lg text-gray-600">Why choose regional Power Platform deployments</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {regionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <SafeIcon icon={feature.icon} className="text-2xl text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-2">{feature.description}</p>
                <p className="text-sm text-emerald-600 font-medium">{feature.importance}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Matrix */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Regional Compliance Overview</h2>
            <p className="text-lg text-gray-600">Compliance certifications by region</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Region</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Data Residency</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Key Compliance</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Languages</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {regions.map((region, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{region.flag}</span>
                        <span className="font-medium text-gray-900">{region.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{region.dataResidency}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {region.compliance.slice(0, 2).map((comp, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {comp}
                          </span>
                        ))}
                        {region.compliance.length > 2 && (
                          <span className="text-xs text-gray-500">+{region.compliance.length - 2} more</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {region.languages.slice(0, 3).join(', ')}
                      {region.languages.length > 3 && ` +${region.languages.length - 3}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Factors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">International Pricing Factors</h2>
            <p className="text-lg text-gray-600">Understanding regional price variations</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pricingFactors.map((factor, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{factor.factor}</h3>
                <p className="text-gray-600 mb-3">{factor.description}</p>
                <div className="bg-emerald-50 rounded-lg p-3">
                  <p className="text-sm text-emerald-800">
                    <strong>Impact:</strong> {factor.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Global Power Platform Deployment?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Get region-specific estimates and compliance guidance for your international project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Global Project Calculator</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=International Power Platform Deployment"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiGlobe} />
              <span>International Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InternationalPricing;