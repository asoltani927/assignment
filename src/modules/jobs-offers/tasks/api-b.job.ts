import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GlobalService } from '@services/global.service';
import { handleFetchApiBData } from '../functions/handle-fetch-api-b-data.function';

@Injectable()
export class ApiBJob extends GlobalService {
  private readonly logger = new Logger(ApiBJob.name);

  @Cron(CronExpression.EVERY_10_SECONDS) // or use a string like '0 * * * *'
  async handleCron() {
    this.logger.log('Running job sync cron...');
    await handleFetchApiBData({ prisma: this.prisma, logger: this.logger });
    // TODO: Call your APIs, normalize and store with Prisma
  }
}
