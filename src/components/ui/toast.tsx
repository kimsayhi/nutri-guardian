"use client";

import { Toast as ToastType, useToastStore } from "@/store/toastStore";
import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

// 토스트 타입별 스타일 및 아이콘 정의
const toastStyles = {
  info: {
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    borderColor: "border-blue-300",
    icon: FaInfoCircle,
  },
  success: {
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    borderColor: "border-green-300",
    icon: FaCheckCircle,
  },
  error: {
    bgColor: "bg-red-100",
    textColor: "text-red-800",
    borderColor: "border-red-300",
    icon: FaTimesCircle,
  },
};

function ToastItem({ toast }: { toast: ToastType }) {
  const removeToast = useToastStore((state) => state.removeToast);
  const style = toastStyles[toast.type];

  const handleClose = () => {
    removeToast(toast.id);
  };

  return (
    <motion.button
      onClick={handleClose}
      layout
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex items-center gap-2 rounded-lg border p-3 shadow-md transition-all duration-300",
        style.bgColor,
        style.textColor,
        style.borderColor
      )}
      role="alert"
    >
      <div className="flex-shrink-0">
        <style.icon className="h-5 w-5" />
      </div>
      <p className="flex-grow text-sm font-medium">{toast.message}</p>
      <div className="ml-auto flex-shrink-0 cursor-pointer rounded-full p-1 hover:bg-black/10">
        <IoClose className="h-4 w-4" />
      </div>
    </motion.button>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 p-4 md:top-auto md:right-4 md:bottom-4 md:left-auto">
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
