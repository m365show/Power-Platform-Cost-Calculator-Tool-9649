import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiLinkedin, FiMail, FiExternalLink, FiCalculator, FiTrendingUp, FiDollarSign, FiGlobe, FiUsers, FiBarChart3, FiShield } = FiIcons;

function Footer() {
  const navigate = useNavigate();

  const seoPages = [
    {
      title: 'Small Business Calculator',
      path: '/small-business-calculator',
      description: 'Affordable Power Platform pricing for SMBs',
      icon: FiUsers
    },
    {
      title: 'Enterprise Licensing',
      path: '/enterprise-licensing',
      description: 'Complex licensing solutions for large organizations',
      icon: FiShield
    },
    {
      title: 'Power Apps Pricing',
      path: '/power-apps-pricing',
      description: 'Dedicated Power Apps cost calculator',
      icon: FiCalculator
    },
    {
      title: 'Power BI Cost Estimator',
      path: '/power-bi-cost-estimator',
      description: 'Microsoft Power BI license pricing tool',
      icon: FiBarChart3
    },
    {
      title: 'Compare Platform Plans',
      path: '/compare-plans',
      description: 'Per App vs Per User pricing breakdown',
      icon: FiTrendingUp
    },
    {
      title: 'AI Builder & Dataverse',
      path: '/ai-builder-dataverse',
      description: 'AI Builder and Dataverse cost estimator',
      icon: FiCalculator
    },
    {
      title: 'Government Pricing',
      path: '/government-pricing',
      description: 'Power Platform for public sector',
      icon: FiShield
    },
    {
      title: 'International Pricing',
      path: '/international-pricing',
      description: 'Global Power Platform cost calculator',
      icon: FiGlobe
    },
    {
      title: 'ROI Calculator',
      path: '/roi-calculator',
      description: 'Calculate Power Platform return on investment',
      icon: FiTrendingUp
    },
    {
      title: 'Cost Optimization',
      path: '/cost-optimization',
      description: 'Reduce Power Platform licensing costs',
      icon: FiDollarSign
    },
    {
      title: 'Integration Costs',
      path: '/integration-costs',
      description: 'Power Platform with Dynamics 365 pricing',
      icon: FiCalculator
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">⚡</div>
              <span className="text-lg font-bold">Power Platform Calculator</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professional cost estimation for Microsoft Power Platform projects. Get accurate pricing for Power Apps, Power Automate, and Power BI development.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/school/m365-show/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                title="Follow M365 Show on LinkedIn"
              >
                <SafeIcon icon={FiLinkedin} className="text-xl" />
              </a>
              <a
                href="mailto:pp@m365.show"
                className="text-gray-300 hover:text-white transition-colors"
                title="Contact us"
              >
                <SafeIcon icon={FiMail} className="text-xl" />
              </a>
            </div>
          </div>

          {/* Power Platform Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Power Platform Tools</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => navigate('/power-apps-pricing')}
                  className="hover:text-white transition-colors"
                >
                  Power Apps Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/power-bi-cost-estimator')}
                  className="hover:text-white transition-colors"
                >
                  Power BI Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/ai-builder-dataverse')}
                  className="hover:text-white transition-colors"
                >
                  AI Builder & Dataverse
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/compare-plans')}
                  className="hover:text-white transition-colors"
                >
                  Compare Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/integration-costs')}
                  className="hover:text-white transition-colors"
                >
                  Integration Costs
                </button>
              </li>
            </ul>
          </div>

          {/* Business Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Solutions</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => navigate('/small-business-calculator')}
                  className="hover:text-white transition-colors"
                >
                  Small Business Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/enterprise-licensing')}
                  className="hover:text-white transition-colors"
                >
                  Enterprise Licensing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/government-pricing')}
                  className="hover:text-white transition-colors"
                >
                  Government Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/roi-calculator')}
                  className="hover:text-white transition-colors"
                >
                  ROI Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/cost-optimization')}
                  className="hover:text-white transition-colors"
                >
                  Cost Optimization
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => navigate('/calculator')}
                  className="hover:text-white transition-colors"
                >
                  Start Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/get-started')}
                  className="hover:text-white transition-colors"
                >
                  Get Started Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/international-pricing')}
                  className="hover:text-white transition-colors"
                >
                  International Pricing
                </button>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/school/m365-show/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>M365 Show</span>
                  <SafeIcon icon={FiExternalLink} className="text-sm" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:pp@m365.show"
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Pages Grid */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h3 className="text-lg font-semibold mb-6 text-center">Specialized Power Platform Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {seoPages.map((page, index) => (
              <button
                key={index}
                onClick={() => navigate(page.path)}
                className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-lg text-left group"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <SafeIcon
                      icon={page.icon}
                      className="text-primary-400 text-lg group-hover:text-primary-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-white group-hover:text-primary-100 text-sm">
                      {page.title}
                    </h4>
                    <p className="text-gray-400 text-xs mt-1 group-hover:text-gray-300">
                      {page.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} M365 Show. All rights reserved. |
              <span className="ml-1">Professional Power Platform Cost Estimation</span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <button
                onClick={() => navigate('/privacy-policy')}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate('/terms-of-service')}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </button>
              <a
                href="mailto:pp@m365.show"
                className="hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;