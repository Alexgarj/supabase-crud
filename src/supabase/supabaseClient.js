import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL= "https://yfugduwlqkcxeyrfwjec.supabase.co",
  import.meta.env.VITE_SUPABASE_ANON_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmdWdkdXdscWtjeGV5cmZ3amVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzc0ODUsImV4cCI6MjA3MzcxMzQ4NX0.9Vd6LLccCMsY4Q0Db9qI9pAsv4XuOxvvoL4jDMJB5dw"
);
export default supabase;