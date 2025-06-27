import { JobOfferB } from '@typings/job-offer-b.typing';
import { UnifiedJob } from '@typings/unified-job.typing';

export function transformAPIB(jobId: string, job: JobOfferB): UnifiedJob {
  const location = job.location.remote
    ? `Remote, ${job.location.city}, ${job.location.state}`
    : `${job.location.city}, ${job.location.state}`;

  return {
    id: jobId,
    title: job.position,
    location,
    type: 'Unknown', // چون نوع شغل مشخص نشده
    salaryMin: job.compensation.min,
    salaryMax: job.compensation.max,
    currency: job.compensation.currency,
    company: job.employer.companyName,
    website: job.employer.website,
    skills: job.requirements.technologies,
    postedDate: new Date(job.datePosted).toISOString(),
  };
}
