"use client";

import SettingProfile from "@/components/modal-contents/settingProfile";
import Modal from "@/components/shared/Modal";
import useModal from "@/hooks/useModal";
import { GenderLabels, GoalLabels } from "@/constants/profileLabels";
import { ProfileData } from "@/types/profile";
import { IoSettingsSharp } from "react-icons/io5";

interface ProfileProps {
  defaultProfile: ProfileData;
}

export default function Profile({ defaultProfile }: ProfileProps) {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <div className="flex h-auto w-1/2 rounded-xl bg-white p-3">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold">{defaultProfile.schoolName}</span>
              <span className="font-semibold">{defaultProfile.name} 학생</span>
            </div>
            <div className="flex w-[120px] flex-col gap-2">
              <div className="flex w-full justify-between font-semibold">
                <span>체중</span>
                <span>{defaultProfile.weight}kg</span>
              </div>
              <div className="flex w-full justify-between font-semibold">
                <span>성별</span>
                <span>{GenderLabels[defaultProfile.gender]}</span>
              </div>
              <div className="flex w-full justify-between font-semibold">
                <span>목표</span>
                <span>{GoalLabels[defaultProfile.goal]}</span>
              </div>
            </div>
          </div>
          <div>
            <button onClick={open}>
              <IoSettingsSharp className="text-neutral-700" />
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={close} showCloseButton={false}>
        <SettingProfile onClose={close} />
      </Modal>
    </>
  );
}
