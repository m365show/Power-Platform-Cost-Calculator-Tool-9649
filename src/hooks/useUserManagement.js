import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { firebaseHelpers } from '../utils/firebase';

export function useUserManagement() {
  const { profile } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await firebaseHelpers.getUsers();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching Firebase users:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      setError(null);
      const result = await firebaseHelpers.signUp(userData);
      await fetchUsers(); // Refresh the list
      return result;
    } catch (error) {
      console.error('Error creating Firebase user:', error);
      setError(error.message);
      throw error;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      setError(null);
      await firebaseHelpers.updateUser(userId, userData);
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating Firebase user:', error);
      setError(error.message);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      setError(null);
      await firebaseHelpers.deleteUser(userId);
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting Firebase user:', error);
      setError(error.message);
      throw error;
    }
  };

  const inviteUser = async (userId) => {
    try {
      setError(null);
      // In a real implementation, this would send an invitation email
      console.log('Sending Firebase invitation to user:', userId);
      // For now, just update the user to show invitation sent
      await updateUser(userId, { invitationSent: new Date().toISOString() });
    } catch (error) {
      console.error('Error sending Firebase invitation:', error);
      setError(error.message);
      throw error;
    }
  };

  const getUsersByRole = (role) => {
    return users.filter(user => user.role === role);
  };

  const getActiveUsers = () => {
    return users.filter(user => user.isActive);
  };

  const getUserStats = () => {
    const total = users.length;
    const active = users.filter(user => user.isActive).length;
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
    error,
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