import { formatDateToDDMMYYYY } from '@/lib/helper/formatDate';
import { sanitizeLink } from '@/lib/helper/sanitizeLink';
import { JobData } from '@/types/job.type';
import { Building, Calendar, FileText, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function JobCard({ id, jobTitle, company, location, createdAt, description, deadline, link }: JobData) {
	const formattedSubmitDate = formatDateToDDMMYYYY(createdAt);
	const sanitizedLink = sanitizeLink(link);
	let formattedDeadline: string = '';
	if (deadline) {
		formattedDeadline = formatDateToDDMMYYYY(deadline?.toString());
	}

	return (
		<div className="w-full p-4 lex flex-col shadow-md shadow-slate-300 rounded-lg bg-white">
			{/* Card Heading */}
			<div className="flex items-start justify-between md:gap-8">
				<div className="flex flex-col md:flex-row justify-between w-full gap-2">
					{/* Vacancy name */}
					<h4 className="font-semibold text-accent hover:underline cursor-pointer">
						<a
							href={sanitizedLink}
							target="_blank"
						>
							{jobTitle}
						</a>
					</h4>
				</div>
				{/* Button Group */}
				<div className="flex gap-2 items-center">
					{/* Interview Simulator Navigation */}
					<Link
						href={`/job-companion/${id}/interview-simulator`}
						prefetch={false}
						className="text-accent"
					>
						<MessageCircle />
					</Link>

					{/* Email/CV Preview Navigation */}
					<Link
						href={`/job-companion/${id}/email-preview`}
						prefetch={false}
						className="text-accent"
					>
						<FileText />
					</Link>
				</div>
			</div>

			{/* Card Body */}
			<div className="flex flex-col gap-2 mt-2">
				{/* Company name */}
				<p className="text-slate-600 text-xs inline-flex items-center gap-1">
					<Building className="scale-75" />
					{company}
				</p>

				{/* Location */}
				<p className="text-slate-600 text-xs inline-flex items-center gap-1">
					<MapPin className="scale-75" />
					{location || '-'}
				</p>

				{/* Submission Date */}
				<p className="text-slate-600 text-xs inline-flex items-center gap-1">
					<Calendar className="scale-75" />
					Tanggal Submit: {formattedSubmitDate}
				</p>

				{/* Description */}
				{description && (
					<p className="text-slate-600 text-sm line-clamp-5">{description}</p>
				)}

				{/* Submission Deadline */}
				{deadline && <p className="text-white text-xs bg-[#EF4444] px-2 py-1 w-fit rounded-lg">Deadline: {formattedDeadline}</p>}
			</div>
		</div>
	);
}
