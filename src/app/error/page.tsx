"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ErrorPage({ searchParams }: { searchParams: { message?: string } }) {
  const router = useRouter();
  const errorMessage = searchParams.message || "알 수 없는 오류가 발생했습니다.";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-red-500">오류가 발생했습니다</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-gray-600">{errorMessage}</p>
            <p className="text-center text-sm text-gray-500">
              5초 후 자동으로 홈페이지로 이동합니다.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={() => router.back()} variant="outline">
            이전 페이지로
          </Button>
          <Button onClick={() => router.push("/")} variant="default">
            홈으로 이동
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
