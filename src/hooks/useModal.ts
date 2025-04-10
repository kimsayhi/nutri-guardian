"use client";

import { useState, useCallback } from "react";

/**
 * 모달 상태를 관리하기 위한 커스텀 훅
 *
 * @returns 모달 상태와 모달을 열고 닫는 함수
 */
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useModal;
