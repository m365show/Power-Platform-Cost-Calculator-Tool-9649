import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  formData: {
    companyName: '',
    contactName: '',
    businessEmail: '',
    industry: '',
    industryDetails: '',
    companySize: '',
    companySizeDetails: '',
    appType: '',
    appTypeDetails: '',
    businessChallenges: [],
    businessChallengesDetails: '',
    platformTools: [],
    platformToolsDetails: '',
    features: [],
    featuresDetails: '',
    userCount: '',
    userCountDetails: '',
    budget: '',
    budgetDetails: '',
    urgency: '',
    urgencyDetails: '',
    additionalRequirements: '',
    logo: null
  },
  estimate: {
    cost: { min: 0, max: 0 },
    timeline: '',
    complexity: ''
  },
  pitchDeck: null,
  savedEstimate: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload }
      };
    case 'SET_ESTIMATE':
      return {
        ...state,
        estimate: action.payload
      };
    case 'SET_PITCH_DECK':
      return {
        ...state,
        pitchDeck: action.payload
      };
    case 'SET_SAVED_ESTIMATE':
      return {
        ...state,
        savedEstimate: action.payload
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}