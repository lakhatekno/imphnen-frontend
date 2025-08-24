import { useProfileStore } from "@/services/profile/profileStore";
import DynamicSection from "@/features/profile/components/DynamicSection.component";
import { InputField } from "@/features/profile/components/input-fields/InputField.component";
import { Education } from "@/types/profile";

export function EducationTab() {
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