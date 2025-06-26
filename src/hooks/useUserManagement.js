import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabaseHelpers } from '../utils/supabase';

export function useUserManagement() {
  const { profile } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await supabaseHelpers.getUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      const result = await supabaseHelpers.createUser(userData);
      await fetchUsers(); // Refresh the list
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      await supabaseHelpers.updateUser(userId, userData);
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await supabaseHelpers.deleteUser(userId);
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const inviteUser = async (userId) => {
    try {
      // In a real implementation, this would send an invitation email
      console.log('Sending invitation to user:', userId);
      // For now, just update the user to show invitation sent
      await updateUser(userId, { invitation_sent: new Date().toISOString() });
    } catch (error) {
      console.error('Error sending invitation:', error);
      throw error;
    }
  };

  const getUsersByRole = (role) => {
    return users.filter(user => user.role === role);
  };

  const getActiveUsers = () => {
    return users.filter(user => user.is_active);
  };

  const getUserStats = () => {
    const total = users.length;
    const active = users.filter(user => user.is_active).length;
    const inactive = total - active;
    
    const roleStats = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      active,
      inactive,
      roleStats
    };
  };

  return {
    users,
    loading,
    createUser,
    updateUser,
    deleteUser,
    inviteUser,
    getUsersByRole,
    getActiveUsers,
    getUserStats,
    refreshUsers: fetchUsers
  };
}