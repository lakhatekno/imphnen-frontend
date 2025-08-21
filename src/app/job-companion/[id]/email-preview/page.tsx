'use client';

import { TabType, usePreviewStore } from '@/services/job-companion/email-preview/previewStore';
import { CoverLetterPreviewTab, CVPreviewTab } from '@/features/job-companion/components/PDFPreview';
import { CloudDownload } from 'lucide-react';

export default function EmailPreview() {
	const { activeTab, setActiveTab } = usePreviewStore();
	const tabs: TabType[] = ['CV', 'Cover Letter'];

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
        <button className='bg-[#0FDB00] px-4 py-2 rounded-lg text-xs font-medium flex gap-1 shrink-0 h-fit items-center justify-center'>
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
			</div>
		</section>
	);
}
