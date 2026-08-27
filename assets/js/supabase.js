// =====================================
// GANIT SETU - Supabase Connection
// =====================================

const SUPABASE_URL = 
"https://xgmeivfvuujculkplxjf.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = 
"sb_publishable_cORbSXbHOaHzsIHuh2CACQ_vwFXy-zE";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);