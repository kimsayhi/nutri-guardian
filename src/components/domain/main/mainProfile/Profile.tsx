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
      <div className="flex w-full rounded-xl bg-white p-3">
        <div className="flex w-full justify-between">
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold">{defaultProfile.schoolName}</span>
              <span className="font-semibold">{defaultProfile.name} 학생</span>
            </div>
            <div className="bg-primary-50 flex w-[80%] flex-col justify-center gap-2 rounded-lg px-3 py-3 md:w-1/2">
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
