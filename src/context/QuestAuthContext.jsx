import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { questConfig, getUserId } from '../config/questConfig';

const QuestAuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  needsOnboarding: false,
};

function questAuthReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        needsOnboarding: action.payload.newUser,
        loading: false,
      };
    case 'ONBOARDING_COMPLETE':
      return {
        ...state,
        needsOnboarding: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export function QuestAuthProvider({ children }) {
  const [state, dispatch] = useReducer(questAuthReducer, initialState);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = () => {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    const onboardingComplete = localStorage.getItem('onboardingComplete');

    if (storedUserId && storedToken) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: { userId: storedUserId },
          token: storedToken,
          newUser: !onboardingComplete,
        },
      });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = ({ userId, token, newUser }) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        user: { userId },
        token,
        newUser,
      },
    });
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    dispatch({ type: 'ONBOARDING_COMPLETE' });
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('onboardingComplete');
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    logout,
    completeOnboarding,
  };

  return (
    <QuestAuthContext.Provider value={value}>
      {children}
    </QuestAuthContext.Provider>
  );
}

export function useQuestAuth() {
  const context = useContext(QuestAuthContext);
  if (!context) {
    throw new Error('useQuestAuth must be used within a QuestAuthProvider');
  }
  return context;
}