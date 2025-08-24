'use client';

import { TabType, usePreviewStore } from '@/services/job-companion/email-preview/previewStore';
import { CoverLetterPreviewTab, CVPreviewTab, SummaryPreviewTab } from '@/features/job-companion/components/PDFPreview';
import { CloudDownload } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function EmailPreview() {
	const params = useParams()
	const { isLoading, activeTab, setActiveTab, generatedPreviews, sendJobpack, setJobId } = usePreviewStore();
	const tabs: TabType[] = ['CV', 'Cover Letter', 'Summary'];
	const isJobpackReady = tabs.every(tab => generatedPreviews.has(tab));

	const companionId = params.id as string;

	const handleSendJobpack = () => {
    if (companionId) {
      sendJobpack(companionId);
    } else {
      alert("ID not found to send jobpack.");
    }
  };

	useEffect(() => {
    if (companionId) {
      setJobId(companionId);
    }
  }, [companionId, setJobId]);

	return (
		<section className="flex flex-col shadow-lg shadow-slate-300 bg-white rounded-lg overflow-auto">
			{/* Header */}
			<div className="w-full flex justify-between items-center bg-accent text-white px-4 md:px-8 py-6 gap-2">
				{/* Text Header */}
				<div className='w-full flex flex-col gap-1'>
					<h2 className="text-2xl font-bold text-left">Preview</h2>
					<p>CV dan Cover Letter yang dioptimasi oleh AI</p>
				</div>

        {/* Send Button */}
        <button 
					onClick={handleSendJobpack}
          disabled={!isJobpackReady || isLoading}
					className='bg-[#0FDB00] hover:bg-green-500 px-4 py-2 rounded-lg text-xs font-medium flex gap-1 shrink-0 h-fit items-center justify-center disabled:bg-gray-400'>
          <CloudDownload />
          Simpan Jobpack
        </button>
			</div>

			{/* Tab */}
			<div className="px-8 border-b border-slate-200">
				<nav className="-mb-px flex space-x-6">
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`py-4 px-1 border-b-2 font-semibold text-sm transition-colors ${
								activeTab === tab
									? 'border-blue-500 text-blue-600'
									: 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
							}`}
						>
							{tab}
						</button>
					))}
				</nav>
			</div>

			{/* Tab Content */}
			<div className="flex-1 p-4 sm:p-6 bg-slate-50">
				{activeTab === 'CV' && <CVPreviewTab />}
				{activeTab === 'Cover Letter' && <CoverLetterPreviewTab />}
				{activeTab === 'Summary' && <SummaryPreviewTab />}
			</div>
		</section>
	);
}
