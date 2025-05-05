export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-8 text-4xl font-bold">영양지킴이에 오신 것을 환영합니다</h1>
      <p className="mb-8 max-w-lg text-lg text-gray-600">
        자녀의 급식 식단을 분석하고 부족한 영양소를 챙겨보세요. 건강한 식습관 형성을 도와주는
        영양지킴이와 함께하세요.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-3 font-medium text-white transition-colors"
        >
          로그인
        </a>
        <a
          href="/signup"
          className="border-primary text-primary rounded-lg border bg-white px-6 py-3 font-medium transition-colors hover:bg-gray-50"
        >
          회원가입
        </a>
      </div>
    </div>
  );
}
