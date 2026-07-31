// config.js — public runtime configuration.
// The Supabase anon key is a PUBLIC key (it ships in every WillpowerLab browser
// bundle); it is safe to commit. It only permits anon-level access governed by
// your Row Level Security policies.
export const SUPABASE_URL = "https://zignvkswxvtvdzctpkcr.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppZ252a3N3eHZ0dmR6Y3Rwa2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyMjY4NDcsImV4cCI6MjA4MTgwMjg0N30.NMwi2sr-Tp-YPwMtDchj2r8d1xdeJxfSW9RTwGTy9C0";

// WillpowerLab pages we link to (account creation / password reset live there).
export const WILLPOWERLAB_URL = "https://www.willpowerlab.com";

// Accounts allowed to edit the SHARED Bible texts (saved for everyone via Supabase).
// Everyone else sees them read-only.
export const ADMIN_EMAILS = ["artur@willonski.com"];
