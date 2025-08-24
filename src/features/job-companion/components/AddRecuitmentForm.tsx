'use client';

import { InputField } from '@/features/profile/components/input-fields/InputField.component';
import { TextareaField } from '@/features/profile/components/input-fields/TextAreaField.component';
import { useRecruitmentStore } from '@/services/job-companion/job-companion.store';
import { useToast } from '@/services/toast.store';
import { InsertJobDataReq } from '@/types/job.type';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AddRecruitmentForm() {
	const { jobData, isLoading, setField, submitJob, resetForm } = useRecruitmentStore();
	const { setOpenToast } = useToast();

	const router = useRouter();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setField(name as keyof InsertJobDataReq, value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const id = await submitJob();
			if (id) {
				setOpenToast({
					type: 'success',
					title: 'Berhasil!',
					message: 'Berhasil menambah data job vacancy',
				});
				router.push(`/job-companion/${id}/interview-simulator`);
			}
		} catch {
			setOpenToast({
				type: 'error',
				title: 'Gagal',
				message: 'Gagal menambah data job vacancy',
			});
		}
	};

	const handleCancel = () => {
		resetForm();
		router.back();
	};

	useEffect(() => {
		return () => {
			resetForm();
		};
	}, [resetForm]);

	return (
		<div className="mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10 flex flex-col mt-12">
			<h3 className="font-bold"></h3>
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
					{/* Link Rekrutmen */}
					<InputField
						label="Link Rekrutmen"
						name="link"
						type="text"
						value={jobData.link}
						onChange={handleInputChange}
						placeholder="cth: https://www.careers.imphnen.com/management-trainee-2025"
						required
						className="md:col-span-2"
					/>

					{/* Nama Perusahaan */}
					<InputField
						label="Nama Perusahaan"
						name="company"
						type="text"
						value={jobData.company}
						onChange={handleInputChange}
						placeholder="cth: PT IMPHNEN Tbk."
						required
					/>

					{/* Posisi Pekerjaan Dilamar */}
					<InputField
						label="Posisi Dilamar"
						name="jobTitle"
						type="text"
						value={jobData.jobTitle}
						onChange={handleInputChange}
						placeholder="cth: Management Trainee"
						required
					/>

					{/* Lokasi */}
					<InputField
						label="Lokasi"
						name="location"
						type="text"
						value={jobData.location || ''}
						onChange={handleInputChange}
						placeholder="cth: Jakarta/Remote"
					/>

					{/* Job Description */}
					<TextareaField
						label="Deskripsi Pekerjaan"
						name="jobDescription"
						value={jobData.description || ''}
						onChange={handleInputChange}
						className="col-span-2"
					/>
				</div>

				{/* button group */}
				<div className="mt-12 pt-6 border-t border-slate-200 flex justify-end items-center gap-4">
					<button
						type="button"
						onClick={handleCancel}
						className="cursor-pointer font-semibold text-slate-600 hover:text-slate-800"
						disabled
					>
						Batal
					</button>
					<button
						type="submit"
						className="px-6 py-3 flex gap-2 bg-accent cursor-pointer text-white font-semibold rounded-lg shadow-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
					>
						{isLoading ? 'Menyimpan...' : 'Simpan & Mulai Interview'}
					</button>
				</div>
			</form>
		</div>
	);
}
