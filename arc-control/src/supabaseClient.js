import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qkroggfpfkfrwgxhozid.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrcm9nZ2ZwZmtmcndneGhvemlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNzIwNTUsImV4cCI6MjA0NDc0ODA1NX0.QeBCH_JLhXAUVH1JIScQH3zx_N560y-6SsEu0ZSBSmU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
