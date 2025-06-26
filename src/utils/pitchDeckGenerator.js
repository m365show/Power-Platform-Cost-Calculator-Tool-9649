import jsPDF from 'jspdf';

export async function generatePitchDeck(formData, estimate) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Helper function to add centered text
  const addCenteredText = (text, y, fontSize = 12, fontStyle = 'normal') => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);
    const textWidth = pdf.getTextWidth(text);
    const x = (pageWidth - textWidth) / 2;
    pdf.text(text, x, y);
  };

  // Helper function to add left-aligned text
  const addText = (text, x, y, fontSize = 12, fontStyle = 'normal') => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);
    pdf.text(text, x, y);
  };

  // Helper function to wrap text
  const addWrappedText = (text, x, y, maxWidth, fontSize = 12) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4);
  };

  // Helper function to add logo if available
  const addLogo = async (x, y, maxWidth = 60, maxHeight = 40) => {
    if (formData.logo) {
      try {
        // Create an image element to get dimensions
        const img = new Image();
        img.src = formData.logo;
        
        return new Promise((resolve) => {
          img.onload = () => {
            const aspectRatio = img.width / img.height;
            let logoWidth = maxWidth;
            let logoHeight = maxWidth / aspectRatio;
            
            // Adjust if height exceeds max
            if (logoHeight > maxHeight) {
              logoHeight = maxHeight;
              logoWidth = maxHeight * aspectRatio;
            }
            
            pdf.addImage(formData.logo, 'JPEG', x, y, logoWidth, logoHeight);
            resolve({ width: logoWidth, height: logoHeight });
          };
          
          img.onerror = () => {
            console.warn('Failed to load logo image');
            resolve(null);
          };
        });
      } catch (error) {
        console.warn('Error adding logo:', error);
        return null;
      }
    }
    return null;
  };

  // Slide 1: Title Slide with Logo
  pdf.setFillColor(59, 130, 246); // Primary blue
  pdf.rect(0, 0, pageWidth, 60, 'F');
  pdf.setTextColor(255, 255, 255);
  addCenteredText('Power Platform App Development', 30, 24, 'bold');
  addCenteredText('Project Proposal', 45, 18);

  // Add logo if available
  let logoAdded = false;
  if (formData.logo) {
    try {
      const logoInfo = await addLogo(pageWidth - 80, 10, 60, 40);
      if (logoInfo) {
        logoAdded = true;
      }
    } catch (error) {
      console.warn('Failed to add logo to title slide:', error);
    }
  }

  pdf.setTextColor(0, 0, 0);
  
  // Company info section with logo consideration
  let companyInfoY = 80;
  if (logoAdded) {
    // Add logo on the left side of company info
    try {
      await addLogo(margin, companyInfoY - 10, 50, 35);
      // Adjust text position to accommodate logo
      addText(formData.companyName, margin + 60, companyInfoY, 20, 'bold');
      addText(`Prepared for: ${formData.contactName}`, margin + 60, companyInfoY + 20, 14);
      addText(`Industry: ${formData.industry}`, margin + 60, companyInfoY + 35, 12);
    } catch (error) {
      // Fallback to centered layout
      addCenteredText(formData.companyName, companyInfoY, 20, 'bold');
      addCenteredText(`Prepared for: ${formData.contactName}`, companyInfoY + 20, 14);
      addCenteredText(`Industry: ${formData.industry}`, companyInfoY + 35, 12);
    }
  } else {
    // Centered layout without logo
    addCenteredText(formData.companyName, companyInfoY, 20, 'bold');
    addCenteredText(`Prepared for: ${formData.contactName}`, companyInfoY + 20, 14);
    addCenteredText(`Industry: ${formData.industry}`, companyInfoY + 35, 12);
  }

  const today = new Date().toLocaleDateString();
  addCenteredText(`Date: ${today}`, pageHeight - 30, 12);

  // Slide 2: Project Overview
  pdf.addPage();
  
  // Add header with logo
  pdf.setFillColor(245, 245, 245);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  if (formData.logo) {
    try {
      await addLogo(margin, 5, 30, 20);
      addText('Project Overview', margin + 40, 25, 20, 'bold');
    } catch (error) {
      addCenteredText('Project Overview', 25, 20, 'bold');
    }
  } else {
    addCenteredText('Project Overview', 25, 20, 'bold');
  }

  let yPos = 60;
  addText('App Type:', margin, yPos, 14, 'bold');
  addText(getAppTypeLabel(formData.appType), margin + 50, yPos, 14);
  yPos += 20;

  addText('Target Users:', margin, yPos, 14, 'bold');
  addText(formData.userCount, margin + 50, yPos, 14);
  yPos += 20;

  addText('Project Urgency:', margin, yPos, 14, 'bold');
  addText(getUrgencyLabel(formData.urgency), margin + 50, yPos, 14);
  yPos += 30;

  // Add detailed descriptions if provided
  if (formData.appTypeDetails) {
    addText('Application Details:', margin, yPos, 14, 'bold');
    yPos += 15;
    yPos = addWrappedText(formData.appTypeDetails, margin, yPos, contentWidth, 11);
    yPos += 15;
  }

  addText('Platform Tools:', margin, yPos, 14, 'bold');
  yPos += 15;
  formData.platformTools.forEach(tool => {
    addText(`• ${getPlatformToolLabel(tool)}`, margin + 10, yPos, 12);
    yPos += 15;
  });

  // Slide 3: Features & Functionality
  pdf.addPage();
  
  // Add header with logo
  pdf.setFillColor(245, 245, 245);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  if (formData.logo) {
    try {
      await addLogo(margin, 5, 30, 20);
      addText('Features & Functionality', margin + 40, 25, 20, 'bold');
    } catch (error) {
      addCenteredText('Features & Functionality', 25, 20, 'bold');
    }
  } else {
    addCenteredText('Features & Functionality', 25, 20, 'bold');
  }

  yPos = 60;
  addText('Selected Features:', margin, yPos, 14, 'bold');
  yPos += 20;

  formData.features.forEach(feature => {
    addText(`• ${getFeatureLabel(feature)}`, margin + 10, yPos, 12);
    yPos += 15;
  });

  // Add feature details if provided
  if (formData.featuresDetails) {
    yPos += 10;
    addText('Feature Specifications:', margin, yPos, 14, 'bold');
    yPos += 15;
    yPos = addWrappedText(formData.featuresDetails, margin, yPos, contentWidth, 11);
    yPos += 15;
  }

  yPos += 20;
  addText('Business Benefits:', margin, yPos, 14, 'bold');
  yPos += 15;

  const benefits = [
    'Streamlined business processes',
    'Improved data accuracy and accessibility',
    'Enhanced user productivity',
    'Reduced manual work and errors',
    'Better decision-making with real-time data'
  ];

  benefits.forEach(benefit => {
    addText(`• ${benefit}`, margin + 10, yPos, 12);
    yPos += 15;
  });

  // Slide 4: Technical Architecture
  pdf.addPage();
  
  // Add header with logo
  pdf.setFillColor(245, 245, 245);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  if (formData.logo) {
    try {
      await addLogo(margin, 5, 30, 20);
      addText('Technical Architecture', margin + 40, 25, 20, 'bold');
    } catch (error) {
      addCenteredText('Technical Architecture', 25, 20, 'bold');
    }
  } else {
    addCenteredText('Technical Architecture', 25, 20, 'bold');
  }

  yPos = 60;
  addText('Power Platform Components:', margin, yPos, 14, 'bold');
  yPos += 20;

  const architectureDesc = getArchitectureDescription(formData.platformTools);
  yPos = addWrappedText(architectureDesc, margin, yPos, contentWidth, 12);
  yPos += 20;

  // Add platform tools details if provided
  if (formData.platformToolsDetails) {
    addText('Integration Requirements:', margin, yPos, 14, 'bold');
    yPos += 15;
    yPos = addWrappedText(formData.platformToolsDetails, margin, yPos, contentWidth, 11);
    yPos += 15;
  }

  addText('Integration Points:', margin, yPos, 14, 'bold');
  yPos += 15;

  const integrations = [
    'Microsoft 365 ecosystem',
    'SharePoint for document management',
    'Teams integration for collaboration',
    'Outlook for notifications',
    'Azure Active Directory for security'
  ];

  integrations.forEach(integration => {
    addText(`• ${integration}`, margin + 10, yPos, 12);
    yPos += 15;
  });

  // Slide 5: Requirements & Challenges
  pdf.addPage();
  
  // Add header with logo
  pdf.setFillColor(245, 245, 245);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  if (formData.logo) {
    try {
      await addLogo(margin, 5, 30, 20);
      addText('Business Requirements & Challenges', margin + 40, 25, 16, 'bold');
    } catch (error) {
      addCenteredText('Business Requirements & Challenges', 25, 20, 'bold');
    }
  } else {
    addCenteredText('Business Requirements & Challenges', 25, 20, 'bold');
  }

  yPos = 60;
  addText('Business Challenges Addressed:', margin, yPos, 14, 'bold');
  yPos += 15;

  formData.businessChallenges.forEach(challenge => {
    addText(`• ${getBusinessChallengeLabel(challenge)}`, margin + 10, yPos, 12);
    yPos += 15;
  });

  // Add business challenges details if provided
  if (formData.businessChallengesDetails) {
    yPos += 10;
    addText('Challenge Details & Impact:', margin, yPos, 14, 'bold');
    yPos += 15;
    yPos = addWrappedText(formData.businessChallengesDetails, margin, yPos, contentWidth, 11);
    yPos += 15;
  }

  // Add industry details if provided
  if (formData.industryDetails) {
    yPos += 10;
    addText('Industry-Specific Requirements:', margin, yPos, 14, 'bold');
    yPos += 15;
    yPos = addWrappedText(formData.industryDetails, margin, yPos, contentWidth, 11);
  }

  // Slide 6: Cost & Timeline
  pdf.addPage();
  
  // Add header with logo
  pdf.setFillColor(245, 245, 245);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  if (formData.logo) {
    try {
      await addLogo(margin, 5, 30, 20);
      addText('Investment & Timeline', margin + 40, 25, 20, 'bold');
    } catch (error) {
      addCenteredText('Investment & Timeline', 25, 20, 'bold');
    }
  } else {
    addCenteredText('Investment & Timeline', 25, 20, 'bold');
  }

  // Cost box
  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, 60, contentWidth, 40, 'F');
  pdf.setFillColor(59, 130, 246);
  pdf.rect(margin, 60, contentWidth, 8, 'F');

  pdf.setTextColor(255, 255, 255);
  addCenteredText('Estimated Investment', 68, 14, 'bold');

  pdf.setTextColor(0, 0, 0);
  const costRange = `$${estimate.cost.min.toLocaleString()} - $${estimate.cost.max.toLocaleString()}`;
  addCenteredText(costRange, 85, 18, 'bold');

  // Timeline box
  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, 120, contentWidth, 40, 'F');
  pdf.setFillColor(139, 92, 246);
  pdf.rect(margin, 120, contentWidth, 8, 'F');

  pdf.setTextColor(255, 255, 255);
  addCenteredText('Development Timeline', 128, 14, 'bold');

  pdf.setTextColor(0, 0, 0);
  addCenteredText(estimate.timeline, 145, 18, 'bold');
  addCenteredText(`${estimate.complexity} Complexity Project`, 155, 12);

  yPos = 180;
  addText('What\'s Included:', margin, yPos, 14, 'bold');
  yPos += 15;

  const included = [
    'Complete application development',
    'User training and documentation',
    'Testing and quality assurance',
    '30 days post-launch support',
    'Deployment and go-live assistance'
  ];

  included.forEach(item => {
    addText(`• ${item}`, margin + 10, yPos, 12);
    yPos += 15;
  });

  // Slide 7: Additional Requirements & Details
  if (formData.additionalRequirements || formData.urgencyDetails || formData.budgetDetails || formData.userCountDetails) {
    pdf.addPage();
    
    // Add header with logo
    pdf.setFillColor(245, 245, 245);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    
    if (formData.logo) {
      try {
        await addLogo(margin, 5, 30, 20);
        addText('Additional Requirements & Details', margin + 40, 25, 16, 'bold');
      } catch (error) {
        addCenteredText('Additional Requirements & Details', 25, 20, 'bold');
      }
    } else {
      addCenteredText('Additional Requirements & Details', 25, 20, 'bold');
    }

    yPos = 60;

    if (formData.urgencyDetails) {
      addText('Timeline Considerations:', margin, yPos, 14, 'bold');
      yPos += 15;
      yPos = addWrappedText(formData.urgencyDetails, margin, yPos, contentWidth, 11);
      yPos += 20;
    }

    if (formData.userCountDetails) {
      addText('User Requirements:', margin, yPos, 14, 'bold');
      yPos += 15;
      yPos = addWrappedText(formData.userCountDetails, margin, yPos, contentWidth, 11);
      yPos += 20;
    }

    if (formData.budgetDetails) {
      addText('Budget Considerations:', margin, yPos, 14, 'bold');
      yPos += 15;
      yPos = addWrappedText(formData.budgetDetails, margin, yPos, contentWidth, 11);
      yPos += 20;
    }

    if (formData.additionalRequirements) {
      addText('Special Requirements & Wishes:', margin, yPos, 14, 'bold');
      yPos += 15;
      yPos = addWrappedText(formData.additionalRequirements, margin, yPos, contentWidth, 11);
    }
  }

  // Slide 8: Next Steps
  pdf.addPage();
  
  // Add header with logo
  pdf.setFillColor(245, 245, 245);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  if (formData.logo) {
    try {
      await addLogo(margin, 5, 30, 20);
      addText('Next Steps', margin + 40, 25, 20, 'bold');
    } catch (error) {
      addCenteredText('Next Steps', 25, 20, 'bold');
    }
  } else {
    addCenteredText('Next Steps', 25, 20, 'bold');
  }

  yPos = 60;
  const steps = [
    {
      title: 'Expert Review',
      description: 'Our Power Platform consultants will review your requirements and refine the estimate within 24 hours.'
    },
    {
      title: 'Detailed Proposal',
      description: 'Receive a comprehensive project proposal with detailed timeline, milestones, and deliverables.'
    },
    {
      title: 'Project Kickoff',
      description: 'Once approved, we\'ll start the discovery phase and begin building your solution.'
    }
  ];

  steps.forEach((step, index) => {
    // Step number circle
    pdf.setFillColor(59, 130, 246);
    pdf.circle(margin + 8, yPos + 5, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text((index + 1).toString(), margin + 5, yPos + 8);

    // Step content
    pdf.setTextColor(0, 0, 0);
    addText(step.title, margin + 25, yPos + 5, 14, 'bold');
    yPos = addWrappedText(step.description, margin + 25, yPos + 18, contentWidth - 25, 11);
    yPos += 20;
  });

  // Contact info
  yPos += 20;
  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, yPos, contentWidth, 30, 'F');
  addCenteredText('Ready to get started?', yPos + 12, 12, 'bold');
  addCenteredText('Contact us at pp@m365.show', yPos + 25, 11);

  return pdf.output('datauristring');
}

