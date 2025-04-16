import { getProfiles } from "@/actions/profile";
import { QUERY_KEY } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export default function useProfilesQuery() {
  const {
    data: profiles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY.PROFILES],
    queryFn: getProfiles,
  });

  return { profiles, isLoading, isError };
}
