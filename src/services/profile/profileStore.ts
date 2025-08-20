import { create } from 'zustand';
import type { FormData, SectionName, SectionItem } from '@/types/profile';

// Tipe untuk keseluruhan state dan actions di store
interface ProfileStore {
  activeTab: string;
  tabs: string[];
  formData: FormData;
  setActiveTab: (tab: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleArrayChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, section: SectionName, id: number) => void;
  addItem: (section: SectionName) => void;
  removeItem: (section: SectionName, id: number) => void;
  saveAndContinue: () => Promise<void>;
  saveAsDraft: () => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  activeTab: 'Data Pribadi',
  tabs: ['Data Pribadi', 'Pengalaman Kerja', 'Pendidikan', 'Keahlian'],
  formData: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    portfolio: '',
    workExperience: [{ id: Date.now(), type: 'Kerja', status: 'Magang', company: '', position: '', startDate: '', endDate: '', description: '' }],
    education: [{ id: Date.now(), institution: '', degree: '', field: '', startDate: '', endDate: '' }],
    skills: [{ id: Date.now(), name: '', level: 'Pemula' }],
  },

  // --- ACTIONS ---
  setActiveTab: (tab) => set({ activeTab: tab }),

  handleInputChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  handleArrayChange: (e, section, id) => {
    const { name, value } = e.target;
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: state.formData[section].map((item: SectionItem) =>
          item.id === id ? { ...item, [name]: value } : item
        ),
      },
    }));
  },

  addItem: (section) => {
    const newItem = { id: Date.now() };
    const sectionFields = {
      workExperience: { type: 'Kerja', status: 'Magang', company: '', position: '', startDate: '', endDate: '', description: '' },
      education: { institution: '', degree: '', field: '', startDate: '', endDate: '' },
      skills: { name: '', level: 'Pemula' },
    };
    Object.assign(newItem, sectionFields[section]);
    set((state) => ({
      formData: { ...state.formData, [section]: [...state.formData[section], newItem] },
    }));
  },

  removeItem: (section, id) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: state.formData[section].filter((item: SectionItem) => item.id !== id),
      },
    }));
  },

  // --- API & NAVIGATION ACTIONS ---
  saveAndContinue: async () => {
    const { activeTab, tabs, formData } = get();
    console.log("Menyimpan data ke database...", formData);
    // Logika API...
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      set({ activeTab: tabs[currentIndex + 1] });
    } else {
      console.log("Proses onboarding selesai!");
    }
  },

  saveAsDraft: async () => {
    const { formData } = get();
    console.log("Menyimpan draf...", formData);
    alert("Draf berhasil disimpan!");
  }
}));