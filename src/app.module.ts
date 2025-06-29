import { Module } from '@nestjs/common';
import { GlobalService } from '@services/global.service';
import { JobsModule } from './modules/jobs/jobs.module';
import { PrismaProvider } from '@providers/prisma.provider';

@Module({
  imports: [JobsModule],
  providers: [PrismaProvider, GlobalService],
  exports: [PrismaProvider, GlobalService],
})
export class AppModule {}
