import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiPlay, FiCheckCircle, FiArrowRight, FiCalculator, FiUsers, FiZap, 
  FiTarget, FiClock, FiDollarSign, FiTrendingUp, FiShield, FiDatabase,
  FiSmartphone, FiGlobe, FiSettings, FiHelpCircle, FiBookOpen, FiVideo,
  FiDownload, FiMail, FiLinkedin, FiStar
} = FiIcons;

function GetStartedGuide() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: 1,
      title: 'Define Your Project Requirements',
      duration: '10-15 minutes',
      description: 'Gather essential information about your business needs and goals',
      icon: FiTarget,
      tasks: [
        'Identify the business problem you want to solve',
        'Define your target users and their roles',
        'List the key features and functionality needed',
        'Determine your preferred timeline and budget range',
        'Consider integration requirements with existing systems'
      ],
      tips: [
        'Start with the most critical business pain point',
        'Interview key stakeholders to understand their needs',
        'Document current manual processes that could be automated'
      ],
      resources: [
        { title: 'Requirements Template', type: 'download', url: '#' },
        { title: 'Stakeholder Interview Guide', type: 'download', url: '#' }
      ]
    },
    {
      id: 2,
      title: 'Use Our Cost Calculator',
      duration: '5-10 minutes',
      description: 'Get an accurate estimate for your Power Platform project',
      icon: FiCalculator,
      tasks: [
        'Enter your company information and industry',
        'Select your app type and business challenges',
        'Choose the Power Platform tools you need',
        'Specify required features and functionality',
        'Input user count and budget preferences',
        'Review and download your detailed estimate'
      ],
      tips: [
        'Be as specific as possible for accurate pricing',
        'Consider future growth when estimating user count',
        'Include all desired features even if they seem advanced'
      ],
      resources: [
        { title: 'Start Calculator Now', type: 'calculator', url: '/calculator' },
        { title: 'Pricing Guide PDF', type: 'download', url: '#' }
      ]
    },
    {
      id: 3,
      title: 'Review Your Estimate',
      duration: '15-20 minutes',
      description: 'Analyze the detailed proposal and understand the cost breakdown',
      icon: FiDollarSign,
      tasks: [
        'Review the cost range and timeline estimate',
        'Understand the complexity assessment',
        'Examine the recommended platform tools',
        'Check the feature breakdown and justification',
        'Download the professional PDF proposal'
      ],
      tips: [
        'Compare different licensing options if applicable',
        'Consider phased implementation to spread costs',
        'Factor in training and adoption time'
      ],
      resources: [
        { title: 'Cost Breakdown Guide', type: 'guide', url: '#' },
        { title: 'ROI Calculator', type: 'calculator', url: '/roi-calculator' }
      ]
    },
    {
      id: 4,
      title: 'Plan Your Implementation',
      duration: '30-45 minutes',
      description: 'Create a roadmap for your Power Platform project',
      icon: FiSettings,
      tasks: [
        'Define project phases and milestones',
        'Identify key team members and roles',
        'Plan user training and adoption strategy',
        'Consider change management requirements',
        'Prepare for testing and go-live phases'
      ],
      tips: [
        'Start with a pilot group for initial testing',
        'Plan for iterative development and feedback',
        'Ensure executive sponsorship and support'
      ],
      resources: [
        { title: 'Implementation Roadmap Template', type: 'download', url: '#' },
        { title: 'Change Management Guide', type: 'guide', url: '#' }
      ]
    },
    {
      id: 5,
      title: 'Get Expert Consultation',
      duration: '30-60 minutes',
      description: 'Connect with our Power Platform specialists for personalized guidance',
      icon: FiUsers,
      tasks: [
        'Schedule a consultation call with our experts',
        'Discuss your specific requirements and challenges',
        'Get recommendations for optimization',
        'Review technical architecture options',
        'Finalize project scope and timeline'
      ],
      tips: [
        'Prepare specific questions about your use case',
        'Have key stakeholders join the consultation',
        'Be open about budget constraints and priorities'
      ],
      resources: [
        { title: 'Schedule Consultation', type: 'email', url: 'mailto:pp@m365.show?subject=Power Platform Consultation Request' },
        { title: 'Consultation Prep Guide', type: 'guide', url: '#' }
      ]
    }
  ];

  const benefits = [
    {
      icon: FiZap,
      title: 'Faster Time to Market',
      description: 'Get your solution built and deployed 60% faster than traditional development',
      metric: '60% faster'
    },
    {
      icon: FiDollarSign,
      title: 'Cost Effective',
      description: 'Save up to 80% compared to custom development solutions',
      metric: '80% savings'
    },
    {
      icon: FiTrendingUp,
      title: 'Proven ROI',
      description: 'Average ROI of 350% within the first year of implementation',
      metric: '350% ROI'
    },
    {
      icon: FiShield,
      title: 'Enterprise Security',
      description: 'Built-in security, compliance, and governance features',
      metric: 'Enterprise-grade'
    }
  ];

  const faqs = [
    {
      question: 'How accurate are the cost estimates?',
      answer: 'Our estimates are based on real project data and industry benchmarks. They typically have an accuracy rate of 85-95% for similar projects. The final cost may vary based on specific requirements and complexity discovered during detailed analysis.'
    },
    {
      question: 'What is included in the project cost?',
      answer: 'The estimate includes development, testing, deployment, documentation, basic training, and 30 days of post-launch support. Licensing costs are calculated separately and clearly outlined in your proposal.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines range from 6-24 weeks depending on complexity. Simple apps take 6-8 weeks, medium complexity projects take 8-12 weeks, and complex enterprise solutions can take 12-24 weeks or more.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer various support packages including maintenance, updates, user training, and feature enhancements. Support options are discussed during the consultation phase.'
    },
    {
      question: 'Can you integrate with our existing systems?',
      answer: 'Absolutely! Power Platform excels at integration. We can connect with most business systems including ERP, CRM, databases, and third-party applications. Integration costs are included in our estimates.'
    },
    {
      question: 'What if we need changes during development?',
      answer: 'We use an agile approach that accommodates changes. Minor adjustments are typically included, while significant scope changes are discussed and priced separately to ensure transparency.'
    }
  ];

  const markStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'calculator': return FiCalculator;
      case 'download': return FiDownload;
      case 'guide': return FiBookOpen;
      case 'video': return FiVideo;
      case 'email': return FiMail;
      default: return FiArrowRight;
    }
  };

  const getResourceAction = (resource) => {
    if (resource.type === 'calculator' && resource.url) {
      return () => navigate(resource.url);
    } else if (resource.type === 'email' && resource.url) {
      return () => window.location.href = resource.url;
    } else {
      return () => console.log('Resource:', resource.title);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Information */}
      <div style={{ display: 'none' }}>
        <h1>Power Platform Get Started Guide - Step-by-Step Implementation</h1>
        <p>Complete guide to getting started with Microsoft Power Platform projects. Learn how to plan, estimate costs, and implement business applications successfully.</p>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6"
            >
              Get Started with Power Platform
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-green-100 mb-8 max-w-3xl mx-auto"
            >
              Your complete step-by-step guide to planning, estimating, and implementing successful Microsoft Power Platform projects.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/calculator')}
                className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiPlay} />
                <span>Start Your Project</span>
              </button>
              <button
                onClick={() => {
                  document.getElementById('guide-steps').scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                View Guide
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Overview */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Power Platform?</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your business with proven benefits and measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full mb-4">
                  <SafeIcon icon={benefit.icon} className="text-xl sm:text-2xl text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3">{benefit.description}</p>
                <div className="text-lg sm:text-xl font-bold text-green-600">{benefit.metric}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section id="guide-steps" className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">5-Step Implementation Guide</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Follow our proven methodology to ensure project success
            </p>
          </div>

          {/* Progress Indicator - Mobile Friendly */}
          <div className="mb-8 lg:mb-12">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
                    currentStep === step.id
                      ? 'bg-green-600 text-white'
                      : completedSteps.includes(step.id)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="hidden sm:inline">Step</span>
                  <span>{step.id}</span>
                  {completedSteps.includes(step.id) && (
                    <SafeIcon icon={FiCheckCircle} className="text-green-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              {completedSteps.length} of {steps.length} steps completed
            </div>
          </div>

          {/* Current Step Content */}
          {steps.map((step) => (
            currentStep === step.id && (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-xl p-6 lg:p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  {/* Step Icon and Info */}
                  <div className="flex-shrink-0 mb-6 lg:mb-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <SafeIcon icon={step.icon} className="text-2xl text-green-600" />
                    </div>
                    <div className="text-center lg:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 mb-2">
                        <SafeIcon icon={FiClock} className="text-sm" />
                        <span className="text-sm">{step.duration}</span>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 space-y-6">
                    {/* Tasks */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Tasks:</h4>
                      <ul className="space-y-2">
                        {step.tasks.map((task, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <SafeIcon icon={FiCheckCircle} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm sm:text-base">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tips:</h4>
                      <ul className="space-y-2">
                        {step.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <SafeIcon icon={FiStar} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm sm:text-base">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Resources:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.resources.map((resource, index) => (
                          <button
                            key={index}
                            onClick={getResourceAction(resource)}
                            className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                          >
                            <SafeIcon icon={getResourceIcon(resource.type)} className="text-green-600" />
                            <span className="font-medium text-gray-900 text-sm sm:text-base">{resource.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button
                        onClick={() => markStepComplete(step.id)}
                        disabled={completedSteps.includes(step.id)}
                        className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                          completedSteps.includes(step.id)
                            ? 'bg-green-100 text-green-800 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        <SafeIcon icon={FiCheckCircle} />
                        <span>{completedSteps.includes(step.id) ? 'Completed' : 'Mark Complete'}</span>
                      </button>
                      
                      {currentStep < steps.length && (
                        <button
                          onClick={() => setCurrentStep(currentStep + 1)}
                          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                          <span>Next Step</span>
                          <SafeIcon icon={FiArrowRight} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Get answers to common questions about Power Platform projects
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  <SafeIcon icon={FiHelpCircle} className="text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Success by the Numbers</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Real results from successful Power Platform implementations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-700 font-medium">Projects Delivered</div>
              <div className="text-sm text-gray-600 mt-1">Across all industries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-700 font-medium">Client Satisfaction</div>
              <div className="text-sm text-gray-600 mt-1">Based on project reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">6 weeks</div>
              <div className="text-gray-700 font-medium">Average Timeline</div>
              <div className="text-sm text-gray-600 mt-1">From start to go-live</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">350%</div>
              <div className="text-gray-700 font-medium">Average ROI</div>
              <div className="text-sm text-gray-600 mt-1">Within first year</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Power Platform Journey?</h2>
          <p className="text-lg sm:text-xl text-green-100 mb-8">
            Get your personalized project estimate in just 5 minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/calculator')}
              className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCalculator} />
              <span>Start Project Calculator</span>
            </button>
            <a
              href="mailto:pp@m365.show?subject=Power Platform Project Consultation"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiMail} />
              <span>Get Expert Consultation</span>
            </a>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Explore specialized calculators and tools for your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Small Business Calculator', path: '/small-business-calculator', icon: FiUsers, description: 'Tailored for SMB needs' },
              { title: 'Enterprise Licensing', path: '/enterprise-licensing', icon: FiShield, description: 'Complex enterprise solutions' },
              { title: 'ROI Calculator', path: '/roi-calculator', icon: FiTrendingUp, description: 'Calculate return on investment' },
              { title: 'Cost Optimization', path: '/cost-optimization', icon: FiDollarSign, description: 'Reduce licensing costs' },
              { title: 'Integration Costs', path: '/integration-costs', icon: FiDatabase, description: 'System integration pricing' },
              { title: 'International Pricing', path: '/international-pricing', icon: FiGlobe, description: 'Global pricing options' }
            ].map((resource, index) => (
              <motion.button
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(resource.path)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left group"
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <SafeIcon icon={resource.icon} className="text-xl text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <span>Explore tool</span>
                  <SafeIcon icon={FiArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* LinkedIn CTA */}
      <section className="py-12 lg:py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
            <SafeIcon icon={FiLinkedin} className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Connected with M365 Show</h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Follow us for the latest Power Platform insights, tips, and best practices
          </p>
          <a
            href="https://www.linkedin.com/school/m365-show/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-50 transition-colors"
          >
            <SafeIcon icon={FiLinkedin} className="text-xl sm:text-2xl" />
            <span>Follow M365 Show on LinkedIn</span>
            <SafeIcon icon={FiArrowRight} className="text-lg sm:text-xl" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default GetStartedGuide;