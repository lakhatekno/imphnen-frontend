import { create } from 'zustand';

export type TabType = 'CV' | 'Cover Letter';

interface PreviewStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  previewUrl: string | null;
  isLoading: boolean;
  error: string | null;
  fetchPreview: (type: 'cv' | 'coverLetter', userData: {id: string}) => Promise<void>;
}

// --- MOCK API FUNCTION ---
// Ganti ini dengan fetch call ke endpoint BE Anda yang sebenarnya.
const mockApiFetchPdf = async (type: 'cv' | 'coverLetter', userData: {id: string}): Promise<Blob> => {
  console.log(`API: Generating ${type} preview for`, userData);
  // Simulasikan network delay
  await new Promise(res => setTimeout(res, 1000));
  
  // Di aplikasi nyata, backend akan mengembalikan data PDF.
  // Kita akan simulasikan ini dengan mengembalikan Blob kosong.
  // Ini menghilangkan kebutuhan akan library eksternal di frontend untuk mocking.
  const placeholderText = `Ini adalah placeholder untuk ${type.toUpperCase()}`;
  return new Blob([placeholderText], { type: 'application/pdf' });
};


export const usePreviewStore = create<PreviewStore>((set) => ({
  activeTab: 'CV',
  previewUrl: null,
  isLoading: false,
  error: null,
  
  setActiveTab: (tab) => set({ activeTab: tab, previewUrl: null, error: null }), // Reset URL saat ganti tab

  fetchPreview: async (type, userData) => {
    set({ isLoading: true, error: null, previewUrl: null });
    try {
      const pdfBlob = await mockApiFetchPdf(type, userData);
      const url = URL.createObjectURL(pdfBlob);
      set({ previewUrl: url, isLoading: false });
    } catch (err) {
      console.error("Failed to fetch preview:", err);
      set({ error: `Gagal memuat preview ${type}.`, isLoading: false });
    }
  },
}));