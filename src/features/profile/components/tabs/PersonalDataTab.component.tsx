import { useProfileStore } from "@/services/profile/profileStore";
import { InputField } from "@/features/profile/components/input-fields/InputField.component";

export default function PersonalDataTab() {
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