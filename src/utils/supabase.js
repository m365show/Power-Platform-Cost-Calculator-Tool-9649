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
  // CRITICAL: Initialize users on app startup
  async initializeUsers() {
    try {
      console.log('🔄 Initializing users...');
      
      const users = [
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
          department: 'Consulting'
        }
      ];

      for (const userData of users) {
        await this.ensureUserExists(userData);
      }

      console.log('✅ User initialization complete');
      return { success: true };
    } catch (error) {
      console.error('❌ User initialization failed:', error);
      throw error;
    }
  },

  // Ensure a specific user exists in database
  async ensureUserExists(userData) {
    try {
      console.log(`🔍 Checking user: ${userData.email}`);
      
      // Check if user exists in database
      const { data: existingProfile, error: profileError } = await supabase
        .from('users_ppc_2024')
        .select('*')
        .eq('email', userData.email)
        .single();

      if (!existingProfile) {
        console.log(`🔄 Creating user profile: ${userData.email}`);
        
        // Create the profile first
        const { data: newProfile, error: createProfileError } = await supabase
          .from('users_ppc_2024')
          .insert([{
            name: userData.name,
            email: userData.email,
            role: userData.role,
            company: userData.company,
            department: userData.department,
            is_active: true
          }])
          .select()
          .single();

        if (createProfileError) {
          console.error(`❌ Profile creation failed for ${userData.email}:`, createProfileError);
          return;
        }

        console.log(`✅ Profile created for: ${userData.email}`);

        // Try to create auth user
        try {
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
              data: {
                name: userData.name,
                role: userData.role
              }
            }
          });

          if (authData?.user && !authError) {
            // Link auth_id to profile
            await supabase
              .from('users_ppc_2024')
              .update({ auth_id: authData.user.id })
              .eq('id', newProfile.id);
            
            console.log(`🔗 Auth linked for: ${userData.email}`);
          }
        } catch (authErr) {
          console.log(`⚠️ Auth creation skipped for ${userData.email}:`, authErr.message);
        }
      } else {
        console.log(`ℹ️ User already exists: ${userData.email}`);
        
        // If profile exists but no auth_id, try to link
        if (!existingProfile.auth_id) {
          try {
            const { data: signInData } = await supabase.auth.signInWithPassword({
              email: userData.email,
              password: userData.password
            });

            if (signInData?.user) {
              await supabase
                .from('users_ppc_2024')
                .update({ auth_id: signInData.user.id })
                .eq('id', existingProfile.id);
              
              console.log(`🔗 Auth linked for existing user: ${userData.email}`);
              await supabase.auth.signOut();
            }
          } catch (linkErr) {
            console.log(`⚠️ Auth linking failed for ${userData.email}:`, linkErr.message);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error ensuring user exists ${userData.email}:`, error);
    }
  },

  // Authentication functions
  async signIn(email, password) {
    try {
      console.log('🔄 Starting sign in process for:', email);
      
      // FIRST: Ensure users are initialized
      await this.initializeUsers();
      
      // Step 1: Check if user exists in our database
      console.log('🔍 Checking user in database...');
      const { data: userProfile, error: profileError } = await supabase
        .from('users_ppc_2024')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (profileError || !userProfile) {
        console.error('❌ User not found in database:', profileError);
        throw new Error('User not found in database. Please contact an administrator.');
      }

      console.log('✅ User found in database:', userProfile.name, 'Role:', userProfile.role);

      // Step 2: Try to authenticate with Supabase Auth
      console.log('🔐 Attempting Supabase auth...');
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        console.log('⚠️ Auth user does not exist, creating auth account...');
        
        // Step 3: Create auth user if it doesn't exist
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
          console.error('❌ Auth signup failed:', signUpError);
          throw new Error('Failed to create authentication account: ' + signUpError.message);
        }

        console.log('✅ Auth user created, attempting login again...');
        
        // Step 4: Try logging in again
        const { data: retryAuthData, error: retryError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (retryError) {
          console.error('❌ Retry login failed:', retryError);
          throw new Error('Login failed after account creation: ' + retryError.message);
        }

        console.log('✅ Login successful after auth account creation');
        
        // Step 5: Link auth_id to profile
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

      console.log('✅ Authentication successful');

      // Step 6: Update profile with auth_id if not already linked
      if (!userProfile.auth_id) {
        console.log('🔗 Linking auth_id to profile...');
        await supabase
          .from('users_ppc_2024')
          .update({ 
            auth_id: authData.user.id,
            last_active: new Date().toISOString()
          })
          .eq('id', userProfile.id);
        
        userProfile.auth_id = authData.user.id;
      } else {
        // Just update last active
        await supabase
          .from('users_ppc_2024')
          .update({ last_active: new Date().toISOString() })
          .eq('id', userProfile.id);
      }

      console.log('✅ Login completed successfully for:', userProfile.name);

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
      
      // Step 1: Create auth user
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

      console.log('✅ Auth user created, creating profile...');

      // Step 2: Create user profile
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

      console.log('✅ User created successfully:', profile.name);
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

      console.log('🔍 Getting user profile for:', user.email);

      // Get user profile by auth_id first, then by email
      let profile = null;

      // Try to find by auth_id
      const { data: profileByAuthId, error: authIdError } = await supabase
        .from('users_ppc_2024')
        .select('*')
        .eq('auth_id', user.id)
        .single();

      if (!authIdError && profileByAuthId) {
        profile = profileByAuthId;
        console.log('✅ Profile found by auth_id:', profile.name);
      } else {
        // If not found by auth_id, try by email
        const { data: profileByEmail, error: emailError } = await supabase
          .from('users_ppc_2024')
          .select('*')
          .eq('email', user.email)
          .eq('is_active', true)
          .single();

        if (!emailError && profileByEmail) {
          profile = profileByEmail;
          console.log('✅ Profile found by email:', profile.name);
          
          // Update the profile with auth_id
          await supabase
            .from('users_ppc_2024')
            .update({ auth_id: user.id })
            .eq('id', profile.id);
          
          profile.auth_id = user.id;
        }
      }

      if (!profile) {
        console.log('⚠️ No profile found for authenticated user');
        return { ...user, profile: null };
      }

      return { ...user, profile };
    } catch (error) {
      console.error('❌ Get current user error:', error);
      return null;
    }
  },

  // Initialize database with proper structure
  async initializeDatabase() {
    try {
      console.log('🔄 Initializing database...');
      
      // Initialize users first
      await this.initializeUsers();
      
      // Check if users exist
      const { data: users } = await supabase
        .from('users_ppc_2024')
        .select('*');
      
      console.log('✅ Database initialization complete. Users found:', users?.length || 0);
      return { success: true, users: users || [] };
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
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
        supabase.from('estimates_ppc_2024').select('status, cost_min, cost_max, complexity, created_at'),
        supabase.from('anonymous_estimates_ppc_2024').select('cost_min, cost_max, complexity, created_at'),
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

export default supabase;
export { supabase };