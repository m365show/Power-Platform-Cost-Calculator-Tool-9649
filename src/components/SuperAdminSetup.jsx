import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { supabaseHelpers } from '../utils/supabase';

const { FiShield, FiCheck, FiX, FiUser, FiMail, FiLock, FiDatabase } = FiIcons;

function SuperAdminSetup() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [adminExists, setAdminExists] = useState(false);

  useEffect(() => {
    checkSuperAdmin();
  }, []);

  const checkSuperAdmin = async () => {
    try {
      const users = await supabaseHelpers.getUsers();
      const superAdmin = users.find(user => user.role === 'SUPER_ADMIN' && user.email === 'mirko.peters@m365.show');
      setAdminExists(!!superAdmin);
    } catch (error) {
      console.log('Error checking super admin:', error);
    }
  };

  const createSuperAdmin = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Create the Super Admin user
      const result = await supabaseHelpers.createUser({
        name: 'Mirko Peters',
        email: 'mirko.peters@m365.show',
        password: 'Bierjunge123!',
        role: 'SUPER_ADMIN',
        company: 'M365 Show',
        department: 'Administration',
        isActive: true,
        notes: 'System Super Administrator - Full access to all features'
      });

      console.log('Super Admin created:', result);
      setSuccess(true);
      setAdminExists(true);
      
    } catch (error) {
      console.error('Error creating Super Admin:', error);
      setError(error.message || 'Failed to create Super Admin account');
    } finally {
      setLoading(false);
    }
  };

  const initializeDatabase = async () => {
    setLoading(true);
    setError('');

    try {
      await supabaseHelpers.initializeDatabase();
      setSuccess(true);
      await checkSuperAdmin();
    } catch (error) {
      console.error('Error initializing database:', error);
      setError(error.message || 'Failed to initialize database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <SafeIcon icon={FiShield} className="text-6xl text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Super Admin Setup
            </h2>
            <p className="text-gray-600">
              Initialize database and create Super Admin account
            </p>
          </div>

          {/* Status */}
          {adminExists && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiCheck} className="text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">Super Admin Exists</h4>
                  <p className="text-sm text-green-800">
                    mirko.peters@m365.show is already set up as Super Admin
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-green-700"
            >
              <SafeIcon icon={FiCheck} />
              <span className="text-sm">Operation completed successfully!</span>
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

          {/* Super Admin Details */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Super Admin Account Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="text-gray-400" />
                <span>Name: Mirko Peters</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="text-gray-400" />
                <span>Email: mirko.peters@m365.show</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiLock} className="text-gray-400" />
                <span>Password: Bierjunge123!</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiShield} className="text-red-500" />
                <span>Role: SUPER_ADMIN</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!adminExists && (
              <button
                onClick={createSuperAdmin}
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <SafeIcon icon={FiShield} />
                    <span>Create Super Admin</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={initializeDatabase}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <SafeIcon icon={FiDatabase} />
                  <span>Initialize Database</span>
                </>
              )}
            </button>
          </div>

          {/* Permissions Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Super Admin Permissions</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Complete system access</li>
              <li>• Create and manage all user types</li>
              <li>• Access all estimates and data</li>
              <li>• System configuration</li>
              <li>• User role management</li>
              <li>• Database administration</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              ← Go to Login
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SuperAdminSetup;