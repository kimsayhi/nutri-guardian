"use client";
import { Button } from "../../../ui/button";
import useModal from "@/hooks/useModal";
import Modal from "../../../shared/Modal";
import SettingProfile from "../../../modal-contents/settingProfile";

export default function EditProfileButton() {
  const { isOpen, open, close } = useModal();
  return (
    <>
      <div className="flex items-center">
        <Button onClick={open} variant="outline">
          프로필 수정
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={close}>
        <SettingProfile onClose={close} />
      </Modal>
    </>
  );
}
