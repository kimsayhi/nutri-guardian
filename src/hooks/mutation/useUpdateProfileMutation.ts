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
          }
        }
      }
      return { previousProfiles };
    },

    onError: (err, newProfileData, context) => {
      if (context?.previousProfiles) {
        queryClient.setQueryData([QUERY_KEY.PROFILES], context.previousProfiles);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROFILES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DEFAULT_PROFILE] });
    },
  });
}
