import { getDefaultProfile } from "@/actions/profile";
import { QUERY_KEY } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export default function useDefaultProfileQuery() {
  const {
    data: defaultProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY.DEFAULT_PROFILE],
    queryFn: getDefaultProfile,
  });

  return { defaultProfile, isLoading, isError };
}
