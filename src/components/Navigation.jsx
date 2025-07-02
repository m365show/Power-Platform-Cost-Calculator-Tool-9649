import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const { FiMenu, FiX, FiHome, FiCalculator, FiBarChart3, FiHelpCircle, FiUsers, FiUser } = FiIcons;

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, hasPermission } = useAuth();

  // Public navigation items - NO Login/Signup here
  const publicNavItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/calculator', label: 'Calculator', icon: FiCalculator },
    { path: '/get-started', label: 'Get Started Guide', icon: FiHelpCircle },
  ];

  // Private navigation items (only shown when authenticated)
  const privateNavItems = [
    { path: '/results', label: 'Results', icon: FiBarChart3, requiresAuth: true },
    { path: '/dashboard', label: 'Dashboard', icon: FiBarChart3 },
    { path: '/users', label: 'Users', icon: FiUsers, permission: 'manage_users' },
  ];

  // Only show private items when authenticated
  const navItems = isAuthenticated 
    ? [...publicNavItems, ...privateNavItems.filter(item => !item.permission || hasPermission?.(item.permission))]
    : publicNavItems;

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('/')}>
            <div className="text-2xl">⚡</div>
            <span className="text-xl font-bold text-gray-900">
              Power Platform Calculator
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={item.icon} className="text-lg" />
                <span>{item.label}</span>
              </button>
            ))}

            {/* User Profile - Only show if authenticated */}
            {isAuthenticated && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                >
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span>{user?.name}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary-600 p-2"
            >
              <SafeIcon icon={isOpen ? FiX : FiMenu} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                </button>
              ))}

              {/* Mobile User Profile - Only show if authenticated */}
              {isAuthenticated && (
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                >
                  <SafeIcon icon={FiUser} className="text-lg" />
                  <span>Dashboard ({user?.name})</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;