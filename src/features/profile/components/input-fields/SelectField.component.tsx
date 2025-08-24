import { SelectFieldProps } from "@/types/profile";

export const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, options, required, className }) => (
	<div className={className}>
		<label
			htmlFor={name}
			className="block text-sm font-medium text-slate-700 mb-1"
		>
			{label} {required && <span className="text-red-500">*</span>}
		</label>
		<select
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			required={required}
			className="form-select focus:outline-none focus:border-b-2 focus:border-accent w-full"
		>
			{options.map((opt) => (
				<option
					key={opt.key}
					value={opt.key}
				>
					{opt.value}
				</option>
			))}
		</select>
	</div>
);