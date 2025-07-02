import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { firebaseHelpers } from '../utils/firebase';
import ConsultationRequestModal from './ConsultationRequestModal';

const { FiDollarSign, FiClock, FiDownload, FiRefreshCw, FiCheck, FiArrowRight, FiLinkedin, FiEye, FiShare2, FiUserCheck, FiMail } = FiIcons;

function Results() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { isAuthenticated, profile } = useAuth();
  const { formData, estimate, pitchDeck } = state;
  const [userEstimates, setUserEstimates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [consultationRequested, setConsultationRequested] = useState(false);

  // Load user's estimates if authenticated
  useEffect(() => {
    if (isAuthenticated && profile) {
      loadUserEstimates();
    }
  }, [isAuthenticated, profile]);

  const loadUserEstimates = async () => {
    try {
      setLoading(true);
      const estimates = await firebaseHelpers.getEstimates(profile.id);
      setUserEstimates(estimates);
    } catch (error) {
      console.error('Error loading Firebase estimates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (pdfData = pitchDeck, filename = `${formData.companyName}-PowerPlatform-Estimate.pdf`) => {
    if (pdfData) {
      const link = document.createElement('a');
      link.href = pdfData;
      link.download = filename;
      link.click();
    }
  };

  const handleDownloadAll = () => {
    userEstimates.forEach((estimate, index) => {
      if (estimate.pdfUrl) {
        setTimeout(() => {
          handleDownload(estimate.pdfUrl, `${estimate.companyName}-Estimate-${estimate.id.slice(0, 8)}.pdf`);
        }, index * 500); // Stagger downloads
      }
    });
  };

  const handleNewCalculation = () => {
    dispatch({ type: 'RESET' });
    navigate('/calculator');
  };

  const handleViewEstimate = (estimateData) => {
    // Load the estimate data into the app state
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        companyName: estimateData.companyName,
        contactName: estimateData.contactName,
        businessEmail: estimateData.businessEmail,
        industry: estimateData.industry,
        industryDetails: estimateData.industryDetails,
        companySize: estimateData.companySize,
        companySizeDetails: estimateData.companySizeDetails,
        appType: estimateData.appType,
        appTypeDetails: estimateData.appTypeDetails,
        businessChallenges: estimateData.businessChallenges || [],
        businessChallengesDetails: estimateData.businessChallengesDetails,
        platformTools: estimateData.platformTools || [],
        platformToolsDetails: estimateData.platformToolsDetails,
        features: estimateData.features || [],
        featuresDetails: estimateData.featuresDetails,
        userCount: estimateData.userCount,
        userCountDetails: estimateData.userCountDetails,
        budget: estimateData.budget,
        budgetDetails: estimateData.budgetDetails,
        urgency: estimateData.urgency,
        urgencyDetails: estimateData.urgencyDetails,
        additionalRequirements: estimateData.additionalRequirements,
        logo: estimateData.logoUrl
      }
    });

    dispatch({
      type: 'SET_ESTIMATE',
      payload: {
        cost: {
          min: estimateData.costMin,
          max: estimateData.costMax
        },
        timeline: estimateData.timeline,
        complexity: estimateData.complexity
      }
    });

    if (estimateData.pdfUrl) {
      dispatch({ type: 'SET_PITCH_DECK', payload: estimateData.pdfUrl });
    }
  };

  const handleConsultationRequest = async (consultationData) => {
    try {
      // Find the current estimate ID or use anonymous estimate
      let estimateId = state.savedEstimate?.id;
      let isAnonymous = false;

      if (!estimateId && !isAuthenticated) {
        // For anonymous users, save the estimate first
        const anonymousEstimate = await firebaseHelpers.saveAnonymousEstimate({
          companyName: formData.companyName,
          contactName: formData.contactName,
          businessEmail: formData.businessEmail,
          industry: formData.industry,
          industryDetails: formData.industryDetails,
          companySize: formData.companySize,
          companySizeDetails: formData.companySizeDetails,
          appType: formData.appType,
          appTypeDetails: formData.appTypeDetails,
          businessChallenges: formData.businessChallenges,
          businessChallengesDetails: formData.businessChallengesDetails,
          platformTools: formData.platformTools,
          platformToolsDetails: formData.platformToolsDetails,
          features: formData.features,
          featuresDetails: formData.featuresDetails,
          userCount: formData.userCount,
          userCountDetails: formData.userCountDetails,
          budget: formData.budget,
          budgetDetails: formData.budgetDetails,
          urgency: formData.urgency,
          urgencyDetails: formData.urgencyDetails,
          additionalRequirements: formData.additionalRequirements,
          logoUrl: formData.logo,
          costMin: estimate.cost.min,
          costMax: estimate.cost.max,
          timeline: estimate.timeline,
          complexity: estimate.complexity,
          pdfUrl: pitchDeck
        });
        
        estimateId = anonymousEstimate.id;
        isAnonymous = true;
      }

      await firebaseHelpers.requestConsultation(estimateId, consultationData, isAnonymous);
      setConsultationRequested(true);
      setShowConsultationModal(false);
    } catch (error) {
      console.error('Error requesting Firebase consultation:', error);
      alert('Failed to submit consultation request. Please try again.');
    }
  };

  // Check if we have estimate data
  if (!estimate.cost.min && !formData.companyName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <SafeIcon icon={FiDollarSign} className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h2>
            <p className="text-gray-600 mb-6">
              Complete the calculator to see your estimate results.
            </p>
            <button
              onClick={() => navigate('/calculator')}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Start Calculator
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <SafeIcon icon={FiCheck} className="text-2xl text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Estimate is Ready!</h1>
          <p className="text-lg text-gray-600">
            Based on your requirements, here's your custom Power Platform development estimate.
          </p>
          {isAuthenticated && profile && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg inline-block">
              <p className="text-sm text-blue-800">
                <strong>Logged in as:</strong> {profile?.name} ({profile?.role}) - Your estimate has been saved to Firebase 🔥
              </p>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            {/* Cost Estimate Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-8 text-white mb-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <SafeIcon icon={FiDollarSign} className="text-3xl" />
                    <h2 className="text-2xl font-bold">Estimated Investment</h2>
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    ${estimate.cost.min.toLocaleString()} - ${estimate.cost.max.toLocaleString()}
                  </div>
                  <p className="text-primary-100">
                    Based on your specific requirements and complexity
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <SafeIcon icon={FiClock} className="text-3xl" />
                    <h2 className="text-2xl font-bold">Development Timeline</h2>
                  </div>
                  <div className="text-4xl font-bold mb-2">{estimate.timeline}</div>
                  <p className="text-primary-100">
                    {estimate.complexity} complexity project
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Project Summary */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Summary</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Company Details</h4>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Company:</strong> {formData.companyName}</p>
                    <p><strong>Contact:</strong> {formData.contactName}</p>
                    <p><strong>Industry:</strong> {formData.industry}</p>
                    <p><strong>Size:</strong> {formData.companySize}</p>
                    <p><strong>Users:</strong> {formData.userCount}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Solution Overview</h4>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Type:</strong> {formData.appType}</p>
                    <p><strong>Budget:</strong> {formData.budget}</p>
                    <p><strong>Timeline:</strong> {formData.urgency}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Platform Tools</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(formData.platformTools || []).map(tool => (
                    <span key={tool} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                      {tool}
                    </span>
                  ))}
                </div>

                <h4 className="font-semibold text-gray-900 mb-3">Selected Features</h4>
                <div className="flex flex-wrap gap-2">
                  {(formData.features || []).map(feature => (
                    <span key={feature} className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Action Cards */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid md:grid-cols-3 gap-6 mb-8"
            >
              {/* Download PDF */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                  <SafeIcon icon={FiDownload} className="text-xl text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Download PDF</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Get your detailed project estimate
                </p>
                <button
                  onClick={() => handleDownload()}
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm"
                >
                  Download Report
                </button>
              </div>

              {/* Request Consultation */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <SafeIcon icon={consultationRequested ? FiCheck : FiUserCheck} className="text-xl text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {consultationRequested ? 'Request Sent!' : 'Get Consultation'}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {consultationRequested ? 'We\'ll contact you soon' : 'Talk to our Power Platform experts'}
                </p>
                <button
                  onClick={() => setShowConsultationModal(true)}
                  disabled={consultationRequested}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                    consultationRequested
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {consultationRequested ? 'Request Sent' : 'Request Consultation'}
                </button>
              </div>

              {/* Contact Team */}
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <SafeIcon icon={FiMail} className="text-xl text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Contact Team</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Direct contact with our team
                </p>
                <button
                  onClick={() => window.location.href = 'mailto:pp@m365.show?subject=Power Platform Project Discussion'}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                >
                  Send Email
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            {/* My Saved Estimates - Only for logged-in users */}
            {isAuthenticated && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">My Firebase Estimates</h3>
                  {userEstimates.length > 1 && (
                    <button
                      onClick={handleDownloadAll}
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                      title="Download all PDFs"
                    >
                      <SafeIcon icon={FiDownload} />
                      <span>Download All</span>
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading Firebase estimates...</p>
                  </div>
                ) : userEstimates.length === 0 ? (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiDollarSign} className="text-4xl text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No saved estimates yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {userEstimates.map((estimateItem) => (
                      <div key={estimateItem.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{estimateItem.companyName}</h4>
                            <p className="text-sm text-gray-600">{estimateItem.appType}</p>
                            <p className="text-sm font-medium text-green-600">
                              ${estimateItem.costMin?.toLocaleString()} - ${estimateItem.costMax?.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {estimateItem.createdAt ? new Date(estimateItem.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown date'}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-1 ml-2">
                            <button
                              onClick={() => handleViewEstimate(estimateItem)}
                              className="text-primary-600 hover:text-primary-700 p-1"
                              title="View estimate"
                            >
                              <SafeIcon icon={FiEye} className="text-sm" />
                            </button>
                            {estimateItem.pdfUrl && (
                              <button
                                onClick={() => handleDownload(estimateItem.pdfUrl, `${estimateItem.companyName}-Estimate.pdf`)}
                                className="text-green-600 hover:text-green-700 p-1"
                                title="Download PDF"
                              >
                                <SafeIcon icon={FiDownload} className="text-sm" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="space-y-4"
            >
              <button
                onClick={handleNewCalculation}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                <SafeIcon icon={FiRefreshCw} />
                <span>New Calculation</span>
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() => navigate('/signup')}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  <span>Create Account to Save</span>
                  <SafeIcon icon={FiArrowRight} />
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
            <SafeIcon icon={FiLinkedin} className="text-xl text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">Follow M365 Show on LinkedIn</h3>
          <p className="text-blue-100 mb-6">
            Stay updated with the latest Power Platform insights and best practices
          </p>
          <a
            href="https://www.linkedin.com/school/m365-show/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <SafeIcon icon={FiLinkedin} />
            <span>Follow Us</span>
            <SafeIcon icon={FiArrowRight} />
          </a>
        </motion.div>
      </div>

      {/* Consultation Request Modal */}
      <ConsultationRequestModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
        onSubmit={handleConsultationRequest}
        estimateData={{
          company: formData.companyName,
          contact: formData.contactName,
          email: formData.businessEmail,
          costRange: `$${estimate.cost.min.toLocaleString()} - $${estimate.cost.max.toLocaleString()}`,
          timeline: estimate.timeline
        }}
      />
    </div>
  );
}

export default Results;