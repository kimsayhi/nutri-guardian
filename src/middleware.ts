import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

// 로그인 검사가 필요한 보호된 경로
const PROTECTED_PATHS = ["/main", "/profile", "/record", "/recipe", "/menu"];

// 공개 경로 (로그인 없이 접근 가능)
const PUBLIC_PATHS = ["/login", "/signup", "/auth"];

export async function middleware(request: NextRequest) {
  // 현재 경로
  const path = request.nextUrl.pathname;

  // 로그인/회원가입 페이지 처리
  if (PUBLIC_PATHS.some((publicPath) => path.startsWith(publicPath))) {
    // 리다이렉트하지 않고 세션 쿠키만 업데이트
    return await updateSession(request, { skipRedirect: true });
  }

  // 루트 경로("/") 처리
  if (path === "/") {
    // 세션 업데이트와 함께 사용자 정보 확인
    const response = await updateSession(request, { skipRedirect: true });

    // Supabase 인증 쿠키 확인 (sb-{프로젝트 참조}-auth-token 패턴의 쿠키)
    const hasAuthCookie = Array.from(request.cookies.getAll()).some(
      (cookie) => cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token")
    );

    // 로그인한 사용자가 루트 페이지에 접근하면 main으로 리다이렉트
    if (hasAuthCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/main";

      // 응답과 함께 쿠키 유지
      const redirectResponse = NextResponse.redirect(url);
      // 원래 응답의 모든 쿠키를 리다이렉트 응답에 복사
      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value);
      });

      return redirectResponse;
    }

    return response;
  }

  // 보호된 경로인 경우 (main 등)
  if (PROTECTED_PATHS.some((protectedPath) => path.startsWith(protectedPath))) {
    // Supabase 세션 업데이트
    const response = await updateSession(request);

    // 로그인되지 않은 사용자가 보호된 페이지에 접근하면 랜딩 페이지로 리다이렉트
    if (response.headers.get("location")?.includes("/login")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return response;
  }

  // 그 외 경로는 세션 업데이트만 수행하고 접근 허용
  return await updateSession(request);
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: [
    // 루트 경로 추가
    "/",
    // 로그인 상태 확인이 필요한 모든 경로
    "/main",
    "/profile/:path*",
    "/record/:path*",
    "/recipe/:path*",
    "/menu/:path*",
    "/login",
    "/signup",
    "/auth/:path*",
  ],
};
