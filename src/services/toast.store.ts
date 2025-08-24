import { Toast } from '@/types/toast.type';
import { create } from 'zustand';

export const useToast = create<Toast>((set) => ({
  type: 'success',
  title: 'Title',
  message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt sit dignissimos consectetur.',
  openToast: true,

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
