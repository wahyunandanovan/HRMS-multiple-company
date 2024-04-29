import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { CompanyPlanService } from './company-plan.service';
import { CompanyPlan } from './company-plan.entity';
import { CreateCompanyPlanDto, UpdateCompanyPlanDto } from './company-plan.dto';

@ApiTags('company-plan')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('company-plan')
export class CompanyPlanController {
  constructor(private readonly companyPlanService: CompanyPlanService) {}

  @Get()
  async findAll(): Promise<CompanyPlan[]> {
    return this.companyPlanService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CompanyPlan> {
    return this.companyPlanService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateCompanyPlanDto })
  async create(@Body() body: CreateCompanyPlanDto): Promise<CompanyPlan> {
    return this.companyPlanService.create(body);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCompanyPlanDto })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCompanyPlanDto,
  ): Promise<CompanyPlan> {
    return this.companyPlanService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.companyPlanService.delete(id);
  }
}
