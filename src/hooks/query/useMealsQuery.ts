import { getMeals } from "@/actions/meal";
import { QUERY_KEY } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export default function useMealsQuery(profileId?: string) {
  const {
    data: meals,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY.MEALS, profileId],
    queryFn: () => (profileId ? getMeals(profileId) : Promise.resolve([])),
    enabled: !!profileId,
  });

  return { meals, isLoading, isError };
}
