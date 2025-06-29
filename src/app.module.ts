import { Module } from '@nestjs/common';
import { GlobalModule } from './global.module';
import { JobOffersModule } from './modules/jobs-offers/job-offers.module';

@Module({
  imports: [GlobalModule, JobOffersModule],
  providers: [],
  exports: [],
})
export class AppModule {}
