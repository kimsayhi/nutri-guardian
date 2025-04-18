"use client";

import Modal from "@/components/shared/Modal";
import AddProfile from "./AddProfile";
import useModal from "@/hooks/useModal";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import useProfilesQuery from "@/hooks/query/useProfilesQuery";
import { ProfileData } from "@/types/profile";
import { useState } from "react";
import { FaCheck, FaUser } from "react-icons/fa";
import useUpdateProfileMutation from "@/hooks/mutation/useUpdateProfileMutation";

interface SettingProfileProps {
  onClose: () => void;
}

export default function SettingProfile({ onClose }: SettingProfileProps) {
  const { isOpen: isOpenAddProfile, open: addProfileOpen, close: addProfileClose } = useModal();
  const { data: profiles, isLoading } = useProfilesQuery();
  const [error, setError] = useState<string | null>(null);

  // updateProfile을 위한 mutation 훅 사용
  const updateProfileMutation = useUpdateProfileMutation();

  const handleSetDefaultProfile = async (profile: ProfileData) => {
    if (profile.isDefault) return;
    if (!profile.id) return;

    setError(null);

    updateProfileMutation.mutate(
      {
        id: profile.id,
        isDefault: true,
      },
      {
        onError: (err) => {
          console.error("프로필 업데이트 오류:", err);
          setError(err instanceof Error ? err.message : "프로필 설정 중 오류가 발생했습니다.");
        },
      }
    );
  };

  return (
    <div className={clsx(isOpenAddProfile && "hidden")}>
      <h2 className={"flex flex-col items-center justify-center p-2 font-extrabold"}>
        <p>프로필을 선택하거나</p>
        <p>새로운 프로필을 등록하세요</p>
      </h2>

      {error && <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-500">{error}</div>}

      <div className="mb-4 max-h-60 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">프로필 불러오는 중...</div>
        ) : !profiles?.length ? (
          <div className="p-4 text-center text-gray-500">등록된 프로필이 없습니다.</div>
        ) : (
          <ul className="flex flex-col gap-2">
            {profiles.map((profile) => (
              <li key={profile.id}>
                <button
                  onClick={() => handleSetDefaultProfile(profile)}
                  disabled={updateProfileMutation.isPending || profile.isDefault}
                  className={clsx(
                    "flex w-full items-center justify-between rounded-lg border p-3 transition",
                    profile.isDefault
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50 hover:bg-primary/5 border-gray-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <FaUser />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{profile.name}</div>
                      <div className="text-sm text-gray-500">{profile.schoolName}</div>
                    </div>
                  </div>
                  {profile.isDefault && (
                    <div className="bg-primary rounded-full p-1 text-white">
                      <FaCheck size={12} />
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center gap-2 text-sm">
        <Button onClick={addProfileOpen} disabled={updateProfileMutation.isPending}>
          새 프로필 추가
        </Button>
        <Button variant={"outline"} onClick={onClose} disabled={updateProfileMutation.isPending}>
          취소
        </Button>
      </div>
      <Modal
        isOpen={isOpenAddProfile}
        onClose={addProfileClose}
        darkBackGround={false}
        closeOnOverlayClick={false}
        showCloseButton={false}
      >
        <AddProfile onClose={addProfileClose} />
      </Modal>
    </div>
  );
}
