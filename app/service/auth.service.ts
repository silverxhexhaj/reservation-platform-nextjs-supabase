import { supabase } from '@/app/lib/supabase/client';
import { AuthState } from '@/app/models/auth.models';
import { ProfileType } from '@/app/models/supabase.models';

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

export function getUser() {
  if (!authState.user) {
    initializeAuth();
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
    if (!getUser()) return false;
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('profile_type')
      .eq('user_id', getUser()?.id)
      .single();

    console.log(profile);

    if (error) throw error;
    
    return profile?.profile_type === type;
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
  getAuthState,
  isPartner,
  isClient,
};
