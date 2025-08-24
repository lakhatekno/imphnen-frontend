"use client";

import { useProfileStore } from "@/services/profile/profileStore";
import PersonalDataTab from "@/features/profile/components/tabs/PersonalDataTab.component";
import WorkExperienceTab from "@/features/profile/components/tabs/WorkExperienceTab.component";
import { EducationTab } from "@/features/profile/components/tabs/EducationTab.component";
import SkillsTab from "@/features/profile/components/tabs/SkillsTab.component";
import { useToast } from "@/services/toast.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingForm(): React.ReactElement {
  const { activeTab, tabs, setActiveTab, saveAndContinue, fetchProfile } =
    useProfileStore();
  const { setOpenToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const submitSection = async () => {
    try {
      const result = await saveAndContinue();

      if (result.finished) {
        setOpenToast({
          type: "success",
          title: "Onboarding Selesai!",
          message: "Semua data tersimpan. Mengarahkan ke Job Companion...",
        });

        setTimeout(() => {
          router.push("/job-companion");
        }, 700);
      } else {
        setOpenToast({
          type: "success",
          title: "Berhasil!",
          message: "Data tersimpan, lanjut ke langkah berikutnya.",
        });
      }
    } catch {
      setOpenToast({
        type: "error",
        title: "Gagal Menyimpan",
        message: "Terjadi kesalahan saat menyimpan data.",
      });
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Data Pribadi":
        return <PersonalDataTab />;
      case "Pengalaman Kerja":
        return <WorkExperienceTab />;
      case "Pendidikan":
        return <EducationTab />;
      case "Keahlian":
        return <SkillsTab />;
      default:
        return <PersonalDataTab />;
    }
  };

  return (
    <section className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Lengkapi Profil CV Anda
      </h2>
      <div className="border-b border-slate-200 mb-8">
        <nav className="-mb-px flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
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
          onClick={submitSection}
          className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          Simpan & Lanjutkan
        </button>
      </div>
    </section>
  );
}
