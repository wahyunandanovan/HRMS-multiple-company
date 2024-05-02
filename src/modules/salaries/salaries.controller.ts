import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SalariesService } from './salaries.service';
import { Salaries } from './salaries.entity';
import { CreateSalaryDto, UpdateSalaryDto } from './salaries.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { SalariesPaginateConfig } from './salaries.paginate.config';
import {
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';

@ApiTags('salaries')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('company/:companyId/salaries')
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) {}

  @Get()
  @ApiPaginationQuery(SalariesPaginateConfig)
  async findAll(
    @Param('companyId') companyId: string,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Salaries>> {
    return this.salariesService.findAll(companyId, query);
  }

  @Get(':id')
  async findOne(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ): Promise<Salaries> {
    return this.salariesService.findById(companyId, id);
  }

  @Post()
  async create(
    @Param('companyId') companyId: string,
    @Body() createSalaryDto: CreateSalaryDto,
  ): Promise<Salaries> {
    return this.salariesService.create(companyId, createSalaryDto);
  }

  @Patch(':id')
  async update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() updateSalaryDto: UpdateSalaryDto,
  ): Promise<Salaries> {
    return this.salariesService.update(companyId, id, updateSalaryDto);
  }

  @Delete(':id')
  async delete(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.salariesService.delete(companyId, id);
  }
}
