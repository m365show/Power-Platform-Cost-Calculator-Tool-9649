import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lgbtneeklnehthwdrobu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnYnRuZWVrbG5laHRod2Ryb2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3Nzc3MTIsImV4cCI6MjA2NjM1MzcxMn0.BSP_X6j7CB55J76Pr2z3FdUyqykfK3vqSBkNy4CD3is';

if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});