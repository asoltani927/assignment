// src/modules/job-offers/job-offers.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { JobOffersController } from './job-offers.controller';
import { JobOffersService } from './job-offers.service';
import { JobOffersInput } from './models/job-offers.input';

describe('JobOffersController', () => {
  let controller: JobOffersController;
  let service: JobOffersService;

  const mockService = {
    getAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobOffersController],
      providers: [{ provide: JobOffersService, useValue: mockService }],
    }).compile();

    controller = module.get<JobOffersController>(JobOffersController);
    service = module.get<JobOffersService>(JobOffersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return job offers with meta and data', async () => {
    const query: JobOffersInput = { page: 1, limit: 10 };
    const expectedResult = {
      meta: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
      data: [
        {
          id: 'job-123',
          title: 'Frontend Developer',
          companyName: 'Example Co',
        },
      ],
    };

    mockService.getAll.mockResolvedValue(expectedResult);

    const result = await controller.getAll(query);

    expect(service.getAll).toHaveBeenCalledWith(query);
    expect(result).toEqual(expectedResult);
  });
});
