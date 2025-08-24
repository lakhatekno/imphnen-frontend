export interface WorkExperience {
  id: number;
  type: 'WORK' | 'ORGANIZATION' | 'VOLUNTEER' | 'EVENT';
  status: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT' | 'HONORARY' | 'OUTSOURCED';
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: number;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT' | 'SPECIALIST';
}

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  portfolio: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
}

export interface ProfileStore {
  activeTab: string;
  tabs: string[];
  formData: FormData;
  setActiveTab: (tab: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleArrayChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, section: SectionName, id: number) => void;
  addItem: (section: SectionName) => void;
  removeItem: (section: SectionName, id: number) => void;
  saveAndContinue: () => Promise<{ finished: boolean }>;
  saveAsDraft: () => Promise<void>;
}

export type SectionName = 'workExperience' | 'education' | 'skills';
export type SectionItem = WorkExperience | Education | Skill;

export interface InputFieldProps {
	label: string;
	name: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	placeholder?: string;
	required?: boolean;
	className?: string;
}

export interface TextareaFieldProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
	className?: string;
}

export interface DynamicSectionProps<T extends { id: number }> {
	sectionName: SectionName;
	title: string;
	items: T[];
	onAdd: () => void;
	onRemove: (section: SectionName, id: number) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, section: SectionName, id: number) => void;
	renderItem: (item: T, onChange: DynamicSectionProps<T>['onChange'], id: number) => React.ReactNode;
}

export interface SelectFieldProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: {key: string; value: string}[];
	required?: boolean;
	className?: string;
}