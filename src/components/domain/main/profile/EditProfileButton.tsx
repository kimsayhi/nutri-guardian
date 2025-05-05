"use client";
import { Button } from "../../../ui/button";
import useModal from "@/hooks/useModal";
import Modal from "../../../shared/Modal";
import SettingProfile from "../../../modal-contents/settingProfile";
import useDefaultProfileQuery from "@/hooks/query/useDefaultProfileQuery";

export default function EditProfileButton() {
  const { isOpen, open, close } = useModal();
  const { data: defaultProfile } = useDefaultProfileQuery();
  const hasProfile = !!defaultProfile;
  return (
    <>
      <div className="flex items-center">
        <Button onClick={open} variant="outline">
          {hasProfile ? "프로필 수정" : "프로필 추가"}
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={close}>
        <SettingProfile onClose={close} />
      </Modal>
    </>
  );
}
