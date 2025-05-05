import { deleteProfile } from "@/actions/profile";
import { QUERY_KEY } from "@/constants/queryKey";
import { ProfileData } from "@/types/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: string) => deleteProfile(profileId),

    onMutate: async (profileId) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY.PROFILES });
      const previousProfiles = queryClient.getQueryData<ProfileData[]>(QUERY_KEY.PROFILES);

      queryClient.setQueryData<ProfileData[]>(QUERY_KEY.PROFILES, (old) => {
        if (!old) return [];

        // 삭제할 프로필 정보 보관
        const profileToDelete = old.find((profile) => profile.id === profileId);

        // 삭제 대상 프로필 제외
        const updatedProfiles = old.filter((profile) => profile.id !== profileId);

        // 삭제하는 프로필이 기본 프로필이었다면 남아있는 첫 번째 프로필을 기본 프로필로 설정
        if (profileToDelete?.isDefault && updatedProfiles.length > 0) {
          updatedProfiles[0] = {
            ...updatedProfiles[0],
            isDefault: true,
          };
        }

        return updatedProfiles;
      });

      // 기본 프로필 쿼리 업데이트
      const deletedProfile = previousProfiles?.find((profile) => profile.id === profileId);
      if (deletedProfile?.isDefault) {
        const remainingProfiles =
          previousProfiles?.filter((profile) => profile.id !== profileId) || [];
        if (remainingProfiles.length > 0) {
          queryClient.setQueryData(QUERY_KEY.DEFAULT_PROFILE, {
            ...remainingProfiles[0],
            isDefault: true,
          });
        } else {
          queryClient.setQueryData(QUERY_KEY.DEFAULT_PROFILE, null);
        }
      }

      return { previousProfiles };
    },

    onError: (err, profileId, context) => {
      if (context?.previousProfiles) {
        queryClient.setQueryData(QUERY_KEY.PROFILES, context.previousProfiles);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.PROFILES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.DEFAULT_PROFILE });
    },
  });
}
