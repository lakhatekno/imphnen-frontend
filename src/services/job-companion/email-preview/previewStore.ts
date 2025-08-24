import { apiRequest } from '@/lib/api';
import { create } from 'zustand';

export type TabType = 'CV' | 'Cover Letter' | 'Summary';

interface PreviewStore {
	activeTab: TabType;
	setActiveTab: (tab: TabType) => void;
	previewUrl: string | null;
	isLoading: boolean;
	error: string | null;
	jobId: string;
	// State baru untuk melacak pratinjau yang sudah di-generate
	generatedPreviews: Set<TabType>;
	summaryText: string | null;
	fetchPreview: (type: 'cv' | 'cover-letter' | 'summary', id: string) => Promise<void>;
	setJobId: (id: string) => void;
	sendJobpack: (id: string) => Promise<void>;
}

// Helper untuk memetakan tipe API ke tipe Tab
const mapApiTypeToTabType = (type: 'cv' | 'cover-letter' | 'summary'): TabType => {
	if (type === 'cv') return 'CV';
	if (type === 'cover-letter') return 'Cover Letter';
	return 'Summary';
};

export const usePreviewStore = create<PreviewStore>((set, get) => ({
	activeTab: 'CV',
	previewUrl: null,
	isLoading: false,
	error: null,
	jobId: '',
	generatedPreviews: new Set(),
	summaryText: '',

	setActiveTab: (tab) => set({ activeTab: tab, previewUrl: null, error: null }),

	setJobId: (id) => set({ jobId: id }),

	fetchPreview: async (type, id) => {
		set({ isLoading: true, error: null, previewUrl: null });
		try {
			// Menggunakan apiRequest untuk mengambil file sebagai Blob
			const endpoint = `/doc/${id}?result=${type}`;

			if (type === 'summary') {
				// Ambil JSON untuk summary
				const res = await apiRequest<{ success: boolean; data: { summary: string } }>(endpoint);
				set((state) => ({
					summaryText: res.data.summary,
					isLoading: false,
					generatedPreviews: new Set(state.generatedPreviews).add(mapApiTypeToTabType(type)),
				}));
			} else {
				const pdfBlob = await apiRequest<Blob>(endpoint, 'GET', undefined, 'blob');

				const url = URL.createObjectURL(pdfBlob);

				// Menambahkan tab yang berhasil di-generate ke dalam Set
				set((state) => ({
					previewUrl: url,
					isLoading: false,
					generatedPreviews: new Set(state.generatedPreviews).add(mapApiTypeToTabType(type)),
				}));
			}
		} catch (err) {
			console.error('Failed to fetch preview:', err);
			set({ error: `Gagal memuat pratinjau`, isLoading: false });
		}
	},

	sendJobpack: async (id: string) => {
		set({ isLoading: true });
		try {
			// Memanggil endpoint jobpack dengan ID yang sesuai
			await apiRequest(`/jobpack/${id}`, 'GET');
			alert('Jobpack berhasil dikirim!');
		} catch (err) {
			console.error('Error sending jobpack', err);
			alert('Gagal mengirim jobpack.');
		} finally {
			set({ isLoading: false });
		}
	},
}));
