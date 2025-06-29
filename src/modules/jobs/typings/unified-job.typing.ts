export interface UnifiedJob {
  id: string;
  title: string;
  location: string; // e.g., "San Francisco, CA" or "Remote, New York, NY"
  type: string; // e.g., "Full-Time", "Contract"
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  company: string;
  industry?: string;
  website?: string;
  skills: string[];
  postedDate: string; // ISO format
}
