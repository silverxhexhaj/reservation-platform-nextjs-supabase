import { User } from "@supabase/supabase-js";

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
}




