import { useProfileStore } from "@/services/profile/profileStore";

import DynamicSection from "@/features/profile/components/DynamicSection.component";
import { SelectField } from "@/features/profile/components/input-fields/SelectField.component";
import { InputField } from "@/features/profile/components/input-fields/InputField.component";

import { Skill } from "@/types/profile";

export default function SkillsTab() {
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
						options={[
							{key: 'BEGINNER', value:'Pemula'},
							{key: 'INTERMEDIATE', value:'Menengah'},
							{key: 'EXPERT', value:'Mahir'},
							{key: 'SPECIALIST', value:'Spesialis'},
						]}
						required
					/>
				</div>
			)}
		/>
	);
}