import { updateProfile } from "@/actions/profile";
import { QUERY_KEY } from "@/constants/queryKey";
import { ProfileData, UpdateProfileData } from "@/types/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: UpdateProfileData) => updateProfile(profileData),

    onMutate: async (newProfileData) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY.PROFILES });
      const previousProfiles = queryClient.getQueryData<ProfileData[]>(QUERY_KEY.PROFILES);

      if (previousProfiles && newProfileData.isDefault) {
        queryClient.setQueryData<ProfileData[]>(QUERY_KEY.PROFILES, (old) => {
          if (!old) return [];

          return old.map((profile) => {
            if (profile.id === newProfileData.id) {
              return { ...profile, isDefault: true };
            }
            return { ...profile, isDefault: false };
          });
        });

        if (newProfileData.id) {
          const updatedProfile = previousProfiles.find((p) => p.id === newProfileData.id);
          if (updatedProfile) {
            queryClient.setQueryData(QUERY_KEY.DEFAULT_PROFILE, {
              ...updatedProfile,
              isDefault: true,
            });

            // 기존 DAILY_MEAL 쿼리 무효화하여 새 프로필의 급식 정보를 가져올 준비
            const oldDefaultProfile = previousProfiles.find((p) => p.isDefault);
            if (oldDefaultProfile?.id) {
              queryClient.removeQueries({ queryKey: QUERY_KEY.DAILY_MEAL(oldDefaultProfile.id) });
            }
          }
        }
      }
      return { previousProfiles };
    },

    onError: (err, newProfileData, context) => {
      if (context?.previousProfiles) {
        queryClient.setQueryData(QUERY_KEY.PROFILES, context.previousProfiles);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.PROFILES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.DEFAULT_PROFILE });

      // 변경된 프로필의 모든 급식 정보 쿼리 무효화
      // (특정 ID를 알 수 없어 전체 급식 데이터 관련 쿼리 무효화)
      const profiles = queryClient.getQueryData<ProfileData[]>(QUERY_KEY.PROFILES);
      if (profiles) {
        profiles.forEach((profile) => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY.DAILY_MEAL(profile.id) });
        });
      }
    },
  });
}
