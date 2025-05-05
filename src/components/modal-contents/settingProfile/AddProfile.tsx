"use client";

import useSchoolSearch from "@/hooks/useSchoolSearch";
import { useState } from "react";
import { formatSchoolList } from "@/utils/schoolFormat";
import { FormattedSchoolList } from "@/types/school";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateProfileData, Gender, Goal } from "@/types/profile";
import { GenderLabels, GoalLabels } from "@/constants/profileLabels";
import useCreateProfileMutation from "@/hooks/mutation/useCreateProfileMutation";

// Zod 스키마 정의
const profileSchema = z
  .object({
    name: z.string().min(1, "학생 이름은 필수입니다."),
    schoolName: z.string().min(1, "학교는 필수입니다."),
    ATPT_OFCDC_SC_CODE: z.string(),
    SD_SCHUL_CODE: z.string(),
    weight: z.string().min(1, "체중은 필수입니다."),
    goal: z.enum([Goal.BalancedDiet, Goal.WeightLoss]),
    gender: z.enum([Gender.Male, Gender.Female]),
  })
  .refine(
    (data) => {
      return !!data.ATPT_OFCDC_SC_CODE && !!data.SD_SCHUL_CODE;
    },
    {
      message: "검색 결과에서 학교를 선택해주세요",
      path: ["schoolName"],
    }
  );

type ProfileFormValues = z.infer<typeof profileSchema>;

interface AddProfileProps {
  onClose: () => void;
}

export default function AddProfile({ onClose }: AddProfileProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // 프로필 생성 mutation 훅 사용
  const createProfileMutation = useCreateProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      schoolName: "",
      ATPT_OFCDC_SC_CODE: "",
      SD_SCHUL_CODE: "",
      weight: "",
      goal: Goal.BalancedDiet,
      gender: Gender.Male,
    },
  });
  const schoolSearchValue = form.watch("schoolName");
  const { data: schoolsData } = useSchoolSearch(schoolSearchValue);
  const [isFocusSchoolInput, setIsFocusSchoolInput] = useState(false);
  const formattedSchoolList = formatSchoolList(schoolsData);

  // 폼 제출 핸들러
  const onSubmit = async (data: ProfileFormValues) => {
    setError(null);

    const payload: CreateProfileData = {
      name: data.name,
      schoolName: data.schoolName,
      ATPT_OFCDC_SC_CODE: data.ATPT_OFCDC_SC_CODE,
      SD_SCHUL_CODE: data.SD_SCHUL_CODE,
      weight: parseFloat(data.weight),
      goal: data.goal as Goal,
      gender: data.gender as Gender,
    };

    createProfileMutation.mutate(payload, {
      onSuccess: () => {
        router.refresh();
        onClose();
      },
      onError: (err) => {
        console.error("프로필 생성 중 오류 발생:", err);
        setError(err instanceof Error ? err.message : "프로필을 생성하는 중 오류가 발생했습니다.");
      },
    });
  };

  // 학교 선택 핸들러
  const onClickSchoolName = (school: FormattedSchoolList) => {
    form.setValue("schoolName", school.school, { shouldValidate: true });
    form.setValue("ATPT_OFCDC_SC_CODE", school.ATPT_OFCDC_SC_CODE, { shouldValidate: true });
    form.setValue("SD_SCHUL_CODE", school.SD_SCHUL_CODE, { shouldValidate: true });

    form.trigger();

    setIsFocusSchoolInput(false);
  };

  return (
    <>
      <h2 className="flex flex-col items-center justify-center p-2 font-extrabold">프로필 추가</h2>
      {error && <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-500">{error}</div>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between gap-5 pt-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel htmlFor="name">학생 이름</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="이름을 입력하세요."
                    className="rounded-t-lg border-b border-neutral-400 p-2 font-medium outline-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="flex justify-between">
                  <FormLabel htmlFor="schoolName">학교</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    id="schoolName"
                    placeholder="학교명을 검색 후 선택해주세요."
                    className="rounded-t-lg border-b border-neutral-400 p-2 font-medium outline-0"
                    {...field}
                    onFocus={() => setIsFocusSchoolInput(true)}
                    onChange={(e) => {
                      field.onChange(e);
                      form.setValue("ATPT_OFCDC_SC_CODE", "");
                      form.setValue("SD_SCHUL_CODE", "");
                    }}
                  />
                </FormControl>
                {schoolsData.length > 0 && isFocusSchoolInput && (
                  <ul className="absolute top-[60px] left-0 flex max-h-40 w-full flex-col gap-1 overflow-y-scroll rounded-b-lg border-r border-b border-l border-neutral-200 bg-white p-3 shadow-md">
                    {formattedSchoolList.map((school) => (
                      <li className="flex w-full" key={school.SD_SCHUL_CODE}>
                        <button
                          type="button"
                          onClick={() => onClickSchoolName(school)}
                          className="flex w-full rounded-lg px-1 py-0.5 text-neutral-900 hover:bg-neutral-200"
                        >
                          {school.formattedSchool}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel htmlFor="weight">체중(kg)</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    id="weight"
                    type="number"
                    className="w-20 rounded-t-lg border-b border-neutral-400 p-2 font-medium outline-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>성별</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-6"
                  >
                    <FormItem className="flex items-center">
                      <FormControl>
                        <RadioGroupItem value={Gender.Male} />
                      </FormControl>
                      <FormLabel className="font-normal">{GenderLabels[Gender.Male]}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center">
                      <FormControl>
                        <RadioGroupItem value={Gender.Female} />
                      </FormControl>
                      <FormLabel className="font-normal">{GenderLabels[Gender.Female]}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>목표</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-6"
                  >
                    <FormItem className="flex items-center">
                      <FormControl>
                        <RadioGroupItem value={Goal.BalancedDiet} />
                      </FormControl>
                      <FormLabel className="font-normal">{GoalLabels[Goal.BalancedDiet]}</FormLabel>
                    </FormItem>
                    {/* 체중 감량에 필요한 공식 추가 필요
                     <FormItem className="flex items-center">
                      <FormControl>
                        <RadioGroupItem value={Goal.WeightLoss} />
                      </FormControl>
                      <FormLabel className="font-normal">{GoalLabels[Goal.WeightLoss]}</FormLabel>
                    </FormItem> */}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center gap-2 text-sm">
            <Button type="submit" disabled={createProfileMutation.isPending}>
              {createProfileMutation.isPending ? "처리 중..." : "확인"}
            </Button>
            <Button
              type="button"
              variant={"cancel"}
              onClick={onClose}
              disabled={createProfileMutation.isPending}
            >
              취소
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
