export interface ToastProps {
  type: 'warning' | 'success' | 'error' | 'news';
  title: string;
  message: string;
}

export interface Toast extends ToastProps {
  openToast: boolean;
  setOpenToast: (props: ToastProps) => void;
  closeToast: () => void;
}