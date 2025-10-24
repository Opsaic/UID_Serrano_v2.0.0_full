import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hlqtcxndetjvtdkisinr.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscXRjeG5ldGp2dGtpc2luciIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzYwNjc1MjAzLCJleHAiOjIwNzYyNTEyMDN9.IKv3E_945BNb20TNvspWBPvF3mLqxSWxzrDVKPngh_A";

console.log("🔍 Verifying Supabase connection...");

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

try {
  const { data, error } = await supabase.from("projects").select("*").limit(5);

  if (error) {
    console.error("❌ Supabase connection failed:", error.message);
    if (error.hint) console.log("💡 Hint:", error.hint);
    process.exit(1);
  }

  console.log("✅ Supabase connection successful!");
  console.log("📦 Data preview:");
  console.table(data);
  process.exit(0);
} catch (err) {
  console.error("🚨 Unexpected error:", err.message);
  process.exit(1);
}
