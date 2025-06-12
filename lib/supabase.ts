// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const url   = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const admin = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

// client for frontend or public queries
export const supabase = createClient(url, anon);

// client for privileged server-side queries
export const supabaseAdmin = createClient(url, admin);