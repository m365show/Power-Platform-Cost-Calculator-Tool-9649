import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lgbtneeklnehthwdrobu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnYnRuZWVrbG5laHRod2Ryb2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3Nzc3MTIsImV4cCI6MjA2NjM1MzcxMn0.BSP_X6j7CB55J76Pr2z3FdUyqykfK3vqSBkNy4CD3is';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('❌ Supabase-Konfiguration fehlt!');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export { supabase };

// ✅ Einmalige automatische Erstellung eines Super Admins
(async () => {
  try {
    const email = 'mirko.peters@m365.show';

    const { data: existingUser, error: fetchError } = await supabase
      .from('users_ppc_2024')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      console.log('ℹ️ Super Admin existiert bereits:', email);
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password: 'Bierjunge123!',
      options: {
        data: {
          name: 'Mirko Peters',
          role: 'SUPER_ADMIN'
        }
      }
    });

    if (signUpError) {
      console.error('❌ Fehler beim Anlegen des Super Admins:', signUpError.message);
      return;
    }

    // Profil erstellen
    const { data: profile, error: profileError } = await supabase
      .from('users_ppc_2024')
      .insert([{
        auth_id: signUpData.user.id,
        name: 'Mirko Peters',
        email,
        role: 'SUPER_ADMIN',
        company: 'M365 Show',
        department: 'Administration',
        is_active: true,
        notes: 'System Super Administrator – Full access'
      }]);

    if (profileError) {
      console.error('❌ Fehler beim Erstellen des Profils:', profileError.message);
      return;
    }

    console.log('✅ Super Admin erfolgreich erstellt:', email);
  } catch (err) {
    console.error('❌ Fehler bei der Initialisierung:', err.message);
  }
})();
