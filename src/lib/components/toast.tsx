'use client';

import { useToast } from '@/services/toast.store';
import { ToastProps } from '@/types/toast.type';
import { X } from 'lucide-react';

export default function Toast({ type, title, message }: ToastProps) {
	const leftBorder: string = getLeftBorderClass(type);
	const { closeToast } = useToast();

	return (
		<div className={`w-72 bg-white shadow-md shadow-slate-300 absolute border border-l-4 top-8 z-20 right-4 rounded-lg ${leftBorder}`}>
			<div className="relative p-4 w-full">
				<button
					onClick={closeToast}
					className="w-fit h-fit absolute top-2 right-2 cursor-pointer scale-75"
				>
					<X />
				</button>
				<p className="font-semibold text-sm line-clamp-1">{title}</p>
				<p className="text-xs line-clamp-3">{message}</p>
			</div>
		</div>
	);
}

function getLeftBorderClass(type: string): string {
	switch (type) {
		case 'error':
			return 'border-red-500';
		case 'news':
			return 'border-slate-400';
		case 'success':
			return 'border-[#0FDB00]';
		case 'warning':
			return 'border-amber-500';
		default:
			return 'border-slate-400';
	}
}
