import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../../guards/auth.guard';
import { Departments } from '../departments/departments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employees, Departments])],
  providers: [EmployeesService, JwtService, AuthGuard],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
