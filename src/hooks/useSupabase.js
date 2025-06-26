import { useState, useEffect } from 'react';
import supabase, { supabaseHelpers } from '../utils/supabase';

export function useSupabase() {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      if (supabase) {
        // Test the connection
        const { data, error } = await supabase.from('users').select('count', { count: 'exact' });
        setIsConnected(!error);
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      console.log('Supabase connection check failed:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const connectSupabase = async (projectUrl, anonKey) => {
    try {
      // This would typically involve updating environment variables
      // For now, we'll just update the connection status
      console.log('Connecting to Supabase:', { projectUrl, anonKey });
      
      // In a real implementation, you would:
      // 1. Update environment variables or config
      // 2. Reinitialize the Supabase client
      // 3. Test the connection
      
      setIsConnected(true);
      return { success: true };
    } catch (error) {
      console.error('Failed to connect to Supabase:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    isConnected,
    loading,
    connectSupabase,
    supabase,
    helpers: supabaseHelpers
  };
}