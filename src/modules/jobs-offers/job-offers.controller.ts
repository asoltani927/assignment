// src/modules/job-offers/job-offers.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { JobOffersInput } from './models/job-offers.input';

@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Get()
  async getAll(@Query() query: JobOffersInput) {
    return this.jobOffersService.getAll(query);
  }
}
