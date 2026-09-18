import { createClient } from '@supabase/supabase-js';

// Substitua com a sua URL e Key copiadas do painel do Supabase
const supabaseUrl = 'COLE_A_SUA_PROJECT_URL_AQUI';
const supabaseKey = 'COLE_A_SUA_API_KEY_AQUI';

export const supabase = createClient(supabaseUrl, supabaseKey);