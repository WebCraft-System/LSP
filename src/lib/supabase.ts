import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any, context: string = 'Operation') {
  console.error(`${context} failed:`, error)
  
  if (error?.message) {
    return error.message
  }
  
  if (error?.error_description) {
    return error.error_description
  }
  
  return `${context} failed. Please try again.`
}
export const supabase = createClientComponentClient()
// Helper function to validate environment variables
export function validateSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return { url, key }
}