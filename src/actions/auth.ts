"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// 서버 액션 결과 타입 정의
type AuthResult = { error: string } | { success?: string };

/**
 * 사용자 로그인 처리
 * @param formData 로그인 폼 데이터 (email, password)
 */
export async function login(formData: FormData): Promise<AuthResult> {
  try {
    const supabase = await createClient();
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // 입력값 기본 검증
    if (!data.email || !data.password) {
      return { error: "이메일과 비밀번호를 모두 입력해주세요" };
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.error("Login error:", error.message);

      // 에러 메시지 한글화
      if (error.message === "Invalid login credentials") {
        return { error: "이메일 또는 비밀번호가 올바르지 않습니다" };
      }

      return { error: error.message };
    }

    // 로그인 성공 후 레이아웃과 경로 리프레시
    revalidatePath("/", "layout");

    // 리다이렉트 대신 성공 메시지 반환
    return { success: "로그인 성공" };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다";
    console.error("Unexpected login error:", errorMessage);
    return { error: "로그인 중 오류가 발생했습니다" };
  }
}

/**
 * 회원가입 처리
 * @param formData 회원가입 폼 데이터 (email, password)
 */
export async function signup(formData: FormData): Promise<AuthResult> {
  try {
    const supabase = await createClient();
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // 입력값 기본 검증
    if (!data.email || !data.password) {
      return { error: "이메일과 비밀번호를 모두 입력해주세요" };
    }

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      console.error("Signup error:", error.message);
      return { error: error.message };
    }

    // 회원가입 성공 후 리다이렉트
    revalidatePath("/", "layout");

    // 리다이렉트 전에 세션이 적용될 시간을 주기 위한 약간의 지연
    await new Promise((resolve) => setTimeout(resolve, 100));

    return { success: "이메일을 확인하여 계정을 활성화해주세요" };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "회원가입 중 오류가 발생했습니다";
    console.error("Unexpected signup error:", errorMessage);
    return { error: "회원가입 중 오류가 발생했습니다" };
  }
}

/**
 * 로그아웃 처리
 */
export async function signout(): Promise<AuthResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Signout error:", error.message);
      return { error: "로그아웃 중 오류가 발생했습니다" };
    }

    // 로그아웃 성공 후 레이아웃과 경로 리프레시
    revalidatePath("/", "layout");

    // 리다이렉트 대신 성공 메시지 반환
    return { success: "성공적으로 로그아웃되었습니다" };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "로그아웃 중 오류가 발생했습니다";
    console.error("Unexpected signout error:", errorMessage);
    return { error: "로그아웃 중 오류가 발생했습니다" };
  }
}
