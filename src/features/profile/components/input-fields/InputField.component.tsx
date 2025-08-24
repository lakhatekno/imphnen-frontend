import { InputFieldProps } from "@/types/profile";

export const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', value, onChange, placeholder, required, className }) => (
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
			value={value}
			onChange={onChange}
			placeholder={placeholder || ''}
			required={required}
			className="px-1 py-0.5 text-slate-900 border-b-1 w-full border-b-slate-400 focus:outline-none focus:border-b-2 focus:border-accent"
		/>
	</div>
);