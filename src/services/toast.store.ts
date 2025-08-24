import { create } from 'zustand';
import type { ToastProps } from '@/lib/components/toast';

interface Toast extends ToastProps {
  openToast: boolean;
  setOpenToast: (props: ToastProps) => void;
  closeToast: () => void;
}

export const useToast = create<Toast>((set) => ({
  type: 'news',
  title: '',
  message: '',
  openToast: false,

  setOpenToast: (props) =>
    set({
      ...props,
      openToast: true,
    }),

  closeToast: () =>
    set({
      openToast: false,
    }),
}));
