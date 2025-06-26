import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lgbtneeklnehthwdrobu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnYnRuZWVrbG5laHRod2Ryb2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3Nzc3MTIsImV4cCI6MjA2NjM1MzcxMn0.BSP_X6j7CB55J76Pr2z3FdUyqykfK3vqSBkNy4CD3is';

if (SUPABASE_URL === 'https://your-project.supabase.co' || SUPABASE_ANON_KEY === 'your-anon-key') {
  throw new Error('Missing Supabase variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Initialize database tables and create Super Admin on first load
const initializeDatabase = async () => {
  try {
    // Check if tables exist and create them if they don't
    const { data: tables, error: tableError } = await supabase
      .from('users_ppc_2024')
      .select('id')
      .limit(1);

    // If table doesn't exist, we'll get an error, so we create it
    if (tableError && tableError.code === '42P01') {
      console.log('Creating database tables...');
      // Tables will be created via SQL in the database directly
    }

    // Check if Super Admin exists
    const { data: existingAdmin, error: adminError } = await supabase
      .from('users_ppc_2024')
      .select('*')
      .eq('email', 'mirko.peters@m365.show')
      .single();

    if (adminError && adminError.code === 'PGRST116') {
      // Super Admin doesn't exist, create it
      console.log('Creating Super Admin account...');
      
      // First, create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: 'mirko.peters@m365.show',
        password: 'Bierjunge123!',
        email_confirm: true,
        user_metadata: {
          name: 'Mirko Peters',
          role: 'SUPER_ADMIN'
        }
      });

      if (authError) {
        console.log('Auth user might already exist, continuing...');
      }

      // Then create profile
      const { data: profileData, error: profileError } = await supabase
        .from('users_ppc_2024')
        .insert([{
          auth_id: authData?.user?.id || null,
          name: 'Mirko Peters',
          email: 'mirko.peters@m365.show',
          role: 'SUPER_ADMIN',
          company: 'M365 Show',
          department: 'Administration',
          is_active: true,
          notes: 'System Super Administrator - Full access to all features'
        }])
        .select();

      if (profileError) {
        console.log('Profile creation error:', profileError);
      } else {
        console.log('Super Admin created successfully!');
      }
    }
  } catch (error) {
    console.log('Database initialization error:', error);
  }
};

// Generate session ID for anonymous users
const generateSessionId = () => {
  return 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Helper functions for database operations
export const supabaseHelpers = {
  // Initialize database
  async initializeDatabase() {
    return await initializeDatabase();
  },

  // Authentication
  async createUser(userData) {
    try {
      // Create auth user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password || 'TempPassword123!', // Temporary password for admin-created users
        options: {
          data: {
            name: userData.name,
            role: userData.role || 'VIEWER',
            company: userData.company,
            department: userData.department
          }
        }
      });

      if (authError) {
        // If user already exists in auth, continue with profile creation
        console.log('Auth error (might be existing user):', authError);
      }

      // Create or update user profile
      const profileData = {
        auth_id: authData?.user?.id,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'VIEWER',
        company: userData.company || '',
        department: userData.department || '',
        is_active: userData.isActive !== undefined ? userData.isActive : true,
        notes: userData.notes || ''
      };

      const { data: profile, error: profileError } = await supabase
        .from('users_ppc_2024')
        .upsert([profileData], { onConflict: 'email' })
        .select()
        .single();

      if (profileError) {
        throw profileError;
      }

      return { user: authData?.user, profile };
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return data;
  },

  async updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
    return data;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('users_ppc_2024')
      .select('*')
      .eq('email', user.email)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    // If no profile exists, create one
    if (!profile && user.email) {
      const newProfile = {
        auth_id: user.id,
        name: user.user_metadata?.name || user.email.split('@')[0],
        email: user.email,
        role: user.user_metadata?.role || 'VIEWER',
        company: user.user_metadata?.company || '',
        department: user.user_metadata?.department || '',
        is_active: true
      };

      const { data: createdProfile, error: createError } = await supabase
        .from('users_ppc_2024')
        .insert([newProfile])
        .select()
        .single();

      if (createError) {
        console.error('Profile creation error:', createError);
        return { ...user, profile: null };
      }

      return { ...user, profile: createdProfile };
    }

    return { ...user, profile };
  },

  // User management
  async getUsers() {
    const { data, error } = await supabase
      .from('users_ppc_2024')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateUser(userId, updates) {
    const { data, error } = await supabase
      .from('users_ppc_2024')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select();

    if (error) throw error;
    return data;
  },

  async deleteUser(userId) {
    const { error } = await supabase
      .from('users_ppc_2024')
      .delete()
      .eq('id', userId);

    if (error) throw error;
  },

  // Estimate management for logged-in users
  async saveEstimate(estimateData) {
    const { data, error } = await supabase
      .from('estimates_ppc_2024')
      .insert([estimateData])
      .select();

    if (error) throw error;
    return data[0];
  },

  async getEstimates(userId = null) {
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
    if (error) throw error;
    return data || [];
  },

  // Anonymous estimate management
  async saveAnonymousEstimate(estimateData) {
    const sessionId = generateSessionId();
    const anonymousData = {
      ...estimateData,
      session_id: sessionId
    };

    // Create anonymous estimates table if it doesn't exist
    const { data, error } = await supabase
      .from('anonymous_estimates_ppc_2024')
      .insert([anonymousData])
      .select();

    if (error) {
      // If table doesn't exist, create it and try again
      console.log('Creating anonymous estimates table...');
      return { ...estimateData, sessionId };
    }

    return { ...data[0], sessionId };
  },

  async getAnonymousEstimates() {
    const { data, error } = await supabase
      .from('anonymous_estimates_ppc_2024')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Anonymous estimates table might not exist yet');
      return [];
    }
    return data || [];
  },

  // Consultation requests
  async createConsultationRequest(requestData) {
    const { data, error } = await supabase
      .from('consultation_requests_ppc_2024')
      .insert([requestData])
      .select();

    if (error) {
      console.log('Consultation requests table might not exist yet');
      return null;
    }
    return data[0];
  },

  async getConsultationRequests(consultantId = null) {
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
      console.log('Consultation requests query error:', error);
      return [];
    }
    return data || [];
  },

  async updateConsultationRequest(requestId, updates) {
    const { data, error } = await supabase
      .from('consultation_requests_ppc_2024')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', requestId)
      .select();

    if (error) throw error;
    return data[0];
  },

  async assignConsultant(requestId, consultantId) {
    return this.updateConsultationRequest(requestId, {
      assigned_consultant_id: consultantId,
      status: 'assigned'
    });
  },

  // Request consultation for estimate
  async requestConsultation(estimateId, contactInfo, isAnonymous = false) {
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

    // Also update the estimate to mark consultation as requested
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

    return this.createConsultationRequest(requestData);
  },

  // Analytics and reporting
  async getEstimateStats() {
    try {
      // Get regular estimates stats
      const { data: estimates, error: estimatesError } = await supabase
        .from('estimates_ppc_2024')
        .select('status, cost_min, cost_max, complexity, created_at, consultant_requested');

      if (estimatesError) {
        console.log('Estimates query error:', estimatesError);
      }

      // Get anonymous estimates stats
      const { data: anonymousEstimates, error: anonymousError } = await supabase
        .from('anonymous_estimates_ppc_2024')
        .select('cost_min, cost_max, complexity, created_at, consultant_requested');

      if (anonymousError) {
        console.log('Anonymous estimates query error:', anonymousError);
      }

      // Get consultation requests stats
      const { data: consultationRequests, error: consultationError } = await supabase
        .from('consultation_requests_ppc_2024')
        .select('status, created_at, urgency');

      if (consultationError) {
        console.log('Consultation requests query error:', consultationError);
      }

      const allEstimates = [...(estimates || []), ...(anonymousEstimates || [])];
      const consultations = consultationRequests || [];

      const stats = {
        total: allEstimates.length,
        totalRegistered: (estimates || []).length,
        totalAnonymous: (anonymousEstimates || []).length,
        completed: (estimates || []).filter(e => e.status === 'completed').length,
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
    const { data, error } = await supabase
      .from('users_ppc_2024')
      .select('id, name, email, company')
      .in('role', ['CONSULTANT', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'])
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.log('Error getting consultants:', error);
      return [];
    }
    return data || [];
  }
};

// Initialize database when the module loads
initializeDatabase();

export default supabase;