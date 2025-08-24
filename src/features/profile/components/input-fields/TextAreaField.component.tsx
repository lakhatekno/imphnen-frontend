import { TextareaFieldProps } from "@/types/profile";

export const TextareaField: React.FC<TextareaFieldProps> = ({ label, name, value, onChange, required, className }) => (
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
