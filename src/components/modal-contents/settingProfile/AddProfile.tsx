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
import { SupabaseClient } from "@supabase/supabase-js";

// Zod 스키마 정의
const profileSchema = z
  .object({
    studentName: z.string().min(1, "학생 이름은 필수입니다."),
    schoolName: z.string().min(1, "학교는 필수입니다."),
    ATPT_OFCDC_SC_CODE: z.string(),
    SD_SCHUL_CODE: z.string(),
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

interface AddProfileProps {
  onClose: () => void;
}

export default function AddProfile({ onClose }: AddProfileProps) {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      studentName: "",
      schoolName: "",
      ATPT_OFCDC_SC_CODE: "",
      SD_SCHUL_CODE: "",
    },
  });
  const schoolSearchValue = form.watch("schoolName");
  const { data: schoolsData } = useSchoolSearch(schoolSearchValue);
  const [isFocusSchoolInput, setIsFocusSchoolInput] = useState(false);
  const formattedSchoolList = formatSchoolList(schoolsData);

  // 폼 제출 핸들러
  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    console.log("제출된 데이터:", data);

    onClose();
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between gap-5 pt-5"
        >
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel htmlFor="studentName">학생 이름</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    id="studentName"
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
                          className="flex w-full rounded-lg px-1 py-0.5 hover:bg-neutral-200"
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

          <div className="mt-4 flex justify-center gap-2 pt-50 text-sm">
            <Button type="submit">확인</Button>
            <Button type="button" variant={"outline"} onClick={onClose}>
              취소
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
