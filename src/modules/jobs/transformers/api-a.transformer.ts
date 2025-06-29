import { JobOfferA } from '../typings/job-offer-a.typing';
import { UnifiedJob } from '../typings/unified-job.typing';

export function transformAPIA(job: JobOfferA): UnifiedJob {
  const [min, max] = job.details.salaryRange
    .replace(/\$/g, '')
    .replace(/k/g, '000')
    .split(' - ')
    .map((s) => parseInt(s.trim()));

  return {
    id: job.jobId,
    title: job.title,
    location: job.details.location,
    type: job.details.type,
    salaryMin: min,
    salaryMax: max,
    currency: 'USD',
    company: job.company.name,
    industry: job.company.industry,
    skills: job.skills,
    postedDate: job.postedDate,
  };
}
