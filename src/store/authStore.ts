import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;

  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,

  loadUser: async () => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      set({ user: data.user, isLoading: false });
    } catch (error) {
      set({ user: null, error: error as Error, isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  isLoggedIn: () => {
    return get().user !== null;
  },
}));
