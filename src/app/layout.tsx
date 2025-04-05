import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GNB from "@/components/layout/GNB";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const aggro = localFont({
  src: "../../public/fonts/aggro.woff",
  variable: "--font-aggro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "영양지킴이 - 자녀 식단 추천 서비스",
  description: "자녀의 급식 식단을 분석하고 부족한 영양소를 챙기세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${aggro.variable} antialiased`}>
        <GNB>{children}</GNB>
      </body>
    </html>
  );
}
