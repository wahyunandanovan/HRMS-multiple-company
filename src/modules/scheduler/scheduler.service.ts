import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly companiesService: CompaniesService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.companiesService.updateExpiredPlanStatus();
  }
}
