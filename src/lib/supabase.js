import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lgbtneeklnehthwdrobu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnYnRuZWVrbG5laHRod2Ryb2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3Nzc3MTIsImV4cCI6MjA2NjM1MzcxMn0.BSP_X6j7CB55J76Pr2z3FdUyqykfK3vqSBkNy4CD3is';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('❌ Supabase configuration missing!');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export { supabase };

// ✅ Auto-create Super Admin and Manager on initialization
(async () => {
  try {
    // Create Super Admin
    const superAdminEmail = 'mirko.peters@m365.show';
    const superAdminPassword = 'Bierjunge123!';
    
    // Check if Super Admin exists
    const { data: existingSuperAdmin, error: fetchError } = await supabase
      .from('users_ppc_2024')
      .select('id, auth_id')
      .eq('email', superAdminEmail)
      .single();

    if (!existingSuperAdmin) {
      console.log('🔄 Creating Super Admin...');
      
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: superAdminEmail,
        password: superAdminPassword,
        options: {
          data: {
            name: 'Mirko Peters',
            role: 'SUPER_ADMIN'
          }
        }
      });

      if (authError && !authError.message.includes('already')) {
        console.error('❌ Super Admin auth creation error:', authError);
      } else {
        // Update the profile with auth_id
        const { error: updateError } = await supabase
          .from('users_ppc_2024')
          .update({ auth_id: authData?.user?.id })
          .eq('email', superAdminEmail);

        if (updateError) {
          console.error('❌ Super Admin profile update error:', updateError);
        } else {
          console.log('✅ Super Admin created successfully:', superAdminEmail);
        }
      }
    } else if (existingSuperAdmin && !existingSuperAdmin.auth_id) {
      console.log('🔄 Linking existing Super Admin profile to auth...');
      
      // Try to sign in to get the auth user
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: superAdminEmail,
        password: superAdminPassword
      });

      if (signInData?.user) {
        // Update profile with auth_id
        await supabase
          .from('users_ppc_2024')
          .update({ auth_id: signInData.user.id })
          .eq('email', superAdminEmail);
        
        console.log('✅ Super Admin profile linked successfully');
        
        // Sign out to not interfere with user session
        await supabase.auth.signOut();
      }
    } else {
      console.log('ℹ️ Super Admin already exists:', superAdminEmail);
    }

    // Create Manager
    const managerEmail = 'marcel.broschk@cgi.com';
    const managerPassword = 'marcel123!';
    
    const { data: existingManager, error: managerFetchError } = await supabase
      .from('users_ppc_2024')
      .select('id, auth_id')
      .eq('email', managerEmail)
      .single();

    if (!existingManager) {
      console.log('🔄 Creating Manager...');
      
      const { data: managerAuthData, error: managerAuthError } = await supabase.auth.signUp({
        email: managerEmail,
        password: managerPassword,
        options: {
          data: {
            name: 'Marcel Broschk',
            role: 'MANAGER'
          }
        }
      });

      if (managerAuthError && !managerAuthError.message.includes('already')) {
        console.error('❌ Manager auth creation error:', managerAuthError);
      } else {
        // Update the profile with auth_id
        const { error: managerUpdateError } = await supabase
          .from('users_ppc_2024')
          .update({ auth_id: managerAuthData?.user?.id })
          .eq('email', managerEmail);

        if (managerUpdateError) {
          console.error('❌ Manager profile update error:', managerUpdateError);
        } else {
          console.log('✅ Manager created successfully:', managerEmail);
        }
      }
    } else if (existingManager && !existingManager.auth_id) {
      console.log('🔄 Linking existing Manager profile to auth...');
      
      const { data: managerSignInData, error: managerSignInError } = await supabase.auth.signInWithPassword({
        email: managerEmail,
        password: managerPassword
      });

      if (managerSignInData?.user) {
        await supabase
          .from('users_ppc_2024')
          .update({ auth_id: managerSignInData.user.id })
          .eq('email', managerEmail);
        
        console.log('✅ Manager profile linked successfully');
        await supabase.auth.signOut();
      }
    } else {
      console.log('ℹ️ Manager already exists:', managerEmail);
    }

  } catch (err) {
    console.error('❌ Initialization error:', err.message);
  }
})();