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
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../guards/roles.decorator';
import { UserRole } from '../users/role.enum';
import { DepartmentsService } from './departments.service';
import { Departments } from './departments.entity';
import { CreateDepartmentDto, UpdateDepartmentDto } from './departments.dto';

@ApiTags('departments')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('company/:companyId/departments')
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentsService) {}

  @Get()
  async findAll(@Param('companyId') companyId: string): Promise<Departments[]> {
    return this.departmentService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ): Promise<Departments> {
    return this.departmentService.findById(companyId, id);
  }

  @Post()
  @ApiBody({ type: CreateDepartmentDto })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PIAWAY_ADMIN)
  async create(
    @Param('companyId') companyId: string,
    @Body() body: CreateDepartmentDto,
  ): Promise<Departments> {
    return this.departmentService.create(companyId, body);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateDepartmentDto })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PIAWAY_ADMIN)
  async update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() body: UpdateDepartmentDto,
  ): Promise<Departments> {
    return this.departmentService.update(companyId, id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PIAWAY_ADMIN)
  async delete(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return this.departmentService.delete(companyId, id);
  }
}
