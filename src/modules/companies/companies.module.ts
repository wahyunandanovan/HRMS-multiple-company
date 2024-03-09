import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from './companies.entity';
import { CompaniesService } from './companies.service';
import { CompaniesController } from '../companies/companies.controller';
import { PlansService } from '../plans/plans.service';
import { Plans } from '../plans/plan.entity';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Companies, Plans, Users])],
  providers: [CompaniesService, PlansService, UsersService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
