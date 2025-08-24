import { useEffect } from 'react';
import { usePreviewStore } from '@/services/job-companion/email-preview/previewStore';

import { Loader2, AlertTriangle } from 'lucide-react';

export function CVPreviewTab() {
	const { previewUrl, isLoading, error, fetchPreview, activeTab, jobId } = usePreviewStore();

	useEffect(() => {
		if (activeTab === 'CV') {
			fetchPreview('cv', jobId);
		}

		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [activeTab, fetchPreview, jobId]);

	return (
		<PreviewPane
			url={previewUrl}
			isLoading={isLoading}
			error={error}
		/>
	);
}

export function CoverLetterPreviewTab() {
	const { previewUrl, isLoading, error, fetchPreview, activeTab, jobId } = usePreviewStore();

	useEffect(() => {
		if (activeTab === 'Cover Letter') {
			fetchPreview('cover-letter', jobId);
		}
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [activeTab, fetchPreview, jobId]);

	return (
		<PreviewPane
			url={previewUrl}
			isLoading={isLoading}
			error={error}
		/>
	);
}

export function SummaryPreviewTab() {
	const { previewUrl, isLoading, error, fetchPreview, activeTab, jobId, summaryText } = usePreviewStore();

	useEffect(() => {
		if (activeTab === 'Summary') {
			fetchPreview('summary', jobId);
		}
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [activeTab, fetchPreview, jobId]);

	if (isLoading) return <div className="p-4">Loading summary...</div>;
	if (error) return <div className="p-4 text-red-500">{error}</div>;

	return (
		<div className="p-4">
			{summaryText ? <p className="whitespace-pre-line text-sm font-sans">{summaryText}</p> : <p className="text-gray-500 italic">No summary available.</p>}
		</div>
	);
}

interface PreviewPaneProps {
	url: string | null;
	isLoading: boolean;
	error: string | null;
}

function PreviewPane({ url, isLoading, error }: PreviewPaneProps) {
	if (isLoading) {
		return (
			<div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
				<Loader2 className="animate-spin h-8 w-8 mb-4" />
				<p className="font-semibold">Memuat Preview...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-full h-full flex flex-col items-center justify-center text-red-600 bg-red-50 rounded-lg">
				<AlertTriangle className="h-8 w-8 mb-4" />
				<p className="font-semibold">{error}</p>
			</div>
		);
	}

	if (url) {
		return (
			<iframe
				src={url}
				title="PDF Preview"
				className="w-full h-full border-none rounded-md"
				style={{ minHeight: '70vh' }}
			/>
		);
	}

	return null;
}
