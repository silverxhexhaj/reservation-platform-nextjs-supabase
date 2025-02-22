import { User } from "@supabase/supabase-js";
import { Profile } from "./supabase.models";

export interface AuthState {
    user: User | null;
    profile: Profile | null;
    isLoading: boolean;
    error: Error | null;
}