function getAppTypeLabel(appType) {
  const labels = {
    internal: 'Internal Business App',
    customer: 'Customer-Facing App',
    workflow: 'Workflow Automation',
    dashboard: 'Analytics Dashboard',
    integration: 'System Integration'
  };
  return labels[appType] || appType;
}

function getUrgencyLabel(urgency) {
  const labels = {
    asap: 'ASAP (Rush Job)',
    '1month': 'Within 1 Month',
    '3months': 'Next 3 Months',
    '6months': 'Next 6 Months',
    future: 'Future Planning'
  };
  return labels[urgency] || urgency;
}

function getPlatformToolLabel(tool) {
  const labels = {
    powerapps: 'Power Apps',
    powerautomate: 'Power Automate',
    powerbi: 'Power BI',
    dataverse: 'Dataverse',
    sharepoint: 'SharePoint',
    teams: 'Microsoft Teams',
    office365: 'Office 365 Integration',
    sql: 'SQL Database'
  };
  return labels[tool] || tool;
}

function getFeatureLabel(feature) {
  const labels = {
    forms: 'Forms & Data Entry',
    approvals: 'Approval Workflows',
    reports: 'Custom Reports',
    notifications: 'Email/SMS Notifications',
    integrations: 'Third-party Integrations',
    ai: 'AI Copilot Features',
    mobile: 'Mobile Optimization',
    security: 'Advanced Security',
    document: 'Document Management',
    calendar: 'Calendar & Scheduling'
  };
  return labels[feature] || feature;
}

