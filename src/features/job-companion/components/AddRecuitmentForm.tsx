'use client'

import { Plus } from "lucide-react";

export default function AddRecruitmentForm() {
	return (
		<div className="mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10 flex flex-col mt-12">
			<h3 className="font-bold"></h3>
			<form action={''}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
					{/* Link Rekrutmen */}
					<InputField
						label="Link Rekrutmen"
						name="recruitmenLink"
						type="string"
						value=""
						// onChange={}
						placeholder="cth: https://www.careers.imphnen.com/management-trainee-2025"
						required
						className="md:col-span-2"
					/>

					{/* Nama Perusahaan */}
					<InputField
						label="Nama Perusahaan"
						name="companyName"
						type="string"
						value=""
						// onChange={}
						placeholder="cth: PT IMPHNEN Tbk."
						required
					/>

					{/* Posisi Pekerjaan Dilamar */}
					<InputField
						label="Posisi Dilamar"
						name="jobPosition"
						type="string"
						value=""
						// onChange={}
						placeholder="cth: Management Trainee"
						required
					/>

					{/* Lokasi */}
					<InputField
						label="Lokasi"
						name="location"
						type="string"
						value=""
						// onChange={}
						placeholder="cth: Jakarta/Remote"
						required
					/>

					<TextareaField
						label="Deskripsi Pekerjaan"
						name="jobDescription"
						// onChange={}
						className="col-span-2"
					/>
				</div>

				{/* button group */}
				<div className="mt-12 pt-6 border-t border-slate-200 flex justify-end items-center gap-4">
					<button
						type="button"
						onClick={() => {}}
						className="cursor-pointer font-semibold text-slate-600 hover:text-slate-800"
            disabled
					>
						Batal
					</button>
					<button
						type="button"
						onClick={() => {}}
						className="px-6 py-3 flex gap-2 bg-accent cursor-pointer text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled
          >
            <Plus />
						Selanjutnya
					</button>
				</div>
			</form>
		</div>
	);
}

interface InputFieldProps {
	label: string;
	name: string;
	type?: string;
	value: string;
	// onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	placeholder?: string;
	required?: boolean;
	className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	name,
	type = 'text',
	// value,
	// onChange,
	placeholder,
	required,
	className,
}) => (
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
			// value={value}
			// onChange={onChange}
			placeholder={placeholder || ''}
			required={required}
			className="px-1 py-0.5 text-slate-900 border-b-1 w-full border-b-slate-400 focus:outline-none focus:border-b-2 focus:border-accent"
		/>
	</div>
);

interface TextareaFieldProps {
	label: string;
	name: string;
	value?: string;
	// onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
	placeholder?: string;
	className?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
	label,
	name,
	value,
	// onChange,
	required,
	placeholder,
	className,
}) => (
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
			// onChange={onChange}
			required={required}
			placeholder={placeholder || ''}
			rows={4}
			className="form-textarea border w-full rounded-lg border-slate-400 focus:outline-none focus:border-2 focus:border-accent"
		></textarea>
	</div>
);
