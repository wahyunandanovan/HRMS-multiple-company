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
import { AuthGuard } from '../../helper/auth.guard';
import { CompaniesService } from './companies.service';
import { Companies } from './companies.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async findAll(): Promise<Companies[]> {
    return this.companiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Companies> {
    return this.companiesService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateCompanyDto })
  async create(@Body() body: CreateCompanyDto): Promise<Companies> {
    return this.companiesService.create(body);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCompanyDto })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCompanyDto,
  ): Promise<Companies> {
    return this.companiesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.companiesService.delete(id);
  }
}
