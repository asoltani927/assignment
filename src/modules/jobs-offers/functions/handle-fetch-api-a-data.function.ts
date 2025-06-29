import { PrismaClient } from '@assignment/prisma';
import { Logger } from '@nestjs/common';
import { fetchJson } from '@utils/fetch-json.util';
import { JobOfferA } from '../typings/job-offer-a.typing';
import { transformAPIA } from '../transformers/api-a.transformer';

interface handleFetchApiADataDeps {
  prisma: PrismaClient;
  logger: Logger;
}

interface ApiAResult {
  metadata: {
    requestId: string;
    timestamp: string;
  };
  jobs: JobOfferA[];
}

export async function handleFetchApiAData({
  prisma,
  logger,
}: handleFetchApiADataDeps) {
  logger.log('📡 [API-A] Fetching jobs from API A...');

  let data: ApiAResult;

  try {
    data = await fetchJson<ApiAResult>(
      'https://assignment.devotel.io/api/provider1/jobs',
    );
    logger.log(`✅ [API-A] Fetched ${data.jobs.length} jobs`);
  } catch (error) {
    logger.error('❌ [API-A] Failed to fetch jobs', error);
    return;
  }

  for (const job of data.jobs) {
    try {
      const transformed = transformAPIA(job);
      const normalized = {
        companyName: transformed.company,
        industry: transformed.industry,
        skills: transformed.skills,
        postedDate: new Date(transformed.postedDate),
        source: 'API_1',
        type: transformed.type,
        isRemote: false,
        locationCity: transformed.location.split(',')[0]?.trim(),
        locationState: transformed.location.split(',')[1]?.trim(),
        externalId: transformed.id,
        title: transformed.title,
        companyWebsite: transformed.website,
        currency: transformed.currency,
        experience: transformed.experience,
        maxSalary: transformed.salaryMax,
        minSalary: transformed.salaryMin,
        description: transformed.description,
      };

      await prisma.job.upsert({
        where: { externalId: normalized.externalId },
        create: normalized,
        update: normalized,
      });

      logger.log(
        `✅ [API-A] Upserted job: ${normalized.title} (${normalized.externalId})`,
      );
    } catch (error) {
      logger.warn(
        `⚠️ [API-A] Failed to upsert job with ID ${job.jobId}`,
        error,
      );
    }
  }

  logger.log(`🎯 [API-A] Finished processing ${data.jobs.length} jobs`);
}
