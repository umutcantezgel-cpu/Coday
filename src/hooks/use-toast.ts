import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  /** ARIA live region politeness — defaults based on type: 'assertive' for errors, 'polite' otherwise */
  ariaLive: 'polite' | 'assertive';
  /** ARIA role — defaults based on type: 'alert' for errors, 'status' otherwise */
  role: 'status' | 'alert';
}

/** Fields auto-computed by addToast — callers should not pass these */
type AutoFields = 'id' | 'ariaLive' | 'role';

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, AutoFields>) => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const isError = toast.type === 'error';
    const ariaLive = isError ? 'assertive' as const : 'polite' as const;
    const role = isError ? 'alert' as const : 'status' as const;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id, ariaLive, role }] }));

    if (toast.duration !== Infinity) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, toast.duration || 4000);
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

export const toast = (props: Omit<Toast, AutoFields>) => {
  useToast.getState().addToast(props);
};
