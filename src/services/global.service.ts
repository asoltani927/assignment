import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@assignment/prisma';
import { PRISMA_CLIENT } from '@providers/prisma.provider';

@Injectable()
export class GlobalService {
  @Inject(PRISMA_CLIENT)
  protected readonly prisma!: () => PrismaClient;
}
