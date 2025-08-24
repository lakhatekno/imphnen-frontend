import { Toast } from '@/types/toast.type';
import { create } from 'zustand';

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
