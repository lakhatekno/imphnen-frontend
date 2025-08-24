export type InsertJobResponse = {
  success: boolean;
  data: {
    id: string;
    [key: string]: unknown;
  };
};

export interface InsertJobDataReq {
  link: string;
  company: string;
  jobTitle: string;
  location: string | null;
  deadline: Date | null;
  description: string | null;
}

export interface JobData extends InsertJobDataReq {
  id: string;
  createdAt: string;
  userId: string;
}

export interface JobDataResponse {
  success: boolean;
  data: JobData[];
}

export interface RecruitmentState {
  jobData: InsertJobDataReq;
  isLoading: boolean;
  error: string | null;
  setField: (field: keyof InsertJobDataReq, value: unknown) => void;
  submitJob: () => Promise<string | undefined>;
  resetForm: () => void;
}

export interface DashboardState {
  jobData: JobData[];
  isLoading: boolean;
  getJobData: () => Promise<void>
}