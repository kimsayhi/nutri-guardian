"use client";

import Modal from "@/components/shared/Modal";
import AddProfile from "./AddProfile";
import DeleteConfirm from "./DeleteConfirm";
import useModal from "@/hooks/useModal";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import useProfilesQuery from "@/hooks/query/useProfilesQuery";
import { ProfileData } from "@/types/profile";
import { useState } from "react";
import { FaUser, FaTrash } from "react-icons/fa";
import useUpdateProfileMutation from "@/hooks/mutation/useUpdateProfileMutation";
import useDeleteProfileMutation from "@/hooks/mutation/useDeleteProfileMutation";
import { toast } from "@/utils/toast";

interface SettingProfileProps {
  onClose: () => void;
}

export default function SettingProfile({ onClose }: SettingProfileProps) {
  const { isOpen: isOpenAddProfile, open: addProfileOpen, close: addProfileClose } = useModal();
  const {
    isOpen: isOpenDeleteConfirm,
    open: openDeleteConfirm,
    close: closeDeleteConfirm,
  } = useModal();

  const { data: profiles, isLoading } = useProfilesQuery();
  const [error, setError] = useState<string | null>(null);
  const [profileToDelete, setProfileToDelete] = useState<ProfileData | null>(null);

  const updateProfileMutation = useUpdateProfileMutation();
  const deleteProfileMutation = useDeleteProfileMutation();

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

  const handleDeleteRequest = (profile: ProfileData) => {
    if (!profile.id) return;

    // 삭제할 프로필 정보 저장 후 모달 열기
    setProfileToDelete(profile);
    openDeleteConfirm();
  };

  const confirmDelete = () => {
    if (!profileToDelete?.id) return;

    deleteProfileMutation.mutate(profileToDelete.id, {
      onSuccess: () => {
        toast.success("프로필이 삭제되었습니다");
        closeDeleteConfirm();
        setProfileToDelete(null);
      },
      onError: (err) => {
        console.error("프로필 삭제 오류:", err);
        toast.error("프로필 삭제 중 오류가 발생했습니다");
        closeDeleteConfirm();
      },
    });
  };

  const cancelDelete = () => {
    closeDeleteConfirm();
    setProfileToDelete(null);
  };

  return (
    <div className={clsx(isOpenAddProfile && "hidden")}>
      <h2
        className={"text-neutral-1000 flex flex-col items-center justify-center p-2 font-extrabold"}
      >
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
              <li key={profile.id} className="relative">
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
                      <div className="text-neutral-1000 font-medium">{profile.name}</div>
                      <div className="text-sm text-gray-500">{profile.schoolName}</div>
                    </div>
                  </div>
                </button>

                {/* 삭제 버튼 - 모든 프로필에 표시 */}
                <button
                  onClick={() => handleDeleteRequest(profile)}
                  disabled={deleteProfileMutation.isPending}
                  className="absolute top-2 right-2 rounded-full p-1 text-red-500/50 hover:bg-red-100/50 hover:text-red-700/50"
                  title="프로필 삭제"
                >
                  <FaTrash size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center gap-2 text-sm">
        <Button
          onClick={addProfileOpen}
          disabled={updateProfileMutation.isPending || deleteProfileMutation.isPending}
        >
          새 프로필 추가
        </Button>
        <Button
          variant="cancel"
          onClick={onClose}
          disabled={updateProfileMutation.isPending || deleteProfileMutation.isPending}
        >
          취소
        </Button>
      </div>

      {/* 프로필 추가 모달 */}
      <Modal
        isOpen={isOpenAddProfile}
        onClose={addProfileClose}
        darkBackGround={false}
        closeOnOverlayClick={false}
        showCloseButton={false}
      >
        <AddProfile onClose={addProfileClose} />
      </Modal>

      {/* 프로필 삭제 확인 모달 */}
      <Modal
        isOpen={isOpenDeleteConfirm}
        onClose={cancelDelete}
        darkBackGround={true}
        closeOnOverlayClick={true}
        showCloseButton={true}
      >
        <DeleteConfirm
          profile={profileToDelete}
          isDeleting={deleteProfileMutation.isPending}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </Modal>
    </div>
  );
}
