import { useToastStore, ToastType } from "@/store/toastStore";

export const toast = {
  info: (message: string, duration?: number) => {
    useToastStore.getState().addToast(message, "info", duration);
  },

  success: (message: string, duration?: number) => {
    useToastStore.getState().addToast(message, "success", duration);
  },

  error: (message: string, duration?: number) => {
    useToastStore.getState().addToast(message, "error", duration);
  },

  show: (message: string, type: ToastType = "info", duration?: number) => {
    useToastStore.getState().addToast(message, type, duration);
  },

  remove: (id: string) => {
    useToastStore.getState().removeToast(id);
  },

  clearAll: () => {
    useToastStore.getState().clearToasts();
  },
};
