import { createClient } from "@supabase/supabase-js"

console.log("[v0] Initializing Supabase client")
console.log("[v0] SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Missing")
console.log(
  "[v0] SUPABASE_ANON_KEY:",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? "✓ Set (length: " + (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0) + ")"
    : "✗ Missing",
)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("[v0] CRITICAL: Missing Supabase environment variables!")
  console.error("[v0] SUPABASE_URL:", supabaseUrl || "MISSING")
  console.error("[v0] SUPABASE_ANON_KEY:", supabaseAnonKey ? "SET" : "MISSING")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log("[v0] Supabase client created successfully")
