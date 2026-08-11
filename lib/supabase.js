import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ssknxyczfkldnnxsfvmj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_81PUXP5IgtySoKaEVw37Iw_F7c6S-nM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
