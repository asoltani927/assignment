import { Module } from '@nestjs/common';
import { ApiAJob } from './tasks/api-a.job';
import { ApiBJob } from './tasks/api-b.job';

@Module({
  // TODO: it had better to have one job fetcher job schedule
  providers: [ApiAJob, ApiBJob],
})
export class JobsModule {}
