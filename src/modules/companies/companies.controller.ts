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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { CompaniesService } from './companies.service';
import { Companies } from './companies.entity';
import {
  ChangePlanDto,
  CreateCompanyDto,
  UpdateCompanyDto,
} from './companies.dto';
import { companyPaginateConfig } from './companies.paginate.config';
import {
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';
import { CompanyPlan } from '../company-plan/company-plan.entity';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiPaginationQuery(companyPaginateConfig)
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Companies>> {
    return this.companiesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Companies> {
    return this.companiesService.findById(id);
  }

  @Post()
  async create(@Body() body: CreateCompanyDto): Promise<Companies> {
    return this.companiesService.create(body);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCompanyDto,
  ): Promise<Companies> {
    return this.companiesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<object> {
    return this.companiesService.delete(id);
  }

  @Patch(':id/change-plan/:planId')
  async changePlan(
    @Param('id') id: string,
    @Param('planId') planId: string,
    @Body() endDate: ChangePlanDto,
  ): Promise<CompanyPlan> {
    return this.companiesService.changePlan(id, planId, endDate);
  }
}
