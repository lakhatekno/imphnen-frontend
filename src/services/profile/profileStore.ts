import { create } from 'zustand';
import type { SectionItem, ProfileStore } from '@/types/profile';
import { apiRequest } from '@/lib/api';

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
		workExperience: [
			{ id: Date.now(), type: 'WORK', status: 'INTERNSHIP', company: '', position: '', startDate: '', endDate: '', description: '' },
		],
		education: [{ id: Date.now(), institution: '', degree: '', field: '', startDate: '', endDate: '' }],
		skills: [{ id: Date.now(), name: '', level: 'BEGINNER' }],
	},

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
				[section]: state.formData[section].map((item: SectionItem) => (item.id === id ? { ...item, [name]: value } : item)),
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

	saveAndContinue: async () => {
		const { activeTab, tabs, formData } = get();

		try {
			switch (activeTab) {
				case 'Data Pribadi':
					await apiRequest('/user/personal', 'POST', {
						email: formData.email,
						phone: formData.phone,
						name: formData.fullName,
						address: formData.address || null,
						linkedin: formData.linkedin || null,
						portfolio: formData.portfolio || null,
					});
					break;
				case 'Pengalaman Kerja':
					console.log(formData.workExperience);
					if (formData.workExperience.length > 0) {
						await apiRequest(
							'/user/experience',
							'POST',
							formData.workExperience.map((exp) => ({
								title: exp.position,
								company: exp.company,
								type: exp.type,
								status: exp.status,
								startDate: new Date(exp.startDate).toISOString(),
								endDate: exp.endDate ? new Date(exp.endDate).toISOString() : null,
								description: exp.description || '',
							}))
						);
					}
					break;
				case 'Pendidikan':
					if (formData.education.length > 0) {
						await apiRequest(
							'/user/education',
							'POST',
							formData.education.map((edu) => ({
								institution: edu.institution,
								degree: edu.degree,
								fieldOfStudy: edu.field,
								startDate: new Date(edu.startDate).toISOString(),
								endDate: edu.endDate ? new Date(edu.endDate).toISOString() : null,
							}))
						);
					}
					break;
				case 'Keahlian':
					if (formData.skills.length > 0) {
						await apiRequest(
							'/user/skills',
							'POST',
							formData.skills.map((skill) => ({
								name: skill.name,
								level: skill.level,
							}))
						);
					}
					break;
			}

			const currentIndex = tabs.indexOf(activeTab);
			if (currentIndex < tabs.length - 1) {
				set({ activeTab: tabs[currentIndex + 1] });
				return { finished: false };
			} else {
				console.log('Proses onboarding selesai!');
				return { finished: true };
			}
		} catch (err) {
			console.error('Failed to save profile', err);
			throw err;
		}
	},

	saveAsDraft: async () => {
		const { formData } = get();
		console.log('Menyimpan draf...', formData);
		alert('Draf berhasil disimpan!');
	},
}));
