import { Injectable } from '@nestjs/common';
import { Prisma } from '@assignment/prisma';
import { JobOffersInput } from './models/job-offers.input';
import { GlobalService } from '@services/global.service';

@Injectable()
export class JobOffersService extends GlobalService {
  async getAll(query: JobOffersInput) {
    const {
      page = 1,
      limit = 10,
      title,
      location,
      remote,
      type,
      company,
      industry,
      skills,
      minSalary,
      maxSalary,
      experience,
      postedAfter,
      sortBy = 'postedDate',
      order = 'desc',
    } = query;

    const where: Prisma.JobWhereInput = {
      ...(title && { title: { contains: title, mode: 'insensitive' } }),
      ...(location && {
        OR: [
          { locationCity: { contains: location, mode: 'insensitive' } },
          { locationState: { contains: location, mode: 'insensitive' } },
        ],
      }),
      ...(typeof remote === 'boolean' && { isRemote: remote }),
      ...(type && { type: { equals: type, mode: 'insensitive' } }),
      ...(company && {
        companyName: { contains: company, mode: 'insensitive' },
      }),
      ...(industry && {
        industry: { contains: industry, mode: 'insensitive' },
      }),
      ...(minSalary && { minSalary: { gte: minSalary } }),
      ...(maxSalary && { maxSalary: { lte: maxSalary } }),
      ...(experience && { experience: { gte: experience } }),
      ...(postedAfter && { postedDate: { gte: new Date(postedAfter) } }),
      ...(skills &&
        skills.length > 0 && {
          skills: {
            hasSome: skills,
          },
        }),
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.job.count({ where }),
      this.prisma.job.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: order,
        },
      }),
    ]);

    return {
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      data,
    };
  }
}
