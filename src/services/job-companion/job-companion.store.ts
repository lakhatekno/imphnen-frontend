import { create } from 'zustand';
import { RecruitmentState, InsertJobDataReq, InsertJobResponse, JobData, DashboardState, JobDataResponse } from '@/types/job.type';
import { apiRequest } from '@/lib/api';

const initialState: InsertJobDataReq = {
	link: '',
	company: '',
	jobTitle: '',
	location: null,
	deadline: null,
	description: null,
};

const initialDashboard: JobData[] = [];

export const useRecruitmentStore = create<RecruitmentState>((set, get) => ({
	jobData: initialState,
	isLoading: false,
	error: null,

	setField: (field, value) => {
		set((state) => ({
			jobData: {
				...state.jobData,
				[field]: value,
			},
		}));
	},

	submitJob: async () => {
		set({ isLoading: true, error: null });
		try {
			const jobData = get().jobData;
			const payload: InsertJobDataReq = {
				...jobData,
			};
			const res = await apiRequest('/job', 'POST', payload);
			const typedRes = res as InsertJobResponse;

			set({ isLoading: false });
			get().resetForm();

			console.log('Result Insert Job', typedRes.data.id);
			return typedRes.data.id;
		} catch (error) {
			set({ isLoading: false, error: 'An unknown error occurred.' });
			console.error('Failed to submit job:', error);
		}
	},

	resetForm: () => {
		set({ jobData: initialState, error: null });
	},
}));

export const useJobCompanionStore = create<DashboardState>((set, get) => ({
	isLoading: false,
	jobData: initialDashboard,

	getJobData: async () => {
		set({ isLoading: true, jobData: [] });
		try {
			const res = await apiRequest('/job', 'GET');
			const typedRes = res as JobDataResponse;

			console.log('Fetched jobData', typedRes.data);
			set({ jobData: typedRes.data });
		} catch (err) {
			console.error('Error fetching Job Data', err);
		} finally {
			set({ isLoading: false });
		}
	},
}));
