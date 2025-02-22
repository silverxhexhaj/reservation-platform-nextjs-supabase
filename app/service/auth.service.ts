import { supabase } from '@/app/lib/supabase/client';
import { AuthState } from '@/app/models/auth.models';
import { ProfileType } from '@/app/models/supabase.models';

let authState: AuthState = {
    user: null,
    profile: null,
    isLoading: true,
    error: null
};

async function initializeAuth() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    
    authState.user = session?.user ?? null;
    authState.isLoading = false;


    // Fetch user profile if we have a user
    if (authState.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authState.user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      authState.profile = profile;
    }

    // Set up auth state change listener
    supabase.auth.onAuthStateChange((_event, session) => {
      authState.user = session?.user ?? null;
    });

  } catch (error) {
    authState.error = error as Error;
    authState.isLoading = false;
  }
}

async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
}

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    throw error;
  }
}

export async function getUser() {
  if (!authState.user) {
    await initializeAuth();
  }

  return authState.user;
}

function isAuthenticated() {
  return !!authState.user;
}

async function isPartner() {
  return isUserType('staff');
}

async function isClient() {
  return isUserType('client');
}

async function isUserType(type: ProfileType) {
  try {
    const user = await getUser();
    if (!user) return false;
    
    if (authState.profile) {
      return authState.profile.profile_type === type;
    }

    return false;
  } catch (error) {
    return false;
  }
}

function getAuthState() {
  return authState;
}


initializeAuth();

export const authService = {
  signIn,
  signUp,
  signOut,
  getUser,
  isAuthenticated,
  getAuthState,
  isPartner,
  isClient,
};
