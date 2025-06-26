import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiDollarSign, FiTarget, FiArrowRight, FiCheck, FiClock, FiShare2, FiLinkedin, FiTwitter, FiFacebook, FiCopy, FiUserPlus } = FiIcons;

function LandingPage() {
  const navigate = useNavigate();
  const [shareMessage, setShareMessage] = useState('');

  const features = [
    {
      icon: FiDollarSign,
      title: 'Accurate Cost Estimates',
      description: 'Get precise pricing based on your specific requirements and complexity'
    },
    {
      icon: FiTarget,
      title: 'Detailed Project Scope',
      description: 'Comprehensive analysis of your needs with platform recommendations'
    },
    {
      icon: FiClock,
      title: 'Instant Results',
      description: 'Complete assessment in minutes, not days or weeks'
    }
  ];

  const benefits = [
    'No lengthy sales calls required',
    'Transparent pricing methodology',
    'Expert-validated calculations',
    'Downloadable detailed report'
  ];

  const shareUrl = 'https://power-platform.m365calc.com/';
  const shareTitle = 'Power Platform Cost Calculator - Get Instant Project Estimates';
  const shareText = 'Get accurate Power Platform development estimates in minutes. Free calculator for Power Apps, Power Automate, and Power BI projects!';

  const handleShare = (platform) => {
    let url = '';
    
    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}&via=M365Show`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          setShareMessage('Link copied to clipboard!');
          setTimeout(() => setShareMessage(''), 3000);
        });
        return;
      default:
        return;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-block mb-6"
            >
              <SafeIcon icon={FiZap} className="text-6xl text-primary-600" />
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Power Platform Cost Calculator
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Get instant, accurate estimates for your Power Platform project. Answer detailed questions about your requirements and receive a comprehensive cost breakdown.
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/calculator')}
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <span>Start Calculator</span>
                <SafeIcon icon={FiArrowRight} className="text-xl" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
                className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiUserPlus} className="text-xl" />
                <span>Create Account</span>
              </motion.button>

              <p className="text-sm text-gray-500 sm:hidden">
                <SafeIcon icon={FiClock} className="inline mr-1" />
                Takes 5-7 minutes to complete
              </p>
            </motion.div>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-gray-500 hidden sm:block mb-8"
            >
              <SafeIcon icon={FiClock} className="inline mr-1" />
              Takes 5-7 minutes to complete • No registration required for calculator
            </motion.p>

            {/* Social Share Buttons */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="flex items-center space-x-2 text-gray-600">
                <SafeIcon icon={FiShare2} className="text-lg" />
                <span className="text-sm font-medium">Share this calculator:</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Share on LinkedIn"
                >
                  <SafeIcon icon={FiLinkedin} />
                  <span className="text-sm">LinkedIn</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  title="Share on Twitter"
                >
                  <SafeIcon icon={FiTwitter} />
                  <span className="text-sm">Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  title="Share on Facebook"
                >
                  <SafeIcon icon={FiFacebook} />
                  <span className="text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="Copy link"
                >
                  <SafeIcon icon={FiCopy} />
                  <span className="text-sm">Copy Link</span>
                </button>
              </div>
              {shareMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-sm font-medium"
                >
                  {shareMessage}
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What You'll Get</h2>
            <p className="text-lg text-gray-600">Comprehensive analysis tailored to your business needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
                className="text-center p-6 rounded-xl bg-white shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <SafeIcon icon={feature.icon} className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Use Our Calculator?</h2>
            <p className="text-lg text-gray-600">Built by Power Platform experts with real-world experience</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center space-x-3"
                  >
                    <SafeIcon icon={FiCheck} className="text-green-500 text-xl" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-primary-50 p-8 rounded-xl"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
                <p className="text-gray-600 mb-6">Get your Power Platform project estimate now</p>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/calculator')}
                    className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Begin Assessment
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="w-full bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                  >
                    Create Account First
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LinkedIn CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
              <SafeIcon icon={FiLinkedin} className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Stay Connected with M365 Show</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Follow us on LinkedIn for the latest Power Platform insights, tutorials, and industry best practices.
            </p>
            <motion.a
              href="https://www.linkedin.com/school/m365-show/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              <SafeIcon icon={FiLinkedin} className="text-2xl" />
              <span>Follow M365 Show on LinkedIn</span>
              <SafeIcon icon={FiArrowRight} className="text-xl" />
            </motion.a>
            <p className="text-blue-200 text-sm mt-4">
              Join thousands of Power Platform professionals in our community
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;