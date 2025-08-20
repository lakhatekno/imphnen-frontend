import { Building, Calendar, MapPin, Pencil, Trash } from 'lucide-react';

export default function JobCard() {
	return (
		<div className="w-full p-4 lex flex-col shadow-md shadow-slate-300 rounded-lg bg-white">
			{/* Card Heading */}
			<div className="flex items-start justify-between md:gap-8">
				<div className="flex flex-col md:flex-row justify-between w-full gap-2">
					{/* Vacancy name */}
					<h4 className="font-semibold text-accent">Associate Junior Fullstack NodeJS Developer</h4>

					{/* Status */}
					<span className="bg-[#34FA97] px-8 py-1 rounded-lg w-fit text-xs">Menunggu</span>
				</div>
				{/* Button Group */}
				<div className="flex gap-2 items-center">
					{/* Edit Button */}
					<button className="text-accent">
						<Pencil />
					</button>

					{/* Delete Button */}
					<button className="text-[#EF4444]">
						<Trash />
					</button>
				</div>
			</div>

      {/* Card Body */}
      <div className='flex flex-col gap-2 mt-2'>
        {/* Company name */}
        <p className='text-slate-600 text-xs inline-flex items-center gap-1'>
          <Building className='scale-75' />
          PT Teknologi Indonesia
        </p>

        {/* Location */}
        <p className='text-slate-600 text-xs inline-flex items-center gap-1'>
          <MapPin className='scale-75' />
          Jakarta
        </p>

        {/* Submission Date */}
        <p className='text-slate-600 text-xs inline-flex items-center gap-1'>
          <Calendar className='scale-75' />
          Tanggal Submit: 30-08-2023
        </p>

        {/* Description */}
        <p className='text-slate-600 text-sm line-clamp-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, quam vel. Quidem est magnam, sequi earum autem dicta natus delectus nobis consequuntur blanditiis nostrum rerum! Beatae voluptates magnam, et quibusdam quam deserunt libero, exercitationem rem eum nisi fugit ratione mollitia.</p>
        
        {/* Submission Deadline */}
        <p className='text-white text-xs bg-[#EF4444] px-2 py-1 w-fit rounded-lg'>Deadline: 07-09-2023</p>
      </div>
		</div>
	);
}
