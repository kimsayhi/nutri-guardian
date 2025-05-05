"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PropsWithChildren, useState } from "react";
import { login } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/utils/toast";

const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아니에요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export default function LoginForm({ children }: PropsWithChildren) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await login(formData);

      if (result && "error" in result) {
        toast.error(result.error);
      } else {
        router.push("/main");
      }
    } catch (err) {
      console.error("로그인 폼 오류 상세:", err);
      toast.error("로그인 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="relative w-full md:max-w-md">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <div className="absolute top-1 right-10 flex flex-col">
          <span>테스트계정</span>
          <div className="flex gap-3">
            <div className="flex flex-col">
              <span>이메일</span>
              <span>test@test.com</span>
            </div>
            <div className="flex flex-col">
              <span>비밀번호</span>
              <span>test123!</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel htmlFor="email">이메일</FormLabel>
                  <FormControl>
                    <Input type="text" id="email" {...field} />
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel htmlFor="password">비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" id="password" {...field} />
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "처리 중..." : "로그인"}
              </Button>
              <div className="text-center text-sm">
                계정이 없으신가요?{" "}
                <Link href="/signup" className="text-blue-500 hover:underline">
                  회원가입
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
}
