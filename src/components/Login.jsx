import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const { FiLock, FiMail, FiEye, FiEyeOff, FiLogIn, FiAlertCircle, FiUserPlus, FiCheck } = FiIcons;

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    console.log('🔄 Submitting login form:', formData.email);
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      console.log('✅ Login successful, redirecting to dashboard');
      navigate('/dashboard');
    } else {
      console.error('❌ Login failed:', result.error);
      setError(result.error || 'Login failed');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setError('');

    try {
      // For now, just show a message since we don't have email configured
      setResetSent(true);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setResetLoading(false);
    }
  };

  const resetForgotPasswordState = () => {
    setShowForgotPassword(false);
    setResetEmail('');
    setResetSent(false);
    setError('');
  };

  // Quick login buttons for testing
  const quickLogin = async (email, password) => {
    console.log('🔄 Quick login attempt:', email);
    setFormData({ email, password });
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      console.log('✅ Quick login successful');
      navigate('/dashboard');
    } else {
      console.error('❌ Quick login failed:', result.error);
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {showForgotPassword ? 'Reset Password' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {showForgotPassword 
                ? 'Enter your email to receive password reset instructions' 
                : 'Sign in to your Power Platform Calculator account'
              }
            </p>
          </div>

          {/* Quick Login Buttons for Testing */}
          {!showForgotPassword && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 mb-3 font-medium">Quick Login (Testing):</p>
              <div className="space-y-2">
                <button
                  onClick={() => quickLogin('mirko.peters@m365.show', 'Bierjunge123!')}
                  className="w-full text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login as Super Admin (Mirko Peters)'}
                </button>
                <button
                  onClick={() => quickLogin('marcel.broschk@cgi.com', 'marcel123!')}
                  className="w-full text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login as Manager (Marcel Broschk)'}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700"
            >
              <SafeIcon icon={FiAlertCircle} />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Success Message for Password Reset */}
          {resetSent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-green-700"
            >
              <SafeIcon icon={FiCheck} />
              <div className="text-sm">
                <p className="font-medium">Password reset requested!</p>
                <p>Please contact an administrator for password reset assistance.</p>
              </div>
            </motion.div>
          )}

          {/* Forgot Password Form */}
          {showForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={resetLoading || resetSent}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {resetLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : resetSent ? (
                  <>
                    <SafeIcon icon={FiCheck} />
                    <span>Request Sent</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiMail} />
                    <span>Request Reset</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={resetForgotPasswordState}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <SafeIcon icon={showPassword ? FiEyeOff : FiEye} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <SafeIcon icon={FiLogIn} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
          )}

          {!showForgotPassword && (
            <>
              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => navigate('/signup')}
                    className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center space-x-1"
                  >
                    <SafeIcon icon={FiUserPlus} />
                    <span>Create Account</span>
                  </button>
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/')}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  ← Back to Calculator
                </button>
              </div>
            </>
          )}

          {/* Debug Info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-3 bg-gray-50 rounded text-xs text-gray-600">
              <p><strong>Debug Info:</strong></p>
              <p>Loading: {loading ? 'true' : 'false'}</p>
              <p>Email: {formData.email}</p>
              <p>Password: {formData.password ? '***' : 'empty'}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Login;