import JobCard from "@/features/job-companion/components/JobCard";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function JobCompanion() {
  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-left">
          Dashboard
        </h2>
        <Link
          href={"/job-companion/apply-vacancy"}
          className="flex flex-col gap-1 items-center justify-center text-center text-sm text-white bg-accent px-4 py-2 rounded-lg"
        >
          <Briefcase />
          Lamar Pekerjaan
        </Link>
      </div>
      <div className="mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10 flex flex-col mt-12">
        <h3 className="font-bold">Lamaran Tracker</h3>
        <p className="text-sm mt-4">
          Lihat seluruh lamaran yang pernah anda kirimkan di sini.
        </p>
        <div className="flex flex-col gap-4 w-full mt-4">
          <JobCard></JobCard>
        </div>
      </div>
    </section>
  );
}
