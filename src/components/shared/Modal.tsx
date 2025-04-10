"use client";

import { useEffect, useCallback, ReactNode } from "react";
import Portal from "./Portal";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import useModalStore from "@/store/modalStore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  closeOnOverlayClick?: boolean;
  className?: string;
  showCloseButton?: boolean;
  darkBackGround?: boolean;
}

/**
 * 모달 컴포넌트
 *
 * Portal을 사용하여 DOM의 다른 부분에 모달을 렌더링하는 컴포넌트
 * Zustand를 사용하여 중첩 모달의 스크롤 잠금 문제를 해결합니다.
 *
 * @param isOpen 모달 표시 여부
 * @param onClose 모달 닫기 함수
 * @param children 모달 내용
 * @param title 모달 제목 (옵션)
 * @param closeOnOverlayClick 오버레이 클릭 시 모달 닫기 여부 (기본값: true)
 * @param className 추가 CSS 클래스
 * @param showCloseButton 닫기 버튼 표시 여부 (기본값: true)
 * @param darkBackGround 배경을 어둡게 표시할지 여부 (기본값: true)
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOverlayClick = true,
  className = "",
  showCloseButton = true,
  darkBackGround = true,
}: ModalProps) => {
  const { openModal, closeModal } = useModalStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      openModal();
    }

    return () => {
      if (isOpen) {
        closeModal();
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown, openModal, closeModal]);

  if (!isOpen) return null;

  return (
    <Portal containerId="modal-root">
      <div
        className={clsx(
          "fixed inset-0 z-50 flex items-center justify-center",
          darkBackGround && "bg-black/50"
        )}
        onClick={handleOverlayClick}
      >
        <div
          className={`relative max-h-[90vh] w-[90%] max-w-lg overflow-auto rounded-lg bg-white p-3 shadow-xl ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          {(title || showCloseButton) && (
            <div className="mb-4 flex items-center justify-between">
              {title && (
                <h2 id="modal-title" className="text-xl font-semibold">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  onClick={onClose}
                  aria-label="닫기"
                >
                  <IoMdClose />
                </button>
              )}
            </div>
          )}

          {/* 모달 내용 */}
          <div>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
