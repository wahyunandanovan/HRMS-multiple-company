import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyPlanController } from './company-plan.controller';
import { CompanyPlanService } from './company-plan.service';
import { CompanyPlan } from './company-plan.entity';
import { Plans } from '../plans/plan.entity';
import { Companies } from '../companies/companies.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyPlan, Plans, Companies])],
  controllers: [CompanyPlanController],
  providers: [CompanyPlanService, AuthGuard, JwtService],
})
export class CompanyPlanModule {}
