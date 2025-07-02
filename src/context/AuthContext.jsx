import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { firebaseHelpers } from '../utils/firebase';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  profile: null,
  loading: true,
  error: null
};

function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        loading: action.payload,
        error: null
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        profile: action.payload.profile,
        loading: false,
        error: null
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        profile: null,
        loading: false,
        error: action.payload
      };
    case 'AUTH_LOGOUT':
      return {
        ...initialState,
        loading: false
      };
    default:
      return state;
  }
}

// Role-based permissions
const PERMISSIONS = {
  SUPER_ADMIN: [
    'view_all_estimates',
    'manage_users',
    'create_users',
    'edit_users', 
    'delete_users',
    'invite_users',
    'export_data',
    'system_settings',
    'view_analytics',
    'approve_estimates'
  ],
  ADMIN: [
    'view_all_estimates',
    'manage_users',
    'create_users',
    'edit_users',
    'delete_users',
    'invite_users',
    'export_data',
    'system_settings',
    'view_analytics'
  ],
  MANAGER: [
    'view_team_estimates',
    'approve_estimates',
    'view_analytics',
    'create_users',
    'edit_users'
  ],
  CONSULTANT: [
    'create_estimates',
    'view_own_estimates',
    'edit_estimates'
  ],
  VIEWER: [
    'view_own_estimates',
    'download_own_data'
  ]
};

// Role hierarchy for user creation permissions
const ROLE_HIERARCHY = {
  SUPER_ADMIN: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'CONSULTANT', 'VIEWER'],
  ADMIN: ['MANAGER', 'CONSULTANT', 'VIEWER'],
  MANAGER: ['CONSULTANT', 'VIEWER'],
  CONSULTANT: ['VIEWER'],
  VIEWER: []
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      dispatch({ type: 'AUTH_LOADING', payload: true });
      
      const currentUser = await firebaseHelpers.getCurrentUser();
      
      if (currentUser && currentUser.profile) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: currentUser,
            profile: currentUser.profile
          }
        });
      } else {
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    } catch (error) {
      console.error('Auth state check failed:', error);
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const login = async (email, password) => {
    try {
      dispatch({ type: 'AUTH_LOADING', payload: true });
      
      const result = await firebaseHelpers.signIn(email, password);
      
      if (result && result.profile) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: result.user,
            profile: result.profile
          }
        });
        return { success: true };
      } else {
        throw new Error('Login failed - invalid credentials');
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const signUp = async (userData) => {
    try {
      dispatch({ type: 'AUTH_LOADING', payload: true });
      
      const result = await firebaseHelpers.signUp(userData);
      
      if (result && result.profile) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: result.user,
            profile: result.profile
          }
        });
        return { success: true };
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await firebaseHelpers.signOut();
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if Firebase signOut fails
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  // Permission checking functions
  const hasPermission = (permission) => {
    if (!state.isAuthenticated || !state.profile) return false;
    
    const userRole = state.profile.role;
    const rolePermissions = PERMISSIONS[userRole] || [];
    
    return rolePermissions.includes(permission);
  };

  const canCreateRole = (targetRole) => {
    if (!state.isAuthenticated || !state.profile) return false;
    
    const userRole = state.profile.role;
    const creatableRoles = ROLE_HIERARCHY[userRole] || [];
    
    return creatableRoles.includes(targetRole);
  };

  const hasAnyPermission = (permissionList) => {
    return permissionList.some(permission => hasPermission(permission));
  };

  const isRole = (role) => {
    return state.isAuthenticated && state.profile?.role === role;
  };

  const value = {
    // State
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    profile: state.profile,
    loading: state.loading,
    error: state.error,
    
    // Actions
    login,
    signUp,
    logout,
    checkAuthState,
    
    // Permission helpers
    hasPermission,
    canCreateRole,
    hasAnyPermission,
    isRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}