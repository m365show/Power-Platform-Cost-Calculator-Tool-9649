import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabaseHelpers } from '../utils/supabase';
import { supabase } from '../utils/supabase'; // ✅ HINZUGEFÜGT

const AuthContext = createContext();

const PERMISSIONS = {
  SUPER_ADMIN: [
    'view_all_estimates',
    'manage_users',
    'create_users',
    'edit_users',
    'delete_users',
    'export_data',
    'system_settings',
    'view_analytics',
    'approve_estimates',
    'create_estimates',
    'edit_estimates',
    'delete_estimates',
    'manage_consultations',
    'view_all_consultations'
  ],
  ADMIN: [
    'view_all_estimates',
    'manage_users',
    'create_users',
    'edit_users',
    'delete_users',
    'export_data',
    'system_settings',
    'view_analytics',
    'approve_estimates',
    'create_estimates',
    'edit_estimates',
    'manage_consultations',
    'view_all_consultations'
  ],
  MANAGER: [
    'view_team_estimates',
    'view_all_estimates',
    'approve_estimates',
    'view_analytics',
    'create_estimates',
    'edit_estimates',
    'export_team_data',
    'manage_consultations',
    'view_team_consultations'
  ],
  CONSULTANT: [
    'create_estimates',
    'view_own_estimates',
    'edit_own_estimates',
    'export_own_data',
    'manage_own_consultations',
    'view_assigned_consultations'
  ],
  VIEWER: [
    'view_own_estimates',
    'download_own_data'
  ]
};

const initialState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  loading: true,
  permissions: []
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload?.user || null,
        profile: action.payload?.profile || null,
        isAuthenticated: !!action.payload?.user,
        permissions: action.payload?.profile ? PERMISSIONS[action.payload.profile.role] || [] : [],
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        profile: null,
        isAuthenticated: false,
        permissions: [],
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const userData = await supabaseHelpers.getCurrentUser();
        
        if (userData) {
          dispatch({ 
            type: 'SET_USER', 
            payload: { 
              user: userData, 
              profile: userData.profile 
            } 
          });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const userData = await supabaseHelpers.getCurrentUser();
        dispatch({ 
          type: 'SET_USER', 
          payload: { 
            user: userData, 
            profile: userData.profile 
          } 
        });
      } else if (event === 'SIGNED_OUT') {
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const authData = await supabaseHelpers.signIn(email, password);
      const userData = await supabaseHelpers.getCurrentUser();
      
      if (userData && userData.profile) {
        dispatch({ 
          type: 'SET_USER', 
          payload: { 
            user: userData, 
            profile: userData.profile 
          } 
        });
        return { success: true, user: userData };
      } else {
        throw new Error('User profile not found');
      }
    } catch (error) {
      console.error('Login failed:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      return { 
        success: false, 
        error: error.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const signUp = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const result = await supabaseHelpers.signUp({
        ...userData,
        role: 'VIEWER' // Force VIEWER role for public signup
      });
      
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Sign up failed:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async () => {
    try {
      await supabaseHelpers.signOut();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const hasPermission = (permission) => {
    if (!state.isAuthenticated) return false;
    return state.permissions.includes(permission);
  };

  const hasRole = (role) => {
    return state.profile?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(state.profile?.role);
  };

  const canCreateRole = (role) => {
    if (!state.isAuthenticated) return false;
    if (state.profile?.role === 'SUPER_ADMIN') return true;
    if (state.profile?.role === 'ADMIN' && ['VIEWER', 'CONSULTANT', 'MANAGER'].includes(role)) return true;
    return false;
  };

  const value = {
    ...state,
    login,
    signUp,
    logout,
    hasPermission,
    hasRole,
    hasAnyRole,
    canCreateRole
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