import { createProfile } from "@/actions/profile";
import { QUERY_KEY } from "@/constants/queryKey";
import { CreateProfileData, ProfileData } from "@/types/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: CreateProfileData) => createProfile(profileData),

    onMutate: async (newProfileData) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.PROFILES] });

      const previousProfiles = queryClient.getQueryData<ProfileData[]>([QUERY_KEY.PROFILES]);

      queryClient.setQueryData<ProfileData[]>([QUERY_KEY.PROFILES], (old) => {
        // 새 프로필용 임시 ID 생성
        const tempId = `temp-${Date.now()}`;

        // 첫 프로필이거나 isDefault가 true인 경우
        const isDefault = !old?.length || newProfileData.isDefault;

        // 새 프로필 객체 생성
        const newProfile: ProfileData = {
          id: tempId,
          userId: "temp-user-id",
          name: newProfileData.name,
          schoolName: newProfileData.schoolName,
          ATPT_OFCDC_SC_CODE: newProfileData.ATPT_OFCDC_SC_CODE,
          SD_SCHUL_CODE: newProfileData.SD_SCHUL_CODE,
          weight: newProfileData.weight,
          goal: newProfileData.goal,
          gender: newProfileData.gender,
          isDefault: isDefault ? true : false,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // 새 프로필이 기본 프로필이면 기존 프로필들의 isDefault를 false로 설정
        if (isDefault && old) {
          old = old.map((profile) => ({
            ...profile,
            isDefault: false,
          }));
        }

        return old ? [...old, newProfile] : [newProfile];
      });

      // 새 프로필이 기본 프로필이면 DEFAULT_PROFILE 쿼리도 업데이트
      if (newProfileData.isDefault || !previousProfiles?.length) {
        const tempId = `temp-${Date.now()}`;

        const newDefaultProfile: ProfileData = {
          id: tempId,
          userId: "temp-user-id",
          name: newProfileData.name,
          schoolName: newProfileData.schoolName,
          ATPT_OFCDC_SC_CODE: newProfileData.ATPT_OFCDC_SC_CODE,
          SD_SCHUL_CODE: newProfileData.SD_SCHUL_CODE,
          weight: newProfileData.weight,
          goal: newProfileData.goal,
          gender: newProfileData.gender,
          isDefault: true,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        queryClient.setQueryData([QUERY_KEY.DEFAULT_PROFILE], newDefaultProfile);
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
