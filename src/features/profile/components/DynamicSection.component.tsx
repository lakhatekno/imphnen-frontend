import { DynamicSectionProps } from "@/types/profile";
import { Plus, Trash2 } from "lucide-react";

export default function DynamicSection<T extends { id: number }>({
	sectionName,
	title,
	items,
	onAdd,
	onRemove,
	onChange,
	renderItem,
}: DynamicSectionProps<T>) {
	return (
		<div className="space-y-8">
			{items.map((item, index) => (
				<div
					key={item.id}
					className="p-6 border border-slate-200 rounded-lg relative bg-slate-50/50"
				>
					<div className="flex justify-between items-center mb-4">
						<h3 className="font-semibold text-slate-800">
							{title} {index + 1}
						</h3>
						{items.length > 1 && (
							<button
								onClick={() => onRemove(sectionName, item.id)}
								className="text-slate-400 hover:text-red-500"
							>
								<Trash2 size={18} />
							</button>
						)}
					</div>
					{renderItem(item, onChange, item.id)}
				</div>
			))}
			<button
				onClick={onAdd}
				className="flex items-center gap-2 font-semibold text-accent hover:text-blue-700 mt-4"
			>
				<Plus size={18} /> Tambah {title}
			</button>
		</div>
	);
}