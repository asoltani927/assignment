import {
  Injectable,
  OnModuleDestroy,
  OnApplicationShutdown,
} from '@nestjs/common';
import { GlobalService } from './global.service';

@Injectable()
export class ShutdownService
  extends GlobalService
  implements OnModuleDestroy, OnApplicationShutdown
{
  async onModuleDestroy() {
    await this.cleanup();
  }

  async onApplicationShutdown(signal: string) {
    console.log(`Application shutdown signal received: ${signal}`);
    await this.cleanup();
  }

  private async cleanup() {
    console.log('Cleaning up resources...');

    const tasks = [
      (async () => {
        try {
          await this.prisma().$disconnect();
          console.log('Prisma disconnected.');
        } catch (error) {
          console.error('Error disconnecting Prisma:', error);
        }
      })(),
    ];

    try {
      await Promise.all(tasks);
      console.log('All resources closed successfully.');
    } catch (error) {
      console.error('Error while closing resources:', error);
    }
  }
}
