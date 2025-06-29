import { Module } from '@nestjs/common';
import { ApiAJob } from './tasks/api-a.job';
import { ApiBJob } from './tasks/api-b.job';
import { JobOffersService } from './job-offers.service';
import { JobOffersController } from './job-offers.controller';

@Module({
  controllers: [JobOffersController],
  // TODO: it had better to have one job fetcher job schedule
  providers: [ApiAJob, ApiBJob, JobOffersService],
})
export class JobOffersModule {}
