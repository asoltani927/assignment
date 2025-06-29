import { Provider } from '@nestjs/common';
import { PrismaClient } from '@assignment/prisma';

export const PRISMA_CLIENT = 'PRISMA_CLIENT';

export const PrismaProvider: Provider = {
  provide: PRISMA_CLIENT,
  useFactory: async () => {
    const prisma = new PrismaClient();
    await prisma.$connect();
    return prisma;
  },
};
