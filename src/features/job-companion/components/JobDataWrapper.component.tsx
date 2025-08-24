'use client';

import { useJobCompanionStore } from "@/services/job-companion/job-companion.store";
import { useEffect } from "react";
import JobCard from "./JobCard";

export default function JobDataWrapper() {
	const { jobData, getJobData } = useJobCompanionStore();

	useEffect(() => {
		getJobData();
	}, [getJobData]);

	return (
		<div className="flex flex-col gap-4 w-full mt-4">
			{jobData &&
				jobData.map((data) => (
					<JobCard
						key={data.id} {...data}
					/>
				))}
		</div>
	);
}
