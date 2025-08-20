export interface WorkExperience {
  id: number;
  type: 'Kerja' | 'Organisasi';
  status: 'Magang' | 'Penuh Waktu' | 'Paruh Waktu' | 'Kontrak';
  company: string;
  position: string;
  startDate: string;
  endDate: string;
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
  level: 'Pemula' | 'Menengah' | 'Mahir';
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

export type SectionName = 'workExperience' | 'education' | 'skills';
export type SectionItem = WorkExperience | Education | Skill;