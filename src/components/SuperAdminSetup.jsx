import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { supabaseHelpers } from '../utils/supabase';

const { FiShield, FiCheck, FiX, FiUser, FiMail, FiLock, FiDatabase, FiArrowRight, FiUsers } = FiIcons;

function SuperAdminSetup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    checkDatabase();
  }, []);

  const checkDatabase = async () => {
    try {
      setCheckingStatus(true);
      const result = await supabaseHelpers.initializeDatabase();
      setUsers(result.users);
      setSuccess(true);
    } catch (error) {
      console.log('Error checking database:', error);
      setError('Database needs initialization');
    } finally {
      setCheckingStatus(false);
    }
  };

  const testLogin = async (email, password, name) => {
    try {
      setLoading(true);
      setError('');
      
      const result = await supabaseHelpers.signIn(email, password);
      
      if (result && result.profile) {
        setSuccess(true);
        console.log('✅ Login test successful for:', name);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        throw new Error('Login test failed - no profile returned');
      }
    } catch (error) {
      console.error('❌ Login test failed:', error);
      setError('Login test failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTestUser = async () => {
    try {
      setLoading(true);
      setError('');
      
      const testUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123!',
        role: 'VIEWER',
        company: 'Test Company'
      };

      const result = await supabaseHelpers.signUp(testUserData);
      console.log('✅ Test user created:', result);
      
      // Refresh the user list
      await checkDatabase();
      setSuccess(true);
    } catch (error) {
      console.error('❌ Create test user failed:', error);
      setError('Failed to create test user: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full mx-4"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <SafeIcon icon={FiDatabase} className="text-6xl text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Database Status & Testing
            </h2>
            <p className="text-gray-600">
              Redesigned database with proper structure and authentication
            </p>
          </div>

          {/* Loading Status */}
          {checkingStatus && (
            <div className="mb-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Checking database status...</p>
            </div>
          )}

          {/* Success Status */}
          {!checkingStatus && users.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center space-x-3 mb-3">
                <SafeIcon icon={FiCheck} className="text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">Database Ready!</h4>
                  <p className="text-sm text-green-800">
                    Found {users.length} users in the database
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* User List */}
          {!checkingStatus && users.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <SafeIcon icon={FiUsers} className="mr-2" />
                Available Users
              </h3>
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div>
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiUser} className="text-gray-400" />
                        <span className="font-medium">{user.name}</span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          user.role === 'SUPER_ADMIN' ? 'bg-red-100 text-red-800' :
                          user.role === 'MANAGER' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center mt-1">
                        <SafeIcon icon={FiMail} className="mr-1" />
                        {user.email}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {user.email === 'mirko.peters@m365.show' && (
                        <button
                          onClick={() => testLogin(user.email, 'Bierjunge123!', user.name)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          {loading ? '...' : 'Login'}
                        </button>
                      )}
                      {user.email === 'marcel.broschk@cgi.com' && (
                        <button
                          onClick={() => testLogin(user.email, 'marcel123!', user.name)}
                          disabled={loading}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                          {loading ? '...' : 'Login'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-green-700"
            >
              <SafeIcon icon={FiCheck} />
              <span className="text-sm">
                Login test successful! Redirecting to dashboard...
              </span>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700"
            >
              <SafeIcon icon={FiX} />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={createTestUser}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <SafeIcon icon={FiUser} />
                  <span>Create Test User</span>
                </>
              )}
            </button>

            <button
              onClick={checkDatabase}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <SafeIcon icon={FiDatabase} />
                  <span>Refresh Database Status</span>
                </>
              )}
            </button>
          </div>

          {/* Database Technical Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Database Features</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✅ Proper UUID primary keys</li>
              <li>✅ Fixed RLS policies (no recursion)</li>
              <li>✅ Predefined users created</li>
              <li>✅ Auth linking system</li>
              <li>✅ Role-based permissions</li>
              <li>✅ Estimate management tables</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <button
              onClick={() => navigate('/login')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              → Go to Login Page
            </button>
            <br />
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-700 text-sm"
            >
              ← Back to Calculator
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SuperAdminSetup;