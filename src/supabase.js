import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bmwndoafsdllkhuxtlld.supabase.co';
const supabaseKey = 'sb_publishable_aMD4r0UBiXTEhu1kzLQK4w_jdlE50rU';

export const supabase = createClient(supabaseUrl, supabaseKey);