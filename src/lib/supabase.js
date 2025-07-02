// This file is deprecated - all functionality moved to Firebase
// Keeping as placeholder to avoid breaking imports during transition

console.warn('⚠️ supabase.js is deprecated. All functionality has been moved to Firebase.');

export const supabase = {
  // Placeholder object to prevent import errors
  auth: {
    signUp: () => Promise.reject('Supabase is deprecated, use Firebase'),
    signInWithPassword: () => Promise.reject('Supabase is deprecated, use Firebase'),
    signOut: () => Promise.reject('Supabase is deprecated, use Firebase'),
    getUser: () => Promise.reject('Supabase is deprecated, use Firebase')
  },
  from: () => ({
    select: () => Promise.reject('Supabase is deprecated, use Firebase'),
    insert: () => Promise.reject('Supabase is deprecated, use Firebase'),
    update: () => Promise.reject('Supabase is deprecated, use Firebase'),
    delete: () => Promise.reject('Supabase is deprecated, use Firebase')
  })
};

export default supabase;