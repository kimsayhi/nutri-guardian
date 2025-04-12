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
import { PropsWithChildren } from "react";
import { signup } from "@/actions/auth";

const signUpSchema = z
  .object({
    email: z.string().email("올바른 이메일 형식이 아니에요"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 해요")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
        "비밀번호는 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 해요"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않아요",
    path: ["confirmPassword"],
  });

export default function SignUpForm({ children }: PropsWithChildren) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    await signup(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>회원 가입</CardTitle>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel htmlFor="confirmPassword">비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" id="confirmPassword" {...field} />
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />
            <Button type="submit">가입하기</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
}
