import { Metadata } from "next";
import LoginForm from "@/components/domain/login/LoginForm";

export const metadata: Metadata = {
  title: "로그인 - 영양지킴이",
  description: "영양지킴이 서비스 로그인 페이지",
};

export default async function Login() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-md flex-col items-center gap-5 px-4 pt-20 md:max-w-full md:flex-row md:items-start md:justify-center">
        <div className="flex w-full flex-col gap-2 text-2xl font-extrabold text-white md:w-auto md:items-end">
          <p>우리 아이 식단 걱정 끝,</p>
          <p>영양지킴이에 오신 것을</p>
          <p>환영합니다!</p>
        </div>

        <LoginForm>{/* <OAuthButtons /> */}</LoginForm>
      </div>
    </div>
  );
}
