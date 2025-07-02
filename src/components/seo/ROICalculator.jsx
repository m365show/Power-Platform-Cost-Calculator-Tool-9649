import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrendingUp, FiDollarSign, FiClock, FiCheck, FiArrowRight, FiCalculator, FiTarget, FiUsers, FiZap } = FiIcons;

function ROICalculator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employees: 100,
    hourlyRate: 35,
    hoursPerWeek: 5,
    implementation: 25000,
    licensing: 2000,
    training: 5000,
    maintenance: 3000
  });

  const [timeframe, setTimeframe] = useState(36); // months

  const roiBenefits = [
    {
      icon: FiClock,
      title: 'Time Savings',
      description: 'Automation reduces manual work by 60-80%',
      calculation: 'hours_saved_weekly × hourly_rate × employees × weeks_per_year',
      impact: 'High'
    },
    {
      icon: FiUsers,
      title: 'Productivity Gains',
      description: 'Employees focus on high-value tasks',
      calculation: '15-25% productivity improvement across teams',
      impact: 'High'
    },
    {
      icon: FiTarget,
      title: 'Error Reduction',
      description: 'Automated processes eliminate human errors',
      calculation: 'Cost of errors × error_rate_reduction',
      impact: 'Medium'
    },
    {
      icon: FiZap,
      title: 'Process Efficiency',
      description: 'Streamlined workflows and faster approvals',
      calculation: 'Process time reduction × frequency × cost_per_hour',
      impact: 'High'
    }
  ];

  const calculateROI = () => {
    const { employees, hourlyRate, hoursPerWeek, implementation, licensing, training, maintenance } = formData;
    
    // Calculate annual savings
    const weeklyTimeSavings = employees * hoursPerWeek * 0.7; // 70% efficiency gain
    const annualTimeSavings = weeklyTimeSavings * 52 * hourlyRate;
    const productivityGains = employees * hourlyRate * 40 * 52 * 0.15; // 15% productivity increase
    const errorReduction = 50000; // Estimated annual cost of errors reduced
    
    const totalAnnualBenefits = annualTimeSavings + productivityGains + errorReduction;
    
    // Calculate costs
    const totalImplementationCosts = implementation + training;
    const annualOperatingCosts = licensing + maintenance;
    
    // Calculate ROI over timeframe
    const timeframeYears = timeframe / 12;
    const totalBenefits = totalAnnualBenefits * timeframeYears;
    const totalCosts = totalImplementationCosts + (annualOperatingCosts * timeframeYears);
    
    const netBenefit = totalBenefits - totalCosts;
    const roiPercentage = ((netBenefit / totalCosts) * 100);
    const paybackMonths = (totalImplementationCosts / (totalAnnualBenefits / 12));
    
    return {
      totalBenefits: Math.round(totalBenefits),
      totalCosts: Math.round(totalCosts),
      netBenefit: Math.round(netBenefit),
      roiPercentage: Math.round(roiPercentage),
      paybackMonths: Math.round(paybackMonths),
      annualSavings: Math.round(totalAnnualBenefits)
    };
  };

  const roi = calculateROI();

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: parseInt(value) || 0
    });
  };

  const roiScenarios = [
    {
      title: 'Small Business (50 employees)',
      employees: 50,
      savings: '$180,000',
      roi: '340%',
      payback: '8 months',
      description: 'HR processes, expense tracking, simple workflows'
    },
    {
      title: 'Medium Enterprise (200 employees)',
      employees: 200,
      savings: '$720,000',
      roi: '420%',
      payback: '6 months',
      description: 'Multiple departments, complex workflows, integrations'
    },
    {
      title: 'Large Corporation (1000 employees)',
      employees: 1000,
      savings: '$3,600,000',
      roi: '480%',
      payback: '5 months',
      description: 'Enterprise-wide automation, advanced analytics'
    },
    {
      title: 'Government Agency (500 employees)',
      employees: 500,
      savings: '$1,800,000',
      roi: '380%',
      payback: '7 months',
      description: 'Citizen services, compliance tracking, reporting'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Power Platform ROI Calculator
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-green-100 mb-8 max-w-3xl mx-auto"
            >
              Calculate the return on investment for your Power Platform implementation. See projected savings, payback period, and business value.
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
                <span>Project Cost Calculator</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('roi-calculator').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Calculate ROI
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi-calculator" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive ROI Calculator</h2>
            <p className="text-lg text-gray-600">Input your organization's details to calculate potential ROI</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Organization Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Employees: {formData.employees}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="5000"
                    value={formData.employees}
                    onChange={(e) => handleInputChange('employees', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Hourly Rate: ${formData.hourlyRate}
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manual Work Hours Saved per Employee/Week: {formData.hoursPerWeek}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={formData.hoursPerWeek}
                    onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Implementation Cost: ${formData.implementation.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="5000"
                    value={formData.implementation}
                    onChange={(e) => handleInputChange('implementation', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Licensing Cost: ${formData.licensing.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={formData.licensing}
                    onChange={(e) => handleInputChange('licensing', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Analysis Timeframe: {timeframe} months
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="60"
                    step="6"
                    value={timeframe}
                    onChange={(e) => setTimeframe(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">ROI Analysis Results</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-green-600 mb-1">Total Benefits</div>
                    <div className="text-2xl font-bold text-green-700">
                      ${roi.totalBenefits.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-red-600 mb-1">Total Costs</div>
                    <div className="text-2xl font-bold text-red-700">
                      ${roi.totalCosts.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-blue-600 mb-2">Net Benefit</div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    ${roi.netBenefit.toLocaleString()}
                  </div>
                  <div className="text-lg font-semibold text-blue-600">
                    {roi.roiPercentage}% ROI
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-purple-600 mb-1">Payback Period</div>
                    <div className="text-xl font-bold text-purple-700">
                      {roi.paybackMonths} months
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-orange-600 mb-1">Annual Savings</div>
                    <div className="text-xl font-bold text-orange-700">
                      ${roi.annualSavings.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Assumptions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 70% efficiency improvement in targeted processes</li>
                    <li>• 15% overall productivity increase</li>
                    <li>• $50,000 annual error reduction</li>
                    <li>• Conservative estimates used throughout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sources of ROI</h2>
            <p className="text-lg text-gray-600">How Power Platform delivers measurable business value</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roiBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <SafeIcon icon={benefit.icon} className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 mb-3">{benefit.description}</p>
                <div className="text-sm text-gray-500 mb-2">{benefit.calculation}</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  benefit.impact === 'High' ? 'bg-green-100 text-green-800' :
                  benefit.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {benefit.impact} Impact
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Scenarios */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real ROI Scenarios</h2>
            <p className="text-lg text-gray-600">Typical returns across different organization sizes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roiScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{scenario.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Annual Savings:</span>
                    <span className="font-semibold text-green-600">{scenario.savings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">3-Year ROI:</span>
                    <span className="font-semibold text-blue-600">{scenario.roi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payback:</span>
                    <span className="font-semibold text-purple-600">{scenario.payback}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Achieve These Returns?</h2>
          <p className="text-xl text-green-100 mb-8">
            Get a detailed project estimate and ROI projection for your Power Platform implementation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Get Project Estimate</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=Power Platform ROI Analysis"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiTrendingUp} />
              <span>ROI Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ROICalculator;