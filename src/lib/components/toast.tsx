export interface ToastProps {
  type: 'warning' | 'success' | 'error' | 'news';
  title: string;
  message: string;
}

export default function Toast({
  type, title, message
}: ToastProps) {
  return (
    <div className={`w-64 bg-white shadow-md shadow-slate-600 absolute bottom-4 right-2`}>
      <p className="font-bold">{title}</p>
      <p>{message}</p>
      <p>{type}</p>
    </div>
  )
}