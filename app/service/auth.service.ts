import { supabase } from '@/app/lib/supabase/client';
import { AuthState } from '@/app/models/auth.models';
import { ProfileType } from '@/app/models/supabase.models';
import { SignUpOptions } from '../models/signInOptions';

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
      authState.profile = await getProfile(authState.user.id);
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


async function signUp(email: string, password: string, options: SignUpOptions) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          profile_type: options.profile,
          first_name: options.firstName,
          last_name: options.lastName,
          phone: options.phone,
          road_name: options.roadName,
          floor: options.floor,
          side: options.side,
          city_code: options.cityCode,
          city_section: options.citySection,  
          city_name: options.cityName,
          country: options.country,
          business_name: options.businessName,
          description: options.description,
          external_link_facebook: options.facebook,
          external_link_instagram: options.instagram,
          external_link_tiktok: options.twitter,
          external_link_linkedin: options.linkedin, 
          price_range: options.priceRange,
          category: options.category,
        }
      }
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

async function getProfile(userId: string | undefined) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (profileError) {
    throw profileError;
  }

  return profile;
}

export async function getUser() {
  if (!authState.user) {
    await initializeAuth();
  }

  if (!authState.profile && authState?.user?.id) {
    authState.profile = await getProfile(authState.user?.id);
  }

  return {
    user: authState.user,
    profile: authState.profile
  };
}

function isAuthenticated() {
  return !!authState.user;
}

async function isPartner() {
  return isUserType(['staff', 'business_owner']);
}

async function isClient() {
  return isUserType(['client']);
}

async function isUserType(type: ProfileType[]) {
  try {
    const user = await getUser();
    if (!user) return false;

    if (user.profile) {
      return type.includes(user.profile.profile_type);
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
