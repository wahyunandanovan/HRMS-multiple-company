import { Module } from '@nestjs/common';
import { CompaniesService } from '../companies/companies.service';
import { SchedulerService } from './scheduler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from '../companies/companies.entity';
import { Plans } from '../plans/plan.entity';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Companies, Plans, Users])],
  providers: [SchedulerService, CompaniesService, UsersService],
})
export class SchedulerModule {}
