import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { calculateCost } from '../utils/costCalculator';
import { generatePitchDeck } from '../utils/pitchDeckGenerator';
import { sendEmailNotification } from '../utils/emailService';
import { supabaseHelpers } from '../utils/supabase';

const { FiArrowLeft, FiArrowRight, FiUpload, FiX, FiCheck, FiInfo, FiUsers, FiDatabase, FiSmartphone, FiGlobe, FiShield, FiMail, FiLinkedin, FiDownload } = FiIcons;

function Calculator() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { isAuthenticated, profile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [showDownloadOption, setShowDownloadOption] = useState(false);
  const totalSteps = 6;

  // ... (keep all the existing arrays: industries, companySizes, appTypes, etc.)
  const industries = [
    { value: 'healthcare', label: 'Healthcare & Medical', description: 'Hospitals, clinics, medical practices' },
    { value: 'finance', label: 'Financial Services', description: 'Banks, insurance, investment firms' },
    { value: 'manufacturing', label: 'Manufacturing & Industrial', description: 'Production, supply chain, quality control' },
    { value: 'retail', label: 'Retail & E-commerce', description: 'Stores, online sales, inventory management' },
    { value: 'education', label: 'Education & Training', description: 'Schools, universities, training centers' },
    { value: 'government', label: 'Government & Public Sector', description: 'Municipal, state, federal agencies' },
    { value: 'nonprofit', label: 'Non-profit Organizations', description: 'Charities, foundations, NGOs' },
    { value: 'technology', label: 'Technology & Software', description: 'IT companies, software development' },
    { value: 'realestate', label: 'Real Estate & Property', description: 'Property management, real estate agencies' },
    { value: 'construction', label: 'Construction & Engineering', description: 'Building, infrastructure, project management' },
    { value: 'consulting', label: 'Professional Services', description: 'Consulting, legal, accounting firms' },
    { value: 'other', label: 'Other Industry', description: 'Tell us about your specific industry' }
  ];

  const companySizes = [
    { value: 'startup', label: 'Startup (1-10 employees)', description: 'Small team, rapid growth focus' },
    { value: 'small', label: 'Small Business (11-50 employees)', description: 'Established operations, growing team' },
    { value: 'medium', label: 'Medium Business (51-200 employees)', description: 'Multiple departments, structured processes' },
    { value: 'large', label: 'Large Enterprise (201-1000 employees)', description: 'Complex operations, multiple locations' },
    { value: 'enterprise', label: 'Enterprise (1000+ employees)', description: 'Global operations, complex integrations' }
  ];

  const appTypes = [
    { value: 'internal', label: 'Internal Business App', description: 'Employee-facing tools and workflows', examples: ['HR management', 'Expense tracking', 'Project management', 'Internal reporting'] },
    { value: 'customer', label: 'Customer-Facing App', description: 'External user interfaces and portals', examples: ['Customer portals', 'Service requests', 'Account management', 'Self-service tools'] },
    { value: 'workflow', label: 'Workflow Automation', description: 'Process automation and approvals', examples: ['Document approval', 'Purchase orders', 'Leave requests', 'Quality processes'] },
    { value: 'dashboard', label: 'Analytics Dashboard', description: 'Reporting and data visualization', examples: ['KPI dashboards', 'Sales reports', 'Operational metrics', 'Executive summaries'] },
    { value: 'integration', label: 'System Integration', description: 'Connect multiple systems and data sources', examples: ['ERP integration', 'CRM connectivity', 'API connections', 'Data synchronization'] }
  ];

  const businessChallenges = [
    { value: 'manual-processes', label: 'Too Many Manual Processes', description: 'Reduce repetitive tasks and human errors' },
    { value: 'data-silos', label: 'Data Scattered Across Systems', description: 'Centralize and connect your data sources' },
    { value: 'approval-delays', label: 'Slow Approval Processes', description: 'Speed up decision-making workflows' },
    { value: 'reporting-issues', label: 'Lack of Real-time Reporting', description: 'Get instant insights and analytics' },
    { value: 'compliance-tracking', label: 'Compliance & Audit Tracking', description: 'Maintain regulatory compliance easily' },
    { value: 'customer-service', label: 'Customer Service Efficiency', description: 'Improve customer experience and response times' },
    { value: 'remote-work', label: 'Remote Work Collaboration', description: 'Enable effective remote team collaboration' },
    { value: 'cost-reduction', label: 'Operational Cost Reduction', description: 'Streamline operations to reduce costs' }
  ];

  const platformTools = [
    { value: 'powerapps', label: 'Power Apps', description: 'Custom business applications', complexity: 'Medium', useCases: ['Forms', 'Mobile apps', 'Canvas apps', 'Model-driven apps'] },
    { value: 'powerautomate', label: 'Power Automate', description: 'Workflow automation', complexity: 'Medium', useCases: ['Approval flows', 'Data sync', 'Notifications', 'Scheduled tasks'] },
    { value: 'powerbi', label: 'Power BI', description: 'Business intelligence and analytics', complexity: 'High', useCases: ['Interactive dashboards', 'Reports', 'Data visualization', 'Analytics'] },
    { value: 'dataverse', label: 'Dataverse', description: 'Secure data storage and management', complexity: 'High', useCases: ['Data modeling', 'Security', 'Relationships', 'Business logic'] },
    { value: 'sharepoint', label: 'SharePoint Integration', description: 'Document management and collaboration', complexity: 'Low', useCases: ['Document storage', 'Lists', 'Collaboration', 'Content management'] },
    { value: 'teams', label: 'Microsoft Teams', description: 'Teams integration and collaboration', complexity: 'Low', useCases: ['Teams apps', 'Bots', 'Notifications', 'Collaboration'] },
    { value: 'office365', label: 'Office 365 Integration', description: 'Connect with Outlook, Excel, Word', complexity: 'Low', useCases: ['Email automation', 'Document generation', 'Calendar integration'] },
    { value: 'sql', label: 'SQL Database', description: 'Custom database integration', complexity: 'High', useCases: ['Complex queries', 'Legacy systems', 'Custom schemas', 'Advanced reporting'] }
  ];

  const features = [
    { value: 'forms', label: 'Forms & Data Entry', complexity: 1, description: 'Custom forms with validation and data collection', estimatedHours: '20-40 hours' },
    { value: 'approvals', label: 'Approval Workflows', complexity: 2, description: 'Multi-step approval processes with notifications', estimatedHours: '40-80 hours' },
    { value: 'reports', label: 'Custom Reports & Analytics', complexity: 2, description: 'Interactive reports and data visualizations', estimatedHours: '30-60 hours' },
    { value: 'notifications', label: 'Email/SMS Notifications', complexity: 1, description: 'Automated notifications and alerts', estimatedHours: '15-30 hours' },
    { value: 'integrations', label: 'Third-party Integrations', complexity: 3, description: 'Connect with external systems and APIs', estimatedHours: '60-120 hours' },
    { value: 'ai', label: 'AI & Copilot Features', complexity: 3, description: 'AI-powered insights and automation', estimatedHours: '80-150 hours' },
    { value: 'mobile', label: 'Mobile Optimization', complexity: 2, description: 'Mobile-responsive design and offline capabilities', estimatedHours: '40-80 hours' },
    { value: 'security', label: 'Advanced Security & Permissions', complexity: 2, description: 'Role-based access and data security', estimatedHours: '30-60 hours' },
    { value: 'document', label: 'Document Management', complexity: 2, description: 'File storage, versioning, and collaboration', estimatedHours: '25-50 hours' },
    { value: 'calendar', label: 'Calendar & Scheduling', complexity: 1, description: 'Appointment booking and calendar integration', estimatedHours: '20-40 hours' }
  ];

  const userCounts = [
    { value: '1-10', label: '1-10 users', description: 'Small team or department', multiplier: 1 },
    { value: '11-25', label: '11-25 users', description: 'Medium team or multiple departments', multiplier: 1.1 },
    { value: '26-50', label: '26-50 users', description: 'Large team or division', multiplier: 1.2 },
    { value: '51-100', label: '51-100 users', description: 'Multiple divisions or small company', multiplier: 1.4 },
    { value: '101-250', label: '101-250 users', description: 'Large department or medium company', multiplier: 1.7 },
    { value: '251-500', label: '251-500 users', description: 'Large company or multiple locations', multiplier: 2.0 },
    { value: '500+', label: '500+ users', description: 'Enterprise-wide deployment', multiplier: 2.5 }
  ];

  const budgetRanges = [
    { value: 'under-5k', label: 'Under $5,000', description: 'Simple apps with basic features' },
    { value: '5k-15k', label: '$5,000 - $15,000', description: 'Standard business apps with automation' },
    { value: '15k-30k', label: '$15,000 - $30,000', description: 'Complex apps with integrations' },
    { value: '30k-50k', label: '$30,000 - $50,000', description: 'Enterprise apps with advanced features' },
    { value: '50k+', label: '$50,000+', description: 'Large-scale solutions with AI and analytics' },
    { value: 'unsure', label: 'Not Sure', description: 'Help me determine the right budget' }
  ];

  const urgencyOptions = [
    { value: 'asap', label: 'ASAP (Rush Job)', description: 'Need to start immediately', multiplier: 1.5, timeline: 'Expedited delivery' },
    { value: '1month', label: 'Within 1 Month', description: 'Urgent business need', multiplier: 1.3, timeline: 'Fast-track development' },
    { value: '3months', label: 'Next 3 Months', description: 'Planned implementation', multiplier: 1, timeline: 'Standard timeline' },
    { value: '6months', label: 'Next 6 Months', description: 'Strategic planning phase', multiplier: 0.95, timeline: 'Extended planning' },
    { value: 'future', label: 'Future Planning', description: 'Exploring options', multiplier: 0.9, timeline: 'Flexible timeline' }
  ];

  const updateFormData = (data) => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: data });
  };

  const validateStep = (step) => {
    const newErrors = {};
    const { formData } = state;

    switch (step) {
      case 1:
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.contactName) newErrors.contactName = 'Contact name is required';
        if (!formData.businessEmail) newErrors.businessEmail = 'Business email is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.companySize) newErrors.companySize = 'Company size is required';
        break;
      case 2:
        if (!formData.appType) newErrors.appType = 'App type is required';
        if (formData.businessChallenges.length === 0) newErrors.businessChallenges = 'Select at least one business challenge';
        break;
      case 3:
        if (formData.platformTools.length === 0) newErrors.platformTools = 'Select at least one platform tool';
        break;
      case 4:
        if (formData.features.length === 0) newErrors.features = 'Select at least one feature';
        break;
      case 5:
        if (!formData.userCount) newErrors.userCount = 'User count is required';
        if (!formData.budget) newErrors.budget = 'Budget range is required';
        break;
      case 6:
        if (!formData.urgency) newErrors.urgency = 'Urgency is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);

    try {
      // Step 1: Calculate cost estimate
      setProcessingStatus('Calculating cost estimate...');
      const estimate = calculateCost(state.formData);
      dispatch({ type: 'SET_ESTIMATE', payload: estimate });

      // Step 2: Generate pitch deck
      setProcessingStatus('Generating detailed proposal PDF...');
      const pitchDeck = await generatePitchDeck(state.formData, estimate);
      dispatch({ type: 'SET_PITCH_DECK', payload: pitchDeck });

      // Step 3: Save to database (both authenticated and anonymous users)
      if (isAuthenticated && profile) {
        setProcessingStatus('Saving estimate to your account...');
        const estimateData = {
          user_id: profile.id,
          company_name: state.formData.companyName,
          contact_name: state.formData.contactName,
          business_email: state.formData.businessEmail,
          industry: state.formData.industry,
          industry_details: state.formData.industryDetails,
          company_size: state.formData.companySize,
          company_size_details: state.formData.companySizeDetails,
          app_type: state.formData.appType,
          app_type_details: state.formData.appTypeDetails,
          business_challenges: state.formData.businessChallenges,
          business_challenges_details: state.formData.businessChallengesDetails,
          platform_tools: state.formData.platformTools,
          platform_tools_details: state.formData.platformToolsDetails,
          features: state.formData.features,
          features_details: state.formData.featuresDetails,
          user_count: state.formData.userCount,
          user_count_details: state.formData.userCountDetails,
          budget: state.formData.budget,
          budget_details: state.formData.budgetDetails,
          urgency: state.formData.urgency,
          urgency_details: state.formData.urgencyDetails,
          additional_requirements: state.formData.additionalRequirements,
          logo_url: state.formData.logo,
          cost_min: estimate.cost.min,
          cost_max: estimate.cost.max,
          timeline: estimate.timeline,
          complexity: estimate.complexity,
          pdf_url: pitchDeck,
          status: 'completed'
        };

        const savedEstimate = await supabaseHelpers.saveEstimate(estimateData);
        dispatch({ type: 'SET_SAVED_ESTIMATE', payload: savedEstimate });
      } else {
        // For anonymous users, show download option
        setProcessingStatus('Preparing your estimate...');
        setShowDownloadOption(true);
      }

      // Step 4: Send email notification
      setProcessingStatus('Sending email notification to pp@m365.show...');
      const emailResult = await sendEmailNotification(state.formData, estimate, pitchDeck);
      
      if (emailResult.success) {
        setProcessingStatus('Email sent successfully!');
        console.log('Email notification sent:', emailResult);
      } else {
        setProcessingStatus('Email delivery failed, but estimate is ready');
        console.warn('Email failed:', emailResult);
      }

      // Step 5: Navigate to results
      setProcessingStatus('Finalizing your estimate...');
      setTimeout(() => {
        navigate('/results');
      }, 1000);

    } catch (error) {
      console.error('Error processing submission:', error);
      setProcessingStatus('Processing completed with warnings');
      
      // Show user-friendly error message
      alert('Your estimate has been calculated successfully! However, there was an issue with saving data. You can still view and download your results.');
      
      // Still navigate to results even if save fails
      setTimeout(() => {
        navigate('/results');
      }, 1000);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Please select an image smaller than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        updateFormData({ logo: e.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (PNG, JPG, GIF)');
    }
  };

  const toggleArrayValue = (array, value) => {
    const newArray = array.includes(value)
      ? array.filter(item => item !== value)
      : [...array, value];
    return newArray;
  };

  const handleDownloadAndContinue = () => {
    // Download the PDF
    if (state.pitchDeck) {
      const link = document.createElement('a');
      link.href = state.pitchDeck;
      link.download = `${state.formData.companyName}-PowerPlatform-Estimate.pdf`;
      link.click();
    }
    
    // Navigate to results
    navigate('/results');
  };

  // ... (keep the existing renderStep function with all steps)
  const renderStep = () => {
    const { formData } = state;

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your company</h2>
              <p className="text-gray-600">We'll customize our recommendations based on your business</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateFormData({ companyName: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your company name"
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => updateFormData({ contactName: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.contactName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Email *</label>
              <input
                type="email"
                value={formData.businessEmail}
                onChange={(e) => updateFormData({ businessEmail: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.businessEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your business email"
              />
              {errors.businessEmail && <p className="text-red-500 text-sm mt-1">{errors.businessEmail}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Industry *</label>
              <div className="grid md:grid-cols-2 gap-3">
                {industries.map(industry => (
                  <div
                    key={industry.value}
                    onClick={() => updateFormData({ industry: industry.value })}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.industry === industry.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{industry.label}</h4>
                        <p className="text-sm text-gray-600">{industry.description}</p>
                      </div>
                      {formData.industry === industry.value && (
                        <SafeIcon icon={FiCheck} className="text-primary-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
            </div>

            {/* Industry Details Field */}
            {formData.industry && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Details & Special Requirements
                </label>
                <textarea
                  value={formData.industryDetails || ''}
                  onChange={(e) => updateFormData({ industryDetails: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="3"
                  placeholder="Tell us more about your industry-specific needs, compliance requirements, or special considerations..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Company Size *</label>
              <div className="grid gap-3">
                {companySizes.map(size => (
                  <div
                    key={size.value}
                    onClick={() => updateFormData({ companySize: size.value })}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.companySize === size.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{size.label}</h4>
                        <p className="text-sm text-gray-600">{size.description}</p>
                      </div>
                      {formData.companySize === size.value && (
                        <SafeIcon icon={FiCheck} className="text-primary-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
            </div>

            {/* Company Size Details Field */}
            {formData.companySize && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Structure & Organizational Details
                </label>
                <textarea
                  value={formData.companySizeDetails || ''}
                  onChange={(e) => updateFormData({ companySizeDetails: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="3"
                  placeholder="Describe your company structure, departments, locations, growth plans, or organizational challenges..."
                />
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of solution do you need?</h2>
              <p className="text-gray-600">Help us understand your business requirements</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">App Type *</label>
              <div className="grid gap-4">
                {appTypes.map(type => (
                  <div
                    key={type.value}
                    onClick={() => updateFormData({ appType: type.value })}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.appType === type.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{type.label}</h3>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {type.examples.map(example => (
                            <span key={example} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                      {formData.appType === type.value && (
                        <SafeIcon icon={FiCheck} className="text-primary-500 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.appType && <p className="text-red-500 text-sm mt-1">{errors.appType}</p>}
            </div>

            {/* App Type Details Field */}
            {formData.appType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Details & Specific Requirements
                </label>
                <textarea
                  value={formData.appTypeDetails || ''}
                  onChange={(e) => updateFormData({ appTypeDetails: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="4"
                  placeholder="Describe your specific application needs, user workflows, key functionalities, or unique requirements..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Business Challenges (Select all that apply) *</label>
              <div className="grid md:grid-cols-2 gap-3">
                {businessChallenges.map(challenge => (
                  <div
                    key={challenge.value}
                    onClick={() => updateFormData({ businessChallenges: toggleArrayValue(formData.businessChallenges || [], challenge.value) })}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      (formData.businessChallenges || []).includes(challenge.value)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{challenge.label}</h4>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                      {(formData.businessChallenges || []).includes(challenge.value) && (
                        <SafeIcon icon={FiCheck} className="text-primary-500 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.businessChallenges && <p className="text-red-500 text-sm mt-1">{errors.businessChallenges}</p>}
            </div>

            {/* Business Challenges Details Field */}
            {formData.businessChallenges && formData.businessChallenges.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Challenge Details & Impact
                </label>
                <textarea
                  value={formData.businessChallengesDetails || ''}
                  onChange={(e) => updateFormData({ businessChallengesDetails: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="4"
                  placeholder="Elaborate on your business challenges, current pain points, impact on operations, and desired outcomes..."
                />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Which Power Platform tools do you need?</h2>
              <p className="text-gray-600">Select all the Microsoft tools that fit your requirements</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {platformTools.map(tool => (
                <div
                  key={tool.value}
                  onClick={() => updateFormData({ platformTools: toggleArrayValue(formData.platformTools || [], tool.value) })}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    (formData.platformTools || []).includes(tool.value)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{tool.label}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          tool.complexity === 'High' ? 'bg-red-100 text-red-700' :
                          tool.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {tool.complexity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {tool.useCases.map(useCase => (
                          <span key={useCase} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                    {(formData.platformTools || []).includes(tool.value) && (
                      <SafeIcon icon={FiCheck} className="text-primary-500 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.platformTools && <p className="text-red-500 text-sm mt-1">{errors.platformTools}</p>}

            {/* Platform Tools Details Field */}
            {formData.platformTools && formData.platformTools.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Tools Requirements & Integration Details
                </label>
                <textarea
                  value={formData.platformToolsDetails || ''}
                  onChange={(e) => updateFormData({ platformToolsDetails: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="4"
                  placeholder="Describe specific requirements for each selected tool, integration needs, data sources, or custom configurations..."
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What features do you need?</h2>
              <p className="text-gray-600">Select all the capabilities your solution should have</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {features.map(feature => (
                <div
                  key={feature.value}
                  onClick={() => updateFormData({ features: toggleArrayValue(formData.features || [], feature.value) })}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    (formData.features || []).includes(feature.value)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{feature.label}</h3>
                        <div className="flex items-center gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < feature.complexity ? 'bg-primary-500' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{feature.description}</p>
                      <p className="text-xs text-gray-500">{feature.estimatedHours}</p>
                    </div>
                    {(formData.features || []).includes(feature.value) && (
                      <SafeIcon icon={FiCheck} className="text-primary-500 mt-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features}</p>}

            {/* Features Details Field */}
            {formData.features && formData.features.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feature Specifications & Custom Requirements
                </label>
                <textarea
                  value={formData.featuresDetails || ''}
                  onChange={(e) => updateFormData({ featuresDetails: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="4"
                  placeholder="Detail your specific feature requirements, customizations, business rules, UI/UX preferences, or special functionalities..."
                />
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project scope and budget</h2>
              <p className="text-gray-600">Help us size the project appropriately</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Number of Users *</label>
              <div className="grid md:grid-cols-2 gap-3">
                {userCounts.map(count => (
                  <div
                    key={count.value}
                    onClick={() => updateFormData({ userCount: count.value })}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.userCount === count.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{count.label}</h4>
                        <p className="text-sm text-gray-600">{count.description}</p>
                      </div>
                      {formData.userCount === count.value && (
                        <SafeIcon icon={FiCheck} className="text-primary-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.userCount && <p className="text-red-500 text-sm mt-1">{errors.userCount}</p>}
            </div>

            {/* User Count Details Field */}
            {formData.userCount && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Details & Access Requirements
                </label>
                <textarea
                  value={formData.userCountDetails || ''}
                  onChange={(e) => updateFormData({ userCountDetails: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="3"
                  placeholder="Describe user roles, permissions, departments, locations, growth expectations, or access patterns..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Budget Range *</label>
              <div className="grid gap-3">
                {budgetRanges.map(budget => (
                  <div
                    key={budget.value}
                    onClick={() => updateFormData({ budget: budget.value })}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.budget === budget.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{budget.label}</h4>
                        <p className="text-sm text-gray-600">{budget.description}</p>
                      </div>
                      {formData.budget === budget.value && (
                        <SafeIcon icon={FiCheck} className="text-primary-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
            </div>

            {/* Budget Details Field */}
            {formData.budget && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Considerations & Financial Details
                </label>
                <textarea
                  value={formData.budgetDetails || ''}
                  onChange={(e) => updateFormData({ budgetDetails: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="3"
                  placeholder="Explain budget constraints, approval processes, funding sources, or payment preferences..."
                />
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Timeline and final details</h2>
              <p className="text-gray-600">When do you need this solution implemented?</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Project Timeline *</label>
              <div className="grid gap-4">
                {urgencyOptions.map(option => (
                  <div
                    key={option.value}
                    onClick={() => updateFormData({ urgency: option.value })}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.urgency === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{option.label}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{option.timeline}</p>
                      </div>
                      {formData.urgency === option.value && (
                        <SafeIcon icon={FiCheck} className="text-primary-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.urgency && <p className="text-red-500 text-sm mt-1">{errors.urgency}</p>}
            </div>

            {/* Urgency Details Field */}
            {formData.urgency && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline Details & Project Constraints
                </label>
                <textarea
                  value={formData.urgencyDetails || ''}
                  onChange={(e) => updateFormData({ urgencyDetails: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="3"
                  placeholder="Explain deadline reasons, project milestones, dependencies, or scheduling constraints..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Additional Requirements & Special Wishes</label>
              <textarea
                value={formData.additionalRequirements || ''}
                onChange={(e) => updateFormData({ additionalRequirements: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="6"
                placeholder="Share any additional requirements, special wishes, technical constraints, existing systems to integrate with, training needs, support requirements, or other important details that will help us create the perfect solution for you..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Company Logo (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {formData.logo ? (
                  <div className="space-y-4">
                    <img src={formData.logo} alt="Company Logo" className="max-h-20 mx-auto rounded" />
                    <p className="text-sm text-gray-600">Logo will be included in your PDF proposal</p>
                    <button
                      type="button"
                      onClick={() => updateFormData({ logo: null })}
                      className="text-red-500 hover:text-red-700 flex items-center space-x-1 mx-auto"
                    >
                      <SafeIcon icon={FiX} />
                      <span>Remove Logo</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <SafeIcon icon={FiUpload} className="text-4xl text-gray-400 mx-auto" />
                    <div>
                      <label className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium">
                        Click to upload your company logo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 2MB</p>
                      <p className="text-xs text-gray-400 mt-1">Your logo will be included in the PDF proposal</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Power Platform Cost Calculator</h1>
          <p className="text-gray-600">Step {currentStep} of {totalSteps}</p>
          {isProcessing && (
            <div className="mt-4">
              <div className="flex items-center justify-center space-x-2 text-primary-600">
                <SafeIcon icon={FiMail} className="animate-pulse" />
                <span className="text-sm">{processingStatus}</span>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Authentication Status */}
        {isAuthenticated && profile && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="text-green-600" />
              <span className="text-sm text-green-800">
                <strong>Logged in as:</strong> {profile.name} ({profile.role}) - Your estimate will be saved automatically!
              </span>
            </div>
          </div>
        )}

        {/* Anonymous User Notice */}
        {!isAuthenticated && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiInfo} className="text-blue-600" />
              <div className="text-sm text-blue-800">
                <p><strong>Continue as guest</strong> - You can still download your PDF estimate!</p>
                <p className="mt-1">
                  <button 
                    onClick={() => navigate('/signup')} 
                    className="text-blue-700 hover:text-blue-900 underline"
                  >
                    Create an account
                  </button> to save estimates and access additional features.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Download Option Modal for Anonymous Users */}
        {showDownloadOption && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-4"
            >
              <div className="text-center">
                <SafeIcon icon={FiDownload} className="text-6xl text-primary-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Estimate is Ready!</h3>
                <p className="text-gray-600 mb-6">
                  Would you like to download your PDF estimate before continuing?
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleDownloadAndContinue}
                    className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiDownload} />
                    <span>Download PDF & Continue</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowDownloadOption(false);
                      navigate('/results');
                    }}
                    className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Continue Without Download
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  You can always download the PDF from the results page
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1 || isProcessing}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1 || isProcessing
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Previous</span>
          </button>

          <button
            onClick={nextStep}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>
              {currentStep === totalSteps
                ? (isProcessing ? processingStatus || 'Processing...' : 'Get My Estimate')
                : 'Next'
              }
            </span>
            <SafeIcon icon={currentStep === totalSteps ? FiMail : FiArrowRight} />
          </button>
        </div>

        {/* Email notification info */}
        {currentStep === totalSteps && (
          <div className="mt-4 text-center space-y-2">
            <p className="text-sm text-gray-600 flex items-center justify-center space-x-2">
              <SafeIcon icon={FiMail} className="text-primary-500" />
              <span>Your detailed proposal will be automatically sent to pp@m365.show</span>
            </p>
            {isAuthenticated && profile && (
              <p className="text-sm text-green-600 flex items-center justify-center space-x-2">
                <SafeIcon icon={FiDatabase} className="text-green-500" />
                <span>Estimate will be saved to your account for future reference</span>
              </p>
            )}
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <SafeIcon icon={FiLinkedin} className="text-lg" />
              <a
                href="https://www.linkedin.com/school/m365-show/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                Follow M365 Show on LinkedIn for Power Platform insights
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;