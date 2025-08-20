import AddRecruitmentForm from "@/features/job-companion/components/AddRecuitmentForm";

export default function ApplyVacancy() {
  return (
    <section>
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold text-slate-900 mb-2 text-left">Detail Pekerjaan</h2>
			</div>
			<AddRecruitmentForm />
		</section>
  )
}