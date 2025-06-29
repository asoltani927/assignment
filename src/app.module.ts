import { Module } from '@nestjs/common';
import { JobsModule } from './modules/jobs/jobs.module';
import { GlobalModule } from './global.module';

@Module({
  imports: [GlobalModule, JobsModule],
  providers: [],
  exports: [],
})
export class AppModule {}
