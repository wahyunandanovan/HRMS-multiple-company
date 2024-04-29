import { Test, TestingModule } from '@nestjs/testing';
import { CompanyPlanService } from './company-plan.service';

describe('CompanyPlanService', () => {
  let service: CompanyPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyPlanService],
    }).compile();

    service = module.get<CompanyPlanService>(CompanyPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
