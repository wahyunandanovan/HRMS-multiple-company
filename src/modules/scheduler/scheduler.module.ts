import { Module } from '@nestjs/common';
import { CompaniesService } from '../companies/companies.service';
import { SchedulerService } from './scheduler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from '../companies/companies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Companies])],
  providers: [SchedulerService, CompaniesService],
})
export class SchedulerModule {}
