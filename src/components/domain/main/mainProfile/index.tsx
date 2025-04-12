"use client";
import SettingProfile from "@/components/modal-contents/settingProfile";
import Modal from "@/components/shared/Modal";
import useModal from "@/hooks/useModal";
import { IoSettingsSharp } from "react-icons/io5";

export default function MainProfile() {
  const { isOpen, open, close } = useModal();
  return (
    <>
      <div className="h-[310px]"></div>
      <div className="fixed top-[60px] flex w-full justify-center gap-2 px-4 py-10 shadow-sm md:top-[64px] lg:top-[68px]">
        <div className="flex h-[230px] w-1/2 flex-col rounded-xl bg-white p-3">
          <div className="flex w-full justify-center text-lg font-semibold">
            <span className="border-primary-900 flex w-1/2 items-center justify-center border-b-2 py-[3px]">
              중식
            </span>
            <span className="flex w-1/2 items-center justify-center border-b-2 border-neutral-500 py-[3px] text-neutral-500">
              석식
            </span>
          </div>
          <ul className="flex flex-col px-3 py-2.5 text-sm font-semibold">
            <li>흑미밥</li>
            <li>오징어국</li>
            <li>제육볶음</li>
            <li>고등어 순살 조림</li>
            <li>배추김치</li>
            <li>요구르트</li>
          </ul>
        </div>
        <div className="flex h-auto w-1/2 rounded-xl bg-white p-3">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-lg font-bold">경산고등학교</span>
                <span className="font-semibold">김세환 학생</span>
              </div>
              <div className="flex w-[120px] flex-col gap-2">
                <div className="flex w-full justify-between font-semibold">
                  <span>체중</span>
                  <span>75kg</span>
                </div>
                <div className="flex w-full justify-between font-semibold">
                  <span>목표</span>
                  <span>균형 식단</span>
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
      </div>
      <Modal isOpen={isOpen} onClose={close} showCloseButton={false}>
        <SettingProfile onClose={close} />
      </Modal>
    </>
  );
}
