
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqodvnlgmjwgbedzsmoh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxb2R2bmxnbWp3Z2JlZHpzbW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwODUyMTEsImV4cCI6MjA1NTY2MTIxMX0.wD9huih55qzpTxIUmE08l0BiJaMeDcelJX-fFCMXBXc';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
