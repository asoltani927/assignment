import { PrismaClient } from '@assignment/prisma';
import { Logger } from '@nestjs/common';
import { fetchJson } from '@utils/fetch-json.util';
import { transformAPIB } from '../transformers/api-b.transformer';
import { JobOfferB } from '../typings/job-offer-b.typing';

interface handleFetchApiBDataDeps {
  prisma: PrismaClient;
  logger: Logger;
}

interface ApiBResult {
  status: string;
  data: {
    jobsList: Record<string, JobOfferB>;
  };
}

export async function handleFetchApiBData({
  prisma,
  logger,
}: handleFetchApiBDataDeps) {
  logger.log('📡 [API-B] Fetching jobs from API A...');

  let data: ApiBResult;

  try {
    data = await fetchJson<ApiBResult>(
      'https://assignment.devotel.io/api/provider2/jobs',
    );
    logger.log(
      `✅ [API-B] Fetched ${Object.keys(data.data.jobsList).length} jobs`,
    );
  } catch (error) {
    logger.error('❌ [API-B] Failed to fetch jobs', error);
    return;
  }

  for (const jobKey in data.data.jobsList) {
    try {
      const transformed = transformAPIB(jobKey, data.data.jobsList[jobKey]);
      const normalized = {
        companyName: transformed.company,
        industry: transformed.industry,
        skills: transformed.skills,
        postedDate: new Date(transformed.postedDate),
        source: 'API_2',
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
        `✅ [API-B] Upserted job: ${normalized.title} (${normalized.externalId})`,
      );
    } catch (error) {
      logger.warn(`⚠️ [API-B] Failed to upsert job with ID ${jobKey}`, error);
    }
  }

  logger.log(
    `🎯 [API-B] Finished processing ${
      Object.keys(data.data.jobsList).length
    } jobs`,
  );
}
