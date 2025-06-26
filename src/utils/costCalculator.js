export function calculateCost(formData) {
  let baseCost = 3000; // Increased base cost for more detailed requirements
  let complexity = 1;
  let timeline = '6-8 weeks';
  let complexityLabel = 'Low';

  // Company size multiplier
  const companySizeMultipliers = {
    startup: 0.8,
    small: 1,
    medium: 1.2,
    large: 1.5,
    enterprise: 2
  };

  baseCost *= companySizeMultipliers[formData.companySize] || 1;

  // App type multiplier
  const appTypeMultipliers = {
    internal: 1,
    customer: 1.4,
    workflow: 1.2,
    dashboard: 1.3,
    integration: 1.6
  };

  baseCost *= appTypeMultipliers[formData.appType] || 1;

  // Business challenges complexity
  const challengeComplexity = {
    'manual-processes': 1,
    'data-silos': 2,
    'approval-delays': 1,
    'reporting-issues': 2,
    'compliance-tracking': 3,
    'customer-service': 2,
    'remote-work': 1,
    'cost-reduction': 2
  };

  let challengeMultiplier = 1;
  (formData.businessChallenges || []).forEach(challenge => {
    challengeMultiplier += (challengeComplexity[challenge] || 1) * 0.1;
  });

  baseCost *= challengeMultiplier;

  // Platform tools cost
  const platformCosts = {
    powerapps: 2000,
    powerautomate: 1500,
    powerbi: 2500,
    dataverse: 3000,
    sharepoint: 800,
    teams: 600,
    office365: 1000,
    sql: 3500
  };

  let platformCost = 0;
  (formData.platformTools || []).forEach(tool => {
    platformCost += platformCosts[tool] || 0;
  });

  // Features cost and complexity
  const featureCosts = {
    forms: { cost: 800, complexity: 1 },
    approvals: { cost: 1800, complexity: 2 },
    reports: { cost: 1500, complexity: 2 },
    notifications: { cost: 700, complexity: 1 },
    integrations: { cost: 3000, complexity: 3 },
    ai: { cost: 4000, complexity: 3 },
    mobile: { cost: 2000, complexity: 2 },
    security: { cost: 2200, complexity: 2 },
    document: { cost: 1200, complexity: 2 },
    calendar: { cost: 900, complexity: 1 }
  };

  let featureCost = 0;
  let totalComplexity = 0;
  
  (formData.features || []).forEach(feature => {
    const featureData = featureCosts[feature];
    if (featureData) {
      featureCost += featureData.cost;
      totalComplexity += featureData.complexity;
    }
  });

  // User count multiplier
  const userMultipliers = {
    '1-10': 1,
    '11-25': 1.1,
    '26-50': 1.2,
    '51-100': 1.4,
    '101-250': 1.7,
    '251-500': 2.0,
    '500+': 2.5
  };

  const userMultiplier = userMultipliers[formData.userCount] || 1;

  // Budget consideration (for planning purposes)
  const budgetMultipliers = {
    'under-5k': 0.7,
    '5k-15k': 0.9,
    '15k-30k': 1,
    '30k-50k': 1.1,
    '50k+': 1.2,
    'unsure': 1
  };

  const budgetMultiplier = budgetMultipliers[formData.budget] || 1;

  // Urgency multiplier
  const urgencyMultipliers = {
    asap: 1.8,
    '1month': 1.4,
    '3months': 1,
    '6months': 0.95,
    future: 0.9
  };

  const urgencyMultiplier = urgencyMultipliers[formData.urgency] || 1;

  // Calculate final cost
  const totalCost = (baseCost + platformCost + featureCost) * userMultiplier * budgetMultiplier * urgencyMultiplier;
  
  // Determine complexity level
  const avgComplexity = totalComplexity / Math.max((formData.features || []).length, 1);
  if (avgComplexity >= 2.5) {
    complexityLabel = 'High';
    timeline = '16-24 weeks';
  } else if (avgComplexity >= 1.8) {
    complexityLabel = 'Medium-High';
    timeline = '12-16 weeks';
  } else if (avgComplexity >= 1.2) {
    complexityLabel = 'Medium';
    timeline = '8-12 weeks';
  } else {
    complexityLabel = 'Low';
    timeline = '6-8 weeks';
  }

  // Adjust timeline for urgency
  if (formData.urgency === 'asap') {
    timeline = timeline.replace(/(\d+)-(\d+)/, (match, min, max) => {
      const newMin = Math.max(2, Math.floor(parseInt(min) * 0.6));
      const newMax = Math.floor(parseInt(max) * 0.6);
      return `${newMin}-${newMax}`;
    });
  } else if (formData.urgency === '1month') {
    timeline = timeline.replace(/(\d+)-(\d+)/, (match, min, max) => {
      const newMin = Math.max(3, Math.floor(parseInt(min) * 0.8));
      const newMax = Math.floor(parseInt(max) * 0.8);
      return `${newMin}-${newMax}`;
    });
  }

  return {
    cost: {
      min: Math.floor(totalCost * 0.8),
      max: Math.floor(totalCost * 1.2)
    },
    timeline,
    complexity: complexityLabel
  };
}