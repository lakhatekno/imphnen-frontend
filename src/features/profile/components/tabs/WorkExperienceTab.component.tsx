import { WorkExperience } from "@/types/profile";
import { useProfileStore } from "@/services/profile/profileStore";
import { InputField } from "@/features/profile/components/input-fields/InputField.component";
import { TextareaField } from "@/features/profile/components/input-fields/TextAreaField.component";
import { SelectField } from "@/features/profile/components/input-fields/SelectField.component";
import DynamicSection from "@/features/profile/components/DynamicSection.component";

export default function WorkExperienceTab() {
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
              options={[
                { key: 'WORK', value: 'Kerja' },
                { key: 'ORGANIZATION', value: 'Organisasi' },
                { key: 'VOLUNTEER', value: 'Volunteer' },
                { key: 'EVENT', value: 'Panitia Event' },
              ]}
              required
            />
            <SelectField
              label="Status Pengalaman"
              name="status"
              value={item.status}
              onChange={(e) => onChange(e, 'workExperience', id)}
              options={[
                {key: 'FULL_TIME', value: 'Full Time'},
                {key: 'PART_TIME', value: 'Part Time'},
                {key: 'INTERNSHIP', value: 'Magang'},
                {key: 'CONTRACT', value: 'Kontrak'},
                {key: 'HONORARY', value: 'Honorer'},
                {key: 'OUTSOURCED', value: 'Outsource'},
              ]}
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
              value={item.endDate || ''}
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