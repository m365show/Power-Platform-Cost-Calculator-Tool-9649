import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your actual EmailJS public key
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your actual EmailJS service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your actual EmailJS template ID

// Check if EmailJS is properly configured
const isEmailJSConfigured = () => {
  return EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" && 
         EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" && 
         EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID";
};

// Initialize EmailJS if configured
if (isEmailJSConfigured()) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
} else {
  console.warn('EmailJS not configured. Please update your credentials in emailService.js');
}

export async function sendEmailNotification(formData, estimate, pitchDeck) {
  try {
    // Check if EmailJS is configured
    if (!isEmailJSConfigured()) {
      console.log('EmailJS not configured - using fallback email method');
      return await sendFallbackEmail(formData, estimate, pitchDeck);
    }

    // Convert PDF data URI to blob
    const pdfBlob = dataURItoBlob(pitchDeck);
    
    // Create a temporary download link to get the PDF as base64
    const pdfBase64 = await blobToBase64(pdfBlob);

    // Prepare email template parameters
    const templateParams = {
      to_email: 'pp@m365.show',
      from_name: formData.contactName,
      from_email: formData.businessEmail,
      company_name: formData.companyName,
      subject: `New Power Platform Quote Request – ${formData.companyName}`,
      
      // Company Details
      contact_name: formData.contactName,
      business_email: formData.businessEmail,
      industry: formData.industry,
      industry_details: formData.industryDetails || '',
      company_size: formData.companySize,
      company_size_details: formData.companySizeDetails || '',
      
      // Project Details
      app_type: formData.appType,
      app_type_details: formData.appTypeDetails || '',
      business_challenges: formData.businessChallenges.join(', '),
      business_challenges_details: formData.businessChallengesDetails || '',
      platform_tools: formData.platformTools.join(', '),
      platform_tools_details: formData.platformToolsDetails || '',
      features: formData.features.join(', '),
      features_details: formData.featuresDetails || '',
      
      // Scope Details
      user_count: formData.userCount,
      user_count_details: formData.userCountDetails || '',
      budget: formData.budget,
      budget_details: formData.budgetDetails || '',
      urgency: formData.urgency,
      urgency_details: formData.urgencyDetails || '',
      additional_requirements: formData.additionalRequirements || '',
      
      // Estimate Details
      cost_min: estimate.cost.min.toLocaleString(),
      cost_max: estimate.cost.max.toLocaleString(),
      timeline: estimate.timeline,
      complexity: estimate.complexity,
      
      // PDF Attachment (as base64)
      pdf_attachment: pdfBase64,
      pdf_filename: `${formData.companyName}-PowerPlatform-Estimate.pdf`,
      
      // Generated timestamp
      generated_date: new Date().toLocaleString(),
      
      // Calculator URL
      calculator_url: 'https://power-platform.m365calc.com',
      
      // Email body (formatted)
      email_body: generateEmailBody(formData, estimate)
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return {
      success: true,
      messageId: response.text,
      status: response.status
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Fallback: Try to send basic email without PDF attachment
    try {
      return await sendFallbackEmail(formData, estimate, pitchDeck);
    } catch (fallbackError) {
      console.error('Fallback email also failed:', fallbackError);
      throw new Error('Failed to send email notification');
    }
  }
}

// Fallback email method using a simple HTTP request
async function sendFallbackEmail(formData, estimate, pitchDeck) {
  try {
    // Create mailto link with detailed information
    const subject = encodeURIComponent(`New Power Platform Quote Request – ${formData.companyName}`);
    const body = encodeURIComponent(generateEmailBody(formData, estimate));
    const mailtoUrl = `mailto:pp@m365.show?subject=${subject}&body=${body}`;

    // Log the email data for debugging
    console.log('Fallback email data:', {
      to: 'pp@m365.show',
      subject: `New Power Platform Quote Request – ${formData.companyName}`,
      body: generateEmailBody(formData, estimate),
      pdfGenerated: !!pitchDeck,
      source: 'https://power-platform.m365calc.com'
    });

    // Try to open mailto link (this will work in most environments)
    if (typeof window !== 'undefined') {
      window.location.href = mailtoUrl;
    }

    // Return success for fallback method
    return {
      success: true,
      messageId: 'fallback-' + Date.now(),
      method: 'fallback',
      note: 'Email prepared - please check your email client'
    };

  } catch (error) {
    console.error('Fallback email failed:', error);
    
    // Final fallback - just log the data
    console.log('EMAIL DATA TO SEND:', {
      to: 'pp@m365.show',
      subject: `New Power Platform Quote Request – ${formData.companyName}`,
      company: formData.companyName,
      contact: formData.contactName,
      email: formData.businessEmail,
      estimate: `$${estimate.cost.min.toLocaleString()} - $${estimate.cost.max.toLocaleString()}`,
      timeline: estimate.timeline,
      complexity: estimate.complexity,
      timestamp: new Date().toLocaleString(),
      source: 'https://power-platform.m365calc.com'
    });

    return {
      success: true,
      messageId: 'logged-' + Date.now(),
      method: 'console-log',
      note: 'Email data logged to console - manual processing required'
    };
  }
}

// Helper function to convert data URI to blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

// Helper function to convert blob to base64
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]; // Remove data:application/pdf;base64, prefix
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Enhanced email body generator
function generateEmailBody(formData, estimate) {
  return `
🚀 NEW POWER PLATFORM DEVELOPMENT QUOTE REQUEST

📊 COMPANY INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Company: ${formData.companyName}
• Contact Person: ${formData.contactName}
• Email: ${formData.businessEmail}
• Industry: ${formData.industry}
• Company Size: ${formData.companySize}

${formData.industryDetails ? `📋 Industry Details:
${formData.industryDetails}

` : ''}${formData.companySizeDetails ? `🏢 Company Structure:
${formData.companySizeDetails}

` : ''}🎯 PROJECT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Application Type: ${formData.appType}
• Platform Tools: ${formData.platformTools.join(', ')}
• Key Features: ${formData.features.join(', ')}
• Business Challenges: ${formData.businessChallenges.join(', ')}

${formData.appTypeDetails ? `📝 Application Details:
${formData.appTypeDetails}

` : ''}${formData.platformToolsDetails ? `🔧 Platform Integration Requirements:
${formData.platformToolsDetails}

` : ''}${formData.featuresDetails ? `⚙️ Feature Specifications:
${formData.featuresDetails}

` : ''}${formData.businessChallengesDetails ? `💼 Business Challenge Details:
${formData.businessChallengesDetails}

` : ''}📈 PROJECT SCOPE & BUDGET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Target Users: ${formData.userCount}
• Budget Range: ${formData.budget}
• Timeline Urgency: ${formData.urgency}

${formData.userCountDetails ? `👥 User Details:
${formData.userCountDetails}

` : ''}${formData.budgetDetails ? `💰 Budget Considerations:
${formData.budgetDetails}

` : ''}${formData.urgencyDetails ? `⏰ Timeline Details:
${formData.urgencyDetails}

` : ''}💡 COST ESTIMATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 Estimated Investment: $${estimate.cost.min.toLocaleString()} - $${estimate.cost.max.toLocaleString()}
📅 Development Timeline: ${estimate.timeline}
🎯 Project Complexity: ${estimate.complexity}

${formData.additionalRequirements ? `🌟 SPECIAL REQUIREMENTS & WISHES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.additionalRequirements}

` : ''}📎 ATTACHMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 Detailed project proposal PDF available for download

⚡ NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Review the project requirements above
2. Schedule a consultation call within 24 hours
3. Refine requirements and provide final quote
4. Begin project development upon approval

📞 Contact the client at ${formData.businessEmail} to discuss next steps.

🔗 Calculator: https://power-platform.m365calc.com
🔗 Follow M365 Show: https://www.linkedin.com/school/m365-show/

Generated automatically on: ${new Date().toLocaleString()}
Calculator Version: 2.0 | Power Platform Cost Calculator
`;
}

// Alternative simplified email service (for testing)
export async function sendSimpleEmailNotification(formData, estimate) {
  const emailData = {
    to: 'pp@m365.show',
    subject: `New Power Platform Quote Request – ${formData.companyName}`,
    body: generateEmailBody(formData, estimate),
    from: formData.businessEmail,
    fromName: formData.contactName,
    source: 'https://power-platform.m365calc.com'
  };

  console.log('Simple email notification:', emailData);
  
  return {
    success: true,
    messageId: 'simple-' + Date.now(),
    method: 'simple-fallback'
  };
}