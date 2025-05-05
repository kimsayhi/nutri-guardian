import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { signout as serverSignout } from "@/actions/auth";

// 서버 액션 결과 타입
type AuthResult = { error: string } | { success?: string };

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;

  loadUser: () => Promise<void>;
  logout: () => Promise<AuthResult | void>;
  isLoggedIn: () => boolean;
  resetError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  loadUser: async () => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      // AuthSessionMissingError는 정상적인 로그아웃 상태를 의미하므로 에러로 처리하지 않음
      if (error) {
        if (error.name === "AuthSessionMissingError") {
          // 세션이 없는 것은 로그아웃 상태로 간주
          set({ user: null, isLoading: false });
        } else {
          // 다른 에러는 정상적으로 처리
          throw error;
        }
      } else {
        // 정상적으로 사용자 정보가 있는 경우
        set({ user: data.user, isLoading: false });
      }

      // 실시간 인증 상태 변경 감지 설정
      supabase.auth.onAuthStateChange((event, session) => {
        // 이벤트에 따른 상태 업데이트
        if (event === "SIGNED_IN") {
          set({ user: session?.user || null, isLoading: false });
        } else if (event === "SIGNED_OUT") {
          set({ user: null, isLoading: false });
        } else if (event === "USER_UPDATED") {
          set({ user: session?.user || null, isLoading: false });
        }
      });

      // 클린업 함수는 Zustand에서는 직접 관리할 수 없으므로 필요하면 별도로 처리
      // 이 예에서는 단순화를 위해 생략했지만, 필요시 window 이벤트를 활용할 수 있음
    } catch (error) {
      console.error("Auth error:", error);
      set({ user: null, error: error as Error, isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });

      // 서버 액션을 통한 로그아웃 처리
      const result = await serverSignout();

      // 서버 액션이 성공 또는 에러를 반환하면 처리
      if (result) {
        if ("error" in result) {
          throw new Error(result.error);
        }
      }

      // 상태 업데이트
      set({ user: null, isLoading: false });
      return result;
    } catch (error) {
      console.error("Logout error:", error);
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },

  isLoggedIn: () => {
    return get().user !== null;
  },

  resetError: () => {
    set({ error: null });
  },
}));
