import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';
import { useUserManagement } from '../hooks/useUserManagement';
import { supabaseHelpers } from '../utils/supabase';

const { FiUsers, FiCalculator, FiBarChart3, FiSettings, FiLogOut, FiTrendingUp, FiDollarSign, FiClock, FiShield, FiEye, FiDownload } = FiIcons;

function Dashboard() {
  const navigate = useNavigate();
  const { profile, logout, hasPermission } = useAuth();
  const { getUserStats } = useUserManagement();
  const [activeTab, setActiveTab] = useState('overview');
  const [estimates, setEstimates] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const userStats = getUserStats();

  useEffect(() => {
    loadDashboardData();
  }, [profile]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load estimates based on user role
      let estimatesData = [];
      if (hasPermission('view_all_estimates')) {
        estimatesData = await supabaseHelpers.getEstimates(); // All estimates
      } else {
        estimatesData = await supabaseHelpers.getEstimates(profile?.id); // Own estimates only
      }
      
      setEstimates(estimatesData);
      
      // Calculate stats
      if (hasPermission('view_analytics')) {
        const statsData = await supabaseHelpers.getEstimateStats();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDownload = (pdfUrl, filename) => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = filename;
      link.click();
    }
  };

  const dashboardCards = [
    {
      title: 'My Estimates',
      value: estimates.filter(e => e.user_id === profile?.id).length.toString(),
      change: '+12%',
      icon: FiCalculator,
      color: 'blue'
    },
    {
      title: 'Total Value',
      value: `$${estimates.filter(e => e.user_id === profile?.id).reduce((sum, e) => sum + e.cost_max, 0).toLocaleString()}`,
      change: '+18%',
      icon: FiDollarSign,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: userStats.active.toString(),
      change: '+5%',
      icon: FiUsers,
      color: 'purple',
      permission: 'view_analytics'
    },
    {
      title: 'Avg. Project Value',
      value: stats.avgValue ? `$${Math.round(stats.avgValue).toLocaleString()}` : '$0',
      change: '+8%',
      icon: FiTrendingUp,
      color: 'orange',
      permission: 'view_analytics'
    }
  ];

  const getCardColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };
    return colors[color] || colors.blue;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart3 },
    { id: 'estimates', label: 'Estimates', icon: FiCalculator },
    { id: 'users', label: 'Users', icon: FiUsers, permission: 'manage_users' },
    { id: 'settings', label: 'Settings', icon: FiSettings, permission: 'system_settings' }
  ];

  const filteredTabs = tabs.filter(tab => !tab.permission || hasPermission(tab.permission));
  const visibleCards = dashboardCards.filter(card => !card.permission || hasPermission(card.permission));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">⚡</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Power Platform Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {profile?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium text-sm">
                    {profile?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{profile?.name}</p>
                  <p className="text-xs text-gray-500">{profile?.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 p-2"
                title="Logout"
              >
                <SafeIcon icon={FiLogOut} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {filteredTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{card.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                      <p className="text-sm text-green-600 mt-1">{card.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-lg ${getCardColorClass(card.color)} bg-opacity-10`}>
                      <SafeIcon icon={card.icon} className={`text-2xl ${getCardColorClass(card.color).replace('bg-', 'text-')}`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/calculator')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SafeIcon icon={FiCalculator} className="text-primary-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">New Estimate</p>
                    <p className="text-sm text-gray-600">Create a new project estimate</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('estimates')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <SafeIcon icon={FiBarChart3} className="text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">View Estimates</p>
                    <p className="text-sm text-gray-600">Review saved estimates</p>
                  </div>
                </button>

                {hasPermission('manage_users') && (
                  <button
                    onClick={() => setActiveTab('users')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <SafeIcon icon={FiUsers} className="text-purple-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Manage Users</p>
                      <p className="text-sm text-gray-600">Add or edit user accounts</p>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Estimates</h3>
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading...</p>
                </div>
              ) : estimates.slice(0, 5).map((estimate) => (
                <div key={estimate.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-3">
                  <SafeIcon icon={FiCalculator} className="text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {estimate.company_name} - ${estimate.cost_min.toLocaleString()} - ${estimate.cost_max.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">
                      {estimate.user?.name} • {new Date(estimate.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{estimate.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'estimates' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {hasPermission('view_all_estimates') ? 'All Estimates' : 'My Estimates'}
              </h3>
              <button
                onClick={() => navigate('/calculator')}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                New Estimate
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading estimates...</p>
              </div>
            ) : estimates.length === 0 ? (
              <div className="text-center py-8">
                <SafeIcon icon={FiCalculator} className="text-6xl text-gray-300 mx-auto mb-4" />
                <h4 className="text-xl font-medium text-gray-900 mb-2">No Estimates Yet</h4>
                <p className="text-gray-600 mb-4">Create your first estimate to get started</p>
                <button
                  onClick={() => navigate('/calculator')}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Create Estimate
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cost Range
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timeline
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {estimates.map((estimate) => (
                      <tr key={estimate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{estimate.company_name}</div>
                            <div className="text-sm text-gray-500">{estimate.contact_name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {estimate.app_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${estimate.cost_min.toLocaleString()} - ${estimate.cost_max.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {estimate.timeline}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {estimate.user?.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(estimate.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => navigate('/results')}
                              className="text-primary-600 hover:text-primary-900"
                              title="View estimate"
                            >
                              <SafeIcon icon={FiEye} />
                            </button>
                            {estimate.pdf_url && (
                              <button
                                onClick={() => handleDownload(estimate.pdf_url, `${estimate.company_name}-Estimate.pdf`)}
                                className="text-green-600 hover:text-green-900"
                                title="Download PDF"
                              >
                                <SafeIcon icon={FiDownload} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && hasPermission('manage_users') && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">User Management</h3>
              <button
                onClick={() => navigate('/users')}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Manage Users
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <SafeIcon icon={FiUsers} className="text-3xl text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{userStats.total}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <SafeIcon icon={FiShield} className="text-3xl text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{userStats.active}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <SafeIcon icon={FiClock} className="text-3xl text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">{userStats.inactive}</p>
                <p className="text-sm text-gray-600">Inactive Users</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && hasPermission('system_settings') && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">System Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Send email notifications for new estimates</p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Auto-backup</h4>
                  <p className="text-sm text-gray-600">Automatically backup estimate data daily</p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Analytics Tracking</h4>
                  <p className="text-sm text-gray-600">Track usage analytics and performance metrics</p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;