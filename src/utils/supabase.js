import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lgbtneeklnehthwdrobu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnYnRuZWVrbG5laHRod2Ryb2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3Nzc3MTIsImV4cCI6MjA2NjM1MzcxMn0.BSP_X6j7CB55J76Pr2z3FdUyqykfK3vqSBkNy4CD3is';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Generate session ID for anonymous users
const generateSessionId = () => {
  return 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Helper functions for database operations
export const supabaseHelpers = {
  // Initialize database and create Super Admin
  async initializeDatabase() {
    try {
      console.log('Checking database initialization...');
      
      // Check if Super Admin exists
      const { data: existingAdmin, error: adminError } = await supabase
        .from('users_ppc_2024')
        .select('*')
        .eq('email', 'mirko.peters@m365.show')
        .single();

      if (adminError && adminError.code === 'PGRST116') {
        console.log('Super Admin not found, creating...');
        // Create Super Admin if doesn't exist
        await this.createSuperAdmin();
      } else if (existingAdmin) {
        console.log('Super Admin already exists:', existingAdmin.email);
      }

      return { success: true, message: 'Database initialized successfully' };
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  },

  // Create Super Admin account
  async createSuperAdmin() {
    try {
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: 'mirko.peters@m365.show',
        password: 'Bierjunge123!',
        options: {
          data: {
            name: 'Mirko Peters',
            role: 'SUPER_ADMIN'
          }
        }
      });

      if (authError && !authError.message.includes('already')) {
        console.error('Auth creation error:', authError);
        throw authError;
      }

      // Create or update user profile
      const { data: profile, error: profileError } = await supabase
        .from('users_ppc_2024')
        .upsert([{
          auth_id: authData?.user?.id,
          name: 'Mirko Peters',
          email: 'mirko.peters@m365.show',
          role: 'SUPER_ADMIN',
          company: 'M365 Show',
          department: 'Administration',
          is_active: true,
          notes: 'System Super Administrator - Full access to all features'
        }], { onConflict: 'email' })
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }

      console.log('Super Admin created successfully:', profile);
      return profile;
    } catch (error) {
      console.error('Error creating Super Admin:', error);
      throw error;
    }
  },

  // Authentication functions
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      // Update last_active timestamp
      if (data.user) {
        await supabase
          .from('users_ppc_2024')
          .update({ last_active: new Date().toISOString() })
          .eq('email', email);
      }

      return data;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  },

  async signUp(userData) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role || 'VIEWER'
          }
        }
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        throw authError;
      }

      // Create user profile
      const { data: profile, error: profileError } = await supabase
        .from('users_ppc_2024')
        .insert([{
          auth_id: authData.user?.id,
          name: userData.name,
          email: userData.email,
          role: userData.role || 'VIEWER',
          company: userData.company || '',
          department: userData.department || '',
          is_active: true
        }])
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }

      return { user: authData.user, profile };
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  async resetPassword(email) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      if (!user) return null;

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users_ppc_2024')
        .select('*')
        .eq('auth_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile fetch error:', profileError);
        throw profileError;
      }

      // If no profile exists, create one
      if (!profile) {
        const { data: newProfile, error: createError } = await supabase
          .from('users_ppc_2024')
          .insert([{
            auth_id: user.id,
            name: user.user_metadata?.name || user.email.split('@')[0],
            email: user.email,
            role: user.user_metadata?.role || 'VIEWER',
            company: user.user_metadata?.company || '',
            department: user.user_metadata?.department || '',
            is_active: true
          }])
          .select()
          .single();

        if (createError) {
          console.error('Profile creation error:', createError);
          return { ...user, profile: null };
        }

        return { ...user, profile: newProfile };
      }

      return { ...user, profile };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // User management
  async createUser(userData) {
    try {
      // Create auth user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password || 'TempPassword123!',
        options: {
          data: {
            name: userData.name,
            role: userData.role || 'VIEWER'
          }
        }
      });

      if (authError && !authError.message.includes('already')) {
        console.error('Auth creation error:', authError);
        throw authError;
      }

      // Create user profile
      const { data: profile, error: profileError } = await supabase
        .from('users_ppc_2024')
        .upsert([{
          auth_id: authData?.user?.id,
          name: userData.name,
          email: userData.email,
          role: userData.role || 'VIEWER',
          company: userData.company || '',
          department: userData.department || '',
          is_active: userData.isActive !== undefined ? userData.isActive : true,
          notes: userData.notes || ''
        }], { onConflict: 'email' })
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }

      return { user: authData?.user, profile };
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  },

  async getUsers() {
    try {
      const { data, error } = await supabase
        .from('users_ppc_2024')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get users error:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Get users failed:', error);
      throw error;
    }
  },

  async updateUser(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('users_ppc_2024')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Update user error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Update user failed:', error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      // First get the user to find auth_id
      const { data: user, error: getUserError } = await supabase
        .from('users_ppc_2024')
        .select('auth_id')
        .eq('id', userId)
        .single();

      if (getUserError) {
        console.error('Get user for deletion error:', getUserError);
        throw getUserError;
      }

      // Delete from users table (this will cascade delete estimates)
      const { error: deleteError } = await supabase
        .from('users_ppc_2024')
        .delete()
        .eq('id', userId);

      if (deleteError) {
        console.error('Delete user error:', deleteError);
        throw deleteError;
      }

      // Optionally delete auth user (commented out for safety)
      // if (user.auth_id) {
      //   await supabase.auth.admin.deleteUser(user.auth_id);
      // }

      return { success: true };
    } catch (error) {
      console.error('Delete user failed:', error);
      throw error;
    }
  },

  // Estimate management
  async saveEstimate(estimateData) {
    try {
      const { data, error } = await supabase
        .from('estimates_ppc_2024')
        .insert([estimateData])
        .select()
        .single();

      if (error) {
        console.error('Save estimate error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Save estimate failed:', error);
      throw error;
    }
  },

  async getEstimates(userId = null) {
    try {
      let query = supabase
        .from('estimates_ppc_2024')
        .select(`
          *,
          user:users_ppc_2024(name, email, company, role)
        `)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Get estimates error:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Get estimates failed:', error);
      throw error;
    }
  },

  // Anonymous estimate management
  async saveAnonymousEstimate(estimateData) {
    try {
      const sessionId = generateSessionId();
      const anonymousData = {
        ...estimateData,
        session_id: sessionId
      };

      const { data, error } = await supabase
        .from('anonymous_estimates_ppc_2024')
        .insert([anonymousData])
        .select()
        .single();

      if (error) {
        console.error('Save anonymous estimate error:', error);
        throw error;
      }

      return { ...data, sessionId };
    } catch (error) {
      console.error('Save anonymous estimate failed:', error);
      throw error;
    }
  },

  async getAnonymousEstimates() {
    try {
      const { data, error } = await supabase
        .from('anonymous_estimates_ppc_2024')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get anonymous estimates error:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Get anonymous estimates failed:', error);
      return [];
    }
  },

  // Consultation requests
  async requestConsultation(estimateId, contactInfo, isAnonymous = false) {
    try {
      const requestData = {
        estimate_id: !isAnonymous ? estimateId : null,
        anonymous_estimate_id: isAnonymous ? estimateId : null,
        requester_name: contactInfo.name,
        requester_email: contactInfo.email,
        company_name: contactInfo.company,
        phone: contactInfo.phone,
        preferred_contact_method: contactInfo.preferredContact || 'email',
        message: contactInfo.message,
        urgency: contactInfo.urgency || 'normal',
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('consultation_requests_ppc_2024')
        .insert([requestData])
        .select()
        .single();

      if (error) {
        console.error('Request consultation error:', error);
        throw error;
      }

      // Update the estimate to mark consultation as requested
      if (!isAnonymous) {
        await supabase
          .from('estimates_ppc_2024')
          .update({
            consultant_requested: true,
            consultant_request_date: new Date().toISOString(),
            status: 'consultant_requested'
          })
          .eq('id', estimateId);
      } else {
        await supabase
          .from('anonymous_estimates_ppc_2024')
          .update({
            consultant_requested: true,
            consultant_request_date: new Date().toISOString()
          })
          .eq('id', estimateId);
      }

      return data;
    } catch (error) {
      console.error('Request consultation failed:', error);
      throw error;
    }
  },

  async getConsultationRequests(consultantId = null) {
    try {
      let query = supabase
        .from('consultation_requests_ppc_2024')
        .select(`
          *,
          estimate:estimates_ppc_2024(*),
          anonymous_estimate:anonymous_estimates_ppc_2024(*),
          assigned_consultant:users_ppc_2024(name, email)
        `)
        .order('created_at', { ascending: false });

      if (consultantId) {
        query = query.eq('assigned_consultant_id', consultantId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Get consultation requests error:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Get consultation requests failed:', error);
      return [];
    }
  },

  async updateConsultationRequest(requestId, updates) {
    try {
      const { data, error } = await supabase
        .from('consultation_requests_ppc_2024')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .select()
        .single();

      if (error) {
        console.error('Update consultation request error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Update consultation request failed:', error);
      throw error;
    }
  },

  // Analytics and reporting
  async getEstimateStats() {
    try {
      const [estimatesResult, anonymousResult, consultationResult] = await Promise.all([
        supabase.from('estimates_ppc_2024').select('status, cost_min, cost_max, complexity, created_at, consultant_requested'),
        supabase.from('anonymous_estimates_ppc_2024').select('cost_min, cost_max, complexity, created_at, consultant_requested'),
        supabase.from('consultation_requests_ppc_2024').select('status, created_at, urgency')
      ]);

      const estimates = estimatesResult.data || [];
      const anonymousEstimates = anonymousResult.data || [];
      const consultations = consultationResult.data || [];

      const allEstimates = [...estimates, ...anonymousEstimates];

      const stats = {
        total: allEstimates.length,
        totalRegistered: estimates.length,
        totalAnonymous: anonymousEstimates.length,
        completed: estimates.filter(e => e.status === 'completed').length,
        consultationRequested: allEstimates.filter(e => e.consultant_requested).length,
        totalValue: allEstimates.reduce((sum, e) => sum + (e.cost_max || 0), 0),
        avgValue: allEstimates.length > 0 ? 
          allEstimates.reduce((sum, e) => sum + (e.cost_max || 0), 0) / allEstimates.length : 0,
        complexityBreakdown: allEstimates.reduce((acc, e) => {
          if (e.complexity) {
            acc[e.complexity] = (acc[e.complexity] || 0) + 1;
          }
          return acc;
        }, {}),
        consultationStats: {
          total: consultations.length,
          pending: consultations.filter(r => r.status === 'pending').length,
          assigned: consultations.filter(r => r.status === 'assigned').length,
          completed: consultations.filter(r => r.status === 'completed').length
        }
      };

      return stats;
    } catch (error) {
      console.error('Error getting stats:', error);
      return {
        total: 0,
        totalRegistered: 0,
        totalAnonymous: 0,
        completed: 0,
        consultationRequested: 0,
        totalValue: 0,
        avgValue: 0,
        complexityBreakdown: {},
        consultationStats: { total: 0, pending: 0, assigned: 0, completed: 0 }
      };
    }
  },

  // Get consultants for assignment
  async getConsultants() {
    try {
      const { data, error } = await supabase
        .from('users_ppc_2024')
        .select('id, name, email, company')
        .in('role', ['CONSULTANT', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'])
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error getting consultants:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Get consultants failed:', error);
      return [];
    }
  }
};

// Initialize database on module load
supabaseHelpers.initializeDatabase().catch(console.error);

export default supabase;