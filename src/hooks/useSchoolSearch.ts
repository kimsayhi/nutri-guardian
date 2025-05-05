"use client";

import { useQuery } from "@tanstack/react-query";
import { searchSchoolByName } from "@/lib/api/school";
import { SchoolInfoData } from "@/types/api/school";
import useDebounce from "./useDebounce";

export default function useSchoolSearch(schoolName: string, debounceTime = 300) {
  //검색값 디바운스
  const debouncedSearchValue = useDebounce(schoolName, debounceTime);

  const { data, isLoading, error } = useQuery<SchoolInfoData[]>({
    queryKey: ["schoolSearch", debouncedSearchValue],
    queryFn: () => searchSchoolByName(debouncedSearchValue),
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}
