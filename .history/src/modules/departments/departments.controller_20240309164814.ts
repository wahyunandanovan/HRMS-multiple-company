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
import { DepartmentsService } from './departments.service';
import { Departments } from './departments.entity';
import { CreateDepartmentDto, UpdateDepartmentDto } from './departments.dto';

@ApiTags('departments')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async findAll(): Promise<Departments[]> {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Departments> {
    return this.departmentsService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateDepartmentDto })
  async create(@Body() body: CreateDepartmentDto): Promise<Departments> {
    return this.departmentsService.create(body);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateDepartmentDto })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateDepartmentDto,
  ): Promise<Departments> {
    return this.departmentsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.departmentsService.delete(id);
  }
}
