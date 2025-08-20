'use client';

import { useProfileStore } from '@/services/profile/profileStore';
import type { SectionName, WorkExperience, Education, Skill } from '@/types/profile';
import { Plus, Trash2 } from 'lucide-react';

export default function OnboardingForm(): React.ReactElement {
	const { activeTab, tabs, setActiveTab, saveAndContinue, saveAsDraft } = useProfileStore();

	const renderActiveTab = () => {
		switch (activeTab) {
			case 'Data Pribadi':
				return <PersonalDataTab />;
			case 'Pengalaman Kerja':
				return <WorkExperienceTab />;
			case 'Pendidikan':
				return <EducationTab />;
			case 'Keahlian':
				return <SkillsTab />;
			default:
				return <PersonalDataTab />;
		}
	};

	return (
		<section className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
			<h2 className="text-2xl font-bold text-slate-900 mb-2">Lengkapi Profil CV Anda</h2>
			<div className="border-b border-slate-200 mb-8">
				<nav className="-mb-px flex space-x-6">
					{tabs.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`py-4 px-1 border-b-2 font-medium text-sm ${
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

			<div className="h-fit">{renderActiveTab()}</div>

			<div className="mt-12 pt-6 border-t border-slate-200 flex justify-end items-center gap-4">
				<button
					type="button"
					onClick={saveAsDraft}
					className="font-semibold text-slate-600 hover:text-slate-800"
				>
					Simpan Draft
				</button>
				<button
					type="button"
					onClick={saveAndContinue}
					className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Simpan & Lanjutkan
				</button>
			</div>
		</section>
	);
}

// --- TAB COMPONENTS ---

function PersonalDataTab() {
	const { formData, handleInputChange } = useProfileStore();
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
			<InputField
				label="Nama Lengkap"
				name="fullName"
				value={formData.fullName}
				onChange={handleInputChange}
				required
			/>
			<InputField
				label="Email"
				name="email"
				type="email"
				value={formData.email}
				onChange={handleInputChange}
				required
			/>
			<InputField
				label="Nomor Telepon"
				name="phone"
				type="tel"
				value={formData.phone}
				onChange={handleInputChange}
				required
			/>
			<InputField
				label="Alamat"
				name="address"
				value={formData.address}
				onChange={handleInputChange}
			/>
			<InputField
				label="URL LinkedIn"
				name="linkedin"
				value={formData.linkedin}
				onChange={handleInputChange}
				placeholder="https://linkedin.com/in/..."
			/>
			<InputField
				label="URL Portofolio"
				name="portfolio"
				value={formData.portfolio}
				onChange={handleInputChange}
				placeholder="https://github.com/..."
			/>
		</div>
	);
}

function WorkExperienceTab() {
	const { formData, handleArrayChange, addItem, removeItem } = useProfileStore();
	return (
		<DynamicSection<WorkExperience>
			sectionName="workExperience"
			title="Pengalaman"
			items={formData.workExperience}
			onAdd={() => addItem('workExperience')}
			onRemove={removeItem}
			onChange={handleArrayChange}
			renderItem={(item, onChange, id) => (
        <div className='flex flex-col gap-6 w-full z-0'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <SelectField
              label="Tipe Pengalaman"
              name="type"
              value={item.type}
              onChange={(e) => onChange(e, 'workExperience', id)}
              options={['Kerja', 'Organisasi']}
              required
            />
            <SelectField
              label="Status Pengalaman"
              name="status"
              value={item.status}
              onChange={(e) => onChange(e, 'workExperience', id)}
              options={['Magang', 'Penuh Waktu', 'Paruh Waktu', 'Kontrak']}
              required
            />
            <InputField
              label="Perusahaan"
              name="company"
              value={item.company}
              onChange={(e) => onChange(e, 'workExperience', id)}
              required
            />
            <InputField
              label="Posisi"
              name="position"
              value={item.position}
              onChange={(e) => onChange(e, 'workExperience', id)}
              required
            />
            <InputField
              label="Periode Mulai"
              name="startDate"
              type="date"
              value={item.startDate}
              onChange={(e) => onChange(e, 'workExperience', id)}
              required
            />
            <InputField
              label="Periode Selesai"
              name="endDate"
              type="date"
              value={item.endDate}
              onChange={(e) => onChange(e, 'workExperience', id)}
            />
          </div>
          <TextareaField
            label="Deskripsi"
            name="description"
            value={item.description}
            onChange={(e) => onChange(e, 'workExperience', id)}
            className=""
          />
        </div>
			)}
		/>
	);
}

function EducationTab() {
	const { formData, handleArrayChange, addItem, removeItem } = useProfileStore();
	return (
		<DynamicSection<Education>
			sectionName="education"
			title="Pendidikan"
			items={formData.education}
			onAdd={() => addItem('education')}
			onRemove={removeItem}
			onChange={handleArrayChange}
			renderItem={(item, onChange, id) => (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
					<InputField
						label="Institusi"
						name="institution"
						value={item.institution}
						onChange={(e) => onChange(e, 'education', id)}
						className="md:col-span-2"
						required
					/>
					<InputField
						label="Gelar"
						name="degree"
						value={item.degree}
						onChange={(e) => onChange(e, 'education', id)}
						required
					/>
					<InputField
						label="Bidang Studi"
						name="field"
						value={item.field}
						onChange={(e) => onChange(e, 'education', id)}
						required
					/>
					<InputField
						label="Tanggal Mulai"
						name="startDate"
						type="date"
						value={item.startDate}
						onChange={(e) => onChange(e, 'education', id)}
						required
					/>
					<InputField
						label="Tanggal Selesai"
						name="endDate"
						type="date"
						value={item.endDate}
						onChange={(e) => onChange(e, 'education', id)}
					/>
				</div>
			)}
		/>
	);
}

function SkillsTab() {
	const { formData, handleArrayChange, addItem, removeItem } = useProfileStore();
	return (
		<DynamicSection<Skill>
			sectionName="skills"
			title="Keahlian"
			items={formData.skills}
			onAdd={() => addItem('skills')}
			onRemove={removeItem}
			onChange={handleArrayChange}
			renderItem={(item, onChange, id) => (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
					<InputField
						label="Nama Keahlian"
						name="name"
						value={item.name}
						onChange={(e) => onChange(e, 'skills', id)}
						required
					/>
					<SelectField
						label="Tingkat Keahlian"
						name="level"
						value={item.level}
						onChange={(e) => onChange(e, 'skills', id)}
						options={['Pemula', 'Menengah', 'Mahir']}
						required
					/>
				</div>
			)}
		/>
	);
}

// --- HELPER & GENERIC COMPONENTS ---

interface DynamicSectionProps<T extends { id: number }> {
	sectionName: SectionName;
	title: string;
	items: T[];
	onAdd: () => void;
	onRemove: (section: SectionName, id: number) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, section: SectionName, id: number) => void;
	renderItem: (item: T, onChange: DynamicSectionProps<T>['onChange'], id: number) => React.ReactNode;
}

function DynamicSection<T extends { id: number }>({
	sectionName,
	title,
	items,
	onAdd,
	onRemove,
	onChange,
	renderItem,
}: DynamicSectionProps<T>) {
	return (
		<div className="space-y-8">
			{items.map((item, index) => (
				<div
					key={item.id}
					className="p-6 border border-slate-200 rounded-lg relative bg-slate-50/50"
				>
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-semibold text-slate-800">
							{title} {index + 1}
						</h3>
						{items.length > 1 && (
							<button
								onClick={() => onRemove(sectionName, item.id)}
								className="text-slate-400 hover:text-red-500"
							>
								<Trash2 size={18} />
							</button>
						)}
					</div>
					{renderItem(item, onChange, item.id)}
				</div>
			))}
			<button
				onClick={onAdd}
				className="flex items-center gap-2 font-semibold text-accent hover:text-blue-700 mt-4"
			>
				<Plus size={18} /> Tambah {title}
			</button>
		</div>
	);
}

// Komponen InputField, SelectField, TextareaField tidak berubah
interface InputFieldProps {
	label: string;
	name: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	placeholder?: string;
	required?: boolean;
	className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', value, onChange, placeholder, required, className }) => (
	<div className={className}>
		<label
			htmlFor={name}
			className="block text-sm font-medium text-slate-700 mb-1"
		>
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		<input
			type={type}
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder || ''}
			required={required}
			className="px-1 py-0.5 text-slate-900 border-b-1 w-full border-b-slate-400 focus:outline-none focus:border-b-2 focus:border-accent"
		/>
	</div>
);

interface SelectFieldProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: string[];
	required?: boolean;
	className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, options, required, className }) => (
	<div className={className}>
		<label
			htmlFor={name}
			className="block text-sm font-medium text-slate-700 mb-1"
		>
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		<select
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			required={required}
			className="form-select focus:outline-none focus:border-b-2 focus:border-accent w-full"
		>
			{options.map((opt) => (
				<option
					key={opt}
					value={opt}
				>
					{opt}
				</option>
			))}
		</select>
	</div>
);

interface TextareaFieldProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
	className?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ label, name, value, onChange, required, className }) => (
	<div className={className}>
		<label
			htmlFor={name}
			className="block text-sm font-medium text-slate-700 mb-1"
		>
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		<textarea
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			required={required}
			rows={4}
			className="form-textarea border w-full rounded-lg border-slate-400 focus:outline-none focus:border-2 focus:border-accent"
		></textarea>
	</div>
);
