import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class SchedulerService {
  constructor(
    @Inject(forwardRef(() => CompaniesService))
    private readonly companiesService: CompaniesService,
  ) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  handleCron() {
    this.companiesService.updateExpiredPlanStatus();
  }
}
