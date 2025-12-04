import { createBrowserClient } from '@supabase/supabase-js';

// Client-side supabase instance. Uses public anon key.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Server-side supabase helper that uses service key.
export function createServerSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createBrowserClient(supabaseUrl, supabaseKey);
}