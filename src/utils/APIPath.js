export const Loginendpoint = `${
  import.meta.env.VITE_API_SUPABASE_URL
}/auth/v1/token?grant_type=password`;
export const Signupendpoint = `${
  import.meta.env.VITE_API_SUPABASE_URL
}/auth/v1/signup`;
