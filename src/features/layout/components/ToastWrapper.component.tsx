'use client';

import Toast from '@/lib/components/toast';
import { useToast } from '@/services/toast.store';

export default function ToastWrapper() {
	const { type, title, message, openToast } = useToast();

	return (
		<>
			{openToast && (
				<Toast
					type={type}
					title={title}
					message={message}
				/>
			)}
		</>
	);
}
