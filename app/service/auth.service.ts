import { supabase } from '@/lib/supabase';
import { AuthState } from '@/app/models/auth.models';

let authState: AuthState = {
    user: null,
    isLoading: true,
    error: null
};

async function initializeAuth() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    
    authState.user = session?.user ?? null;
    authState.isLoading = false;

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

function getUser() {
  return authState.user;
}

function isAuthenticated() {
  return !!authState.user;
}

export async function isClient() {
  try {
    if (!getUser()) return false;
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('profile_type')
      .eq('user_id', getUser()?.id)
      .single();

    if (error) throw error;
    
    return profile?.profile_type === 'client';
  } catch (error) {
    return false;
  }
}


function getAuthState() {
  return authState;
}

// Initialize auth on module load
initializeAuth();

export const authService = {
  signIn,
  signUp,
  signOut,
  getUser,
  isAuthenticated,
  getAuthState
};
