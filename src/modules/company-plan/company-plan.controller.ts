import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { CompanyPlanService } from './company-plan.service';
import { CompanyPlan } from './company-plan.entity';
import { UpdateCompanyPlanDto } from './company-plan.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../guards/roles.decorator';
import { UserRole } from '../users/role.enum';

@ApiTags('company-plan')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('company/:companyId/plan')
export class CompanyPlanController {
  constructor(private readonly companyPlanService: CompanyPlanService) {}

  @Get()
  async findAll(@Param('companyId') companyId: string): Promise<CompanyPlan[]> {
    return this.companyPlanService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ): Promise<CompanyPlan> {
    return this.companyPlanService.findById(companyId, id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCompanyPlanDto })
  @UseGuards(RolesGuard)
  @Roles(UserRole.PIAWAY_ADMIN)
  async update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() body: UpdateCompanyPlanDto,
  ): Promise<CompanyPlan> {
    return this.companyPlanService.update(companyId, id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.PIAWAY_ADMIN)
  async delete(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ): Promise<CompanyPlan> {
    return this.companyPlanService.delete(companyId, id);
  }
}