function getBusinessChallengeLabel(challenge) {
  const labels = {
    'manual-processes': 'Too Many Manual Processes',
    'data-silos': 'Data Scattered Across Systems',
    'approval-delays': 'Slow Approval Processes',
    'reporting-issues': 'Lack of Real-time Reporting',
    'compliance-tracking': 'Compliance & Audit Tracking',
    'customer-service': 'Customer Service Efficiency',
    'remote-work': 'Remote Work Collaboration',
    'cost-reduction': 'Operational Cost Reduction'
  };
  return labels[challenge] || challenge;
}

function getArchitectureDescription(platformTools) {
  let description = 'This solution will be built using Microsoft Power Platform components: ';

  const descriptions = {
    powerapps: 'Power Apps for the user interface and business logic',
    powerautomate: 'Power Automate for workflow automation and business processes',
    powerbi: 'Power BI for analytics and reporting dashboards',
    dataverse: 'Dataverse as the primary data storage and management layer',
    sharepoint: 'SharePoint for document management and collaboration',
    teams: 'Microsoft Teams for collaboration and communication',
    office365: 'Office 365 for email automation and document integration',
    sql: 'SQL Server for advanced data storage and complex queries'
  };

  const toolDescriptions = platformTools.map(tool => descriptions[tool]).filter(Boolean);
  description += toolDescriptions.join(', ') + '.';

  return description;
}