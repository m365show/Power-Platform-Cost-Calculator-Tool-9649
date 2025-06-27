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
  // Authentication functions
  async signIn(email, password) {
    try {
      console.log('🔄 Attempting to sign in:', email);
      
      // First check if user exists in our database
      const { data: userProfile, error: profileError } = await supabase
        .from('users_ppc_2024')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (profileError) {
        console.error('❌ Database query error:', profileError);
        if (profileError.code === 'PGRST116') {
          throw new Error('User not found. Please contact an administrator.');
        }
        throw new Error('Database error: ' + profileError.message);
      }

      if (!userProfile) {
        console.error('❌ User not found in database');
        throw new Error('User not found or inactive. Please contact an administrator.');
      }

      console.log('✅ User found in database:', userProfile.name, 'Role:', userProfile.role);

      // Try to sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        console.log('⚠️ Auth error, trying to create auth user:', authError.message);
        
        // If auth user doesn't exist, create it
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: userProfile.name,
              role: userProfile.role
            }
          }
        });

        if (signUpError && !signUpError.message.includes('already registered')) {
          console.error('❌ Auth signup error:', signUpError);
          throw new Error('Authentication setup failed: ' + signUpError.message);
        }

        // Try signing in again after creating auth user
        const { data: retryAuthData, error: retryError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (retryError) {
          console.error('❌ Retry auth failed:', retryError);
          throw new Error('Invalid email or password');
        }

        console.log('✅ Auth user created and signed in');
        
        // Update profile with auth_id
        if (retryAuthData.user) {
          await supabase
            .from('users_ppc_2024')
            .update({ 
              auth_id: retryAuthData.user.id,
              last_active: new Date().toISOString()
            })
            .eq('id', userProfile.id);
          
          userProfile.auth_id = retryAuthData.user.id;
        }

        return {
          user: retryAuthData.user,
          session: retryAuthData.session,
          profile: userProfile
        };
      }

      console.log('✅ Auth sign in successful');

      // Update profile with auth_id if not set and update last active
      const updateData = { last_active: new Date().toISOString() };
      if (!userProfile.auth_id && authData.user) {
        updateData.auth_id = authData.user.id;
        userProfile.auth_id = authData.user.id;
      }

      await supabase
        .from('users_ppc_2024')
        .update(updateData)
        .eq('id', userProfile.id);

      return {
        user: authData.user,
        session: authData.session,
        profile: userProfile
      };
    } catch (error) {
      console.error('❌ Sign in failed:', error);
      throw error;
    }
  },

  async signUp(userData) {
    try {
      console.log('🔄 Creating new user:', userData.email);
      
      // Create auth user first
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
        console.error('❌ Auth signup error:', authError);
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
        console.error('❌ Profile creation error:', profileError);
        throw profileError;
      }

      console.log('✅ User created successfully');
      return { user: authData.user, profile };
    } catch (error) {
      console.error('❌ Sign up failed:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('✅ Signed out successfully');
    } catch (error) {
      console.error('❌ Sign out error:', error);
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
      console.error('❌ Reset password error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('❌ Auth error:', authError);
        return null;
      }

      if (!user) {
        console.log('ℹ️ No authenticated user');
        return null;
      }

      // Get user profile by auth_id first, then by email
      let profile = null;
      let profileError = null;

      // Try to find by auth_id
      const { data: profileByAuthId, error: authIdError } = await supabase
        .from('users_ppc_2024')
        .select('*')
        .eq('auth_id', user.id)
        .single();

      if (authIdError && authIdError.code !== 'PGRST116') {
        console.error('❌ Profile fetch by auth_id error:', authIdError);
      } else if (profileByAuthId) {
        profile = profileByAuthId;
      }

      // If not found by auth_id, try by email
      if (!profile) {
        const { data: profileByEmail, error: emailError } = await supabase
          .from('users_ppc_2024')
          .select('*')
          .eq('email', user.email)
          .single();

        if (emailError && emailError.code !== 'PGRST116') {
          console.error('❌ Profile fetch by email error:', emailError);
          return { ...user, profile: null };
        }

        if (profileByEmail) {
          profile = profileByEmail;
          
          // Update the profile with auth_id
          await supabase
            .from('users_ppc_2024')
            .update({ auth_id: user.id })
            .eq('id', profile.id);
          
          profile.auth_id = user.id;
        }
      }

      if (!profile) {
        console.log('⚠️ No profile found for user');
        return { ...user, profile: null };
      }

      console.log('✅ Current user loaded:', profile.name, 'Role:', profile.role);
      return { ...user, profile };
    } catch (error) {
      console.error('❌ Get current user error:', error);
      return null;
    }
  },

  // Initialize predefined users
  async initializePredefinedUsers() {
    try {
      console.log('🔄 Initializing predefined users...');
      
      const predefinedUsers = [
        {
          name: 'Mirko Peters',
          email: 'mirko.peters@m365.show',
          password: 'Bierjunge123!',
          role: 'SUPER_ADMIN',
          company: 'M365 Show',
          department: 'Administration'
        },
        {
          name: 'Marcel Broschk',
          email: 'marcel.broschk@cgi.com',
          password: 'marcel123!',
          role: 'MANAGER',
          company: 'CGI',
          department: 'Management'
        }
      ];

      for (const userData of predefinedUsers) {
        try {
          // Check if user exists in database
          const { data: existingUser, error: checkError } = await supabase
            .from('users_ppc_2024')
            .select('*')
            .eq('email', userData.email)
            .single();

          if (checkError && checkError.code !== 'PGRST116') {
            console.error(`❌ Error checking user ${userData.email}:`, checkError);
            continue;
          }

          if (existingUser) {
            console.log(`✅ User ${userData.email} already exists in database`);
            
            // Try to create auth user if missing auth_id
            if (!existingUser.auth_id) {
              console.log(`🔄 Creating auth user for ${userData.email}`);
              try {
                const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                  email: userData.email,
                  password: userData.password,
                  user_metadata: {
                    name: userData.name,
                    role: userData.role
                  }
                });

                if (authError && !authError.message.includes('already')) {
                  console.error(`❌ Auth creation error for ${userData.email}:`, authError);
                } else if (authData.user) {
                  // Update profile with auth_id
                  await supabase
                    .from('users_ppc_2024')
                    .update({ auth_id: authData.user.id })
                    .eq('id', existingUser.id);
                  
                  console.log(`✅ Auth user created for ${userData.email}`);
                }
              } catch (authError) {
                console.log(`⚠️ Auth user may already exist for ${userData.email}`);
              }
            }
            continue;
          }

          // User doesn't exist, create both profile and auth user
          console.log(`🔄 Creating new user ${userData.email}`);
          await this.signUp(userData);
          console.log(`✅ Created user: ${userData.email}`);
          
        } catch (error) {
          console.error(`❌ Error processing user ${userData.email}:`, error);
        }
      }
      
      console.log('✅ Predefined users initialization complete');
    } catch (error) {
      console.error('❌ Error initializing predefined users:', error);
    }
  },

  // User management functions
  async getUsers() {
    try {
      const { data, error } = await supabase
        .from('users_ppc_2024')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Get users error:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('❌ Get users failed:', error);
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
        console.error('❌ Update user error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('❌ Update user failed:', error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const { error: deleteError } = await supabase
        .from('users_ppc_2024')
        .delete()
        .eq('id', userId);

      if (deleteError) {
        console.error('❌ Delete user error:', deleteError);
        throw deleteError;
      }

      return { success: true };
    } catch (error) {
      console.error('❌ Delete user failed:', error);
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
        console.error('❌ Save estimate error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('❌ Save estimate failed:', error);
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
        console.error('❌ Get estimates error:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('❌ Get estimates failed:', error);
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
        console.error('❌ Save anonymous estimate error:', error);
        throw error;
      }

      return { ...data, sessionId };
    } catch (error) {
      console.error('❌ Save anonymous estimate failed:', error);
      throw error;
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
        console.error('❌ Request consultation error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('❌ Request consultation failed:', error);
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
        avgValue: allEstimates.length > 0 ? allEstimates.reduce((sum, e) => sum + (e.cost_max || 0), 0) / allEstimates.length : 0,
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
      console.error('❌ Error getting stats:', error);
      return {
        total: 0,
        totalRegistered: 0,
        totalAnonymous: 0,
        completed: 0,
        consultationRequested: 0,
        totalValue: 0,
        avgValue: 0,
        complexityBreakdown: {},
        consultationStats: {
          total: 0,
          pending: 0,
          assigned: 0,
          completed: 0
        }
      };
    }
  }
};

// Initialize predefined users when the module loads
setTimeout(() => {
  supabaseHelpers.initializePredefinedUsers();
}, 3000);

export default supabase;
export { supabase };