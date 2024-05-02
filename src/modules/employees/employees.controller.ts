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
import { EmployeesService } from './employees.service';
import { Employees } from './employees.entity';
import { EmployeesPaginateConfig } from './employees.paginate.config';
import {
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employees.dto';

@ApiTags('employees')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('company/:companyId/employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get()
  @ApiPaginationQuery(EmployeesPaginateConfig)
  async findAll(
    @Param('companyId') companyId: string,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Employees>> {
    return this.employeeService.findAll(companyId, query);
  }

  @Get(':id')
  async findOne(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ): Promise<Employees> {
    return this.employeeService.findById(companyId, id);
  }

  @Post()
  @ApiBody({ type: CreateEmployeeDto })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PIAWAY_ADMIN)
  async create(
    @Param('companyId') companyId: string,
    @Body() body: CreateEmployeeDto,
  ): Promise<Employees> {
    return this.employeeService.create(companyId, body);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateEmployeeDto })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PIAWAY_ADMIN)
  async update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() body: UpdateEmployeeDto,
  ): Promise<Employees> {
    return this.employeeService.update(companyId, id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PIAWAY_ADMIN)
  async delete(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return this.employeeService.delete(companyId, id);
  }
}
