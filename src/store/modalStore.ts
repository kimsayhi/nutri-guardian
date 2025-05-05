import { create } from "zustand";

interface ModalState {
  activeModals: number;
  openModal: () => void;
  closeModal: () => void;
}

/**
 * 모달 상태 관리 스토어
 *
 * 여러 모달이 동시에 열릴 때 스크롤 잠금을 관리합니다.
 * 마지막 모달이 닫힐 때만 스크롤을 복원합니다.
 */
const useModalStore = create<ModalState>((set, get) => ({
  activeModals: 0,

  openModal: () => {
    const { activeModals } = get();

    if (activeModals === 0) {
      document.body.style.overflow = "hidden";
    }

    set({ activeModals: activeModals + 1 });
  },

  closeModal: () => {
    const { activeModals } = get();

    if (activeModals <= 0) return;

    const newCount = activeModals - 1;

    if (newCount === 0) {
      document.body.style.overflow = "auto";
    }

    set({ activeModals: newCount });
  },
}));

export default useModalStore;
