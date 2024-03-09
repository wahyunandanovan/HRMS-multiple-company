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
import { SalariesService } from './salaries.service';
import { Salaries } from './salaries.entity';
import { CreateSalaryDto, UpdateSalaryDto } from './salaries.dto';

@ApiTags('salaries')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('salaries')
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) {}

  @Get()
  async findAll(): Promise<Salaries[]> {
    return this.salariesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Salaries> {
    return this.salariesService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateSalaryDto })
  async create(@Body() body: CreateSalaryDto): Promise<Salaries> {
    return this.salariesService.create(body);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateSalaryDto })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateSalaryDto,
  ): Promise<Salaries> {
    return this.salariesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.salariesService.delete(id);
  }
}
