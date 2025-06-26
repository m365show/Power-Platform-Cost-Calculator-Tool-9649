import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';
import { useUserManagement } from '../hooks/useUserManagement';

const { FiUsers, FiPlus, FiEdit, FiTrash2, FiShield, FiMail, FiCheck, FiX, FiSearch, FiFilter } = FiIcons;

const ROLES = {
  SUPER_ADMIN: {
    name: 'Super Admin',
    level: 5,
    permissions: ['all'],
    color: 'red',
    description: 'Full system access and user management'
  },
  ADMIN: {
    name: 'Admin',
    level: 4,
    permissions: ['view_all_estimates', 'manage_users', 'export_data', 'system_settings'],
    color: 'purple',
    description: 'Administrative access with user management'
  },
  MANAGER: {
    name: 'Manager',
    level: 3,
    permissions: ['view_team_estimates', 'approve_estimates', 'view_analytics'],
    color: 'blue',
    description: 'Team management and approval capabilities'
  },
  CONSULTANT: {
    name: 'Consultant',
    level: 2,
    permissions: ['create_estimates', 'view_own_estimates', 'edit_estimates'],
    color: 'green',
    description: 'Create and manage estimates for clients'
  },
  VIEWER: {
    name: 'Viewer',
    level: 1,
    permissions: ['view_own_estimates', 'download_own_data'],
    color: 'gray',
    description: 'View and download own estimate data only'
  }
};

function UserManagement() {
  const { user, hasPermission, canCreateRole } = useAuth();
  const { users, loading, createUser, updateUser, deleteUser, inviteUser } = useUserManagement();
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'VIEWER',
    department: '',
    isActive: true
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Get available roles based on admin permissions
  const getAvailableRoles = () => {
    if (canCreateRole('MANAGER') && canCreateRole('CONSULTANT')) {
      return ['VIEWER', 'CONSULTANT', 'MANAGER'];
    }
    return ['VIEWER']; // Default for non-admin users
  };

  const availableRoles = getAvailableRoles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate role permission
    if (!canCreateRole(formData.role) && formData.role !== 'VIEWER') {
      alert('You do not have permission to create users with this role.');
      return;
    }

    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        setEditingUser(null);
      } else {
        await createUser(formData);
      }
      setShowAddUser(false);
      setFormData({
        name: '',
        email: '',
        role: 'VIEWER',
        department: '',
        isActive: true
      });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department || '',
      isActive: user.isActive
    });
    setShowAddUser(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleInvite = async (userId) => {
    try {
      await inviteUser(userId);
      alert('Invitation sent successfully!');
    } catch (error) {
      console.error('Error sending invitation:', error);
    }
  };

  const getRoleColor = (role) => {
    return ROLES[role]?.color || 'gray';
  };

  const getRoleBadgeClass = (role) => {
    const color = getRoleColor(role);
    const colorClasses = {
      red: 'bg-red-100 text-red-800',
      purple: 'bg-purple-100 text-purple-800',
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      gray: 'bg-gray-100 text-gray-800'
    };
    return colorClasses[color] || colorClasses.gray;
  };

  if (!hasPermission('manage_users')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <SafeIcon icon={FiShield} className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access user management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-2">Manage user roles and permissions</p>
              
              {/* Admin Info */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Admin Privileges:</strong> You can create Consultants and Managers. 
                  Viewers can only see their own estimates and download data.
                </p>
              </div>
            </div>
            
            {hasPermission('create_users') && (
              <button
                onClick={() => setShowAddUser(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlus} />
                <span>Add User</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {Object.entries(ROLES).map(([key, role]) => (
                  <option key={key} value={key}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                        <span className="ml-2 text-gray-600">Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No users found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-primary-600 font-medium">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                          {ROLES[user.role]?.name || user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.department || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {hasPermission('edit_users') && (
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <SafeIcon icon={FiEdit} />
                            </button>
                          )}
                          {hasPermission('invite_users') && !user.isActive && (
                            <button
                              onClick={() => handleInvite(user.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <SafeIcon icon={FiMail} />
                            </button>
                          )}
                          {hasPermission('delete_users') && user.id !== user.currentUserId && (
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <SafeIcon icon={FiTrash2} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit User Modal */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddUser(false);
                    setEditingUser(null);
                    setFormData({
                      name: '',
                      email: '',
                      role: 'VIEWER',
                      department: '',
                      isActive: true
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {availableRoles.map((roleKey) => (
                      <option key={roleKey} value={roleKey}>
                        {ROLES[roleKey]?.name || roleKey}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {ROLES[formData.role]?.description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter department"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Active User
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddUser(false);
                      setEditingUser(null);
                      setFormData({
                        name: '',
                        email: '',
                        role: 'VIEWER',
                        department: '',
                        isActive: true
                      });
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiCheck} />
                    <span>{editingUser ? 'Update' : 'Create'} User</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;