import { useEffect } from 'react';
import { usePreviewStore } from '@/services/job-companion/email-preview/previewStore';

import { Loader2, AlertTriangle } from 'lucide-react';

const mockUserData = { id: '1' }; 

export function CVPreviewTab() {
  const { previewUrl, isLoading, error, fetchPreview, activeTab } = usePreviewStore();

  useEffect(() => {
    // Fetch preview hanya jika tab ini aktif
    if (activeTab === 'CV') {
        fetchPreview('cv', mockUserData);
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [activeTab, fetchPreview, previewUrl]); 

  return <PreviewPane url={previewUrl} isLoading={isLoading} error={error} />;
}

export function CoverLetterPreviewTab() {
  const { previewUrl, isLoading, error, fetchPreview, activeTab } = usePreviewStore();

  useEffect(() => {
    if (activeTab === 'Cover Letter') {
        fetchPreview('coverLetter', mockUserData);
    }
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [activeTab, fetchPreview, previewUrl]);

  return <PreviewPane url={previewUrl} isLoading={isLoading} error={error} />;
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