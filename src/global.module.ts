import { Global, Module } from '@nestjs/common';
import { GlobalService } from '@services/global.service';
import { PrismaProvider } from '@providers/prisma.provider';
import { ScheduleModule } from '@nestjs/schedule';

@Global()
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [PrismaProvider, GlobalService],
  exports: [PrismaProvider, GlobalService],
})
export class GlobalModule {}
