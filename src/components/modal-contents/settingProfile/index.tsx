"use client";

import Modal from "@/components/shared/Modal";
import AddProfile from "./AddProfile";
import useModal from "@/hooks/useModal";
import clsx from "clsx";

interface SettingProfileProps {
  onClose: () => void;
}

export default function SettingProfile({ onClose }: SettingProfileProps) {
  const { isOpen: isOpenAddProfile, open: addProfileOpen, close: addProfileClose } = useModal();
  return (
    <div className={clsx(isOpenAddProfile && "hidden")}>
      <h2 className={"flex flex-col items-center justify-center p-2 font-extrabold"}>
        <p>프로필을 선택하거나</p>
        <p>새로운 프로필을 등록하세요</p>
      </h2>
      <div className="flex h-30 flex-col">프로필1</div>
      <div className="flex justify-center gap-2 text-sm">
        <button
          onClick={addProfileOpen}
          className="bg-primary flex w-full items-center justify-center rounded-lg py-2 text-white"
        >
          새 프로필 추가
        </button>
        <button
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-lg bg-neutral-600 text-white"
        >
          취소
        </button>
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
