// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iljrrqtcmctrydrtnttg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsanJycXRjbWN0cnlkcnRudHRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMDYyMDIsImV4cCI6MjA1NzU4MjIwMn0.dmiD9z9nfgTr-XxYiKimm5w0Pef5w0K_uKJzjfqIK80";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);