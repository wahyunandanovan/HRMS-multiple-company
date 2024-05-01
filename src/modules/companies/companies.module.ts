import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from './companies.entity';
import { CompaniesService } from './companies.service';
import { CompaniesController } from '../companies/companies.controller';
import { PlansService } from '../plans/plans.service';
import { Plans } from '../plans/plan.entity';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { CompanyPlanService } from '../company-plan/company-plan.service';
import { CompanyPlan } from '../company-plan/company-plan.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Companies, Plans, Users, CompanyPlan])],
  providers: [
    CompaniesService,
    PlansService,
    UsersService,
    CompanyPlanService,
    AuthGuard,
    JwtService,
  ],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
