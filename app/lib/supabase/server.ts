import { ProfileType } from '@/app/models/supabase.models'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                    }
                },
            },
        }
    )
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) throw new Error('Authentication error')
  return user
}



export async function isUserType(type: ProfileType[]) {
    const supabase = await createClient()

    try {
      const user = await getCurrentUser();
      
      if (!user) return false;
    
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('profile_type')
        .eq('user_id', user?.id)
        .single();
  
      if (error) throw error;
      
      return type.includes(profile?.profile_type);
    } catch (error) {
      return false;
    }
  }