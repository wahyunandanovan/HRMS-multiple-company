import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Employees } from './employees.entity';
import { EmployeesPaginateConfig } from './employees.paginate.config';
import { Departments } from '../departments/departments.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,
    @InjectRepository(Departments)
    private readonly departmentRepository: Repository<Departments>,
  ) {}

  public findAll(
    companyId: string,
    query: PaginateQuery,
  ): Promise<Paginated<Employees>> {
    return paginate(query, this.employeeRepository, {
      ...EmployeesPaginateConfig,
      where: { company_id: companyId },
    });
  }

  async findById(
    companyId: string,
    id: string,
  ): Promise<Employees | undefined> {
    return await this.employeeRepository.findOne({
      where: { company_id: companyId, id },
    });
  }

  async create(
    companyId: string,
    employeeData: Partial<Employees>,
  ): Promise<Employees> {
    await this.checkDepartment(employeeData.department_id, companyId);
    const newEmployee = await this.employeeRepository.create({
      ...employeeData,
      company_id: companyId,
    });
    return await this.employeeRepository.save(newEmployee);
  }

  async update(
    companyId: string,
    id: string,
    updateEmployeeData: Partial<Employees>,
  ): Promise<Employees> {
    const existingEmployee = await this.findById(companyId, id);

    if (!existingEmployee) {
      throw new NotFoundException(`Karyawan dengan id ${id} tidak ditemukan`);
    }
    await this.checkDepartment(updateEmployeeData.department_id, companyId);

    Object.assign(existingEmployee, updateEmployeeData);

    return await this.employeeRepository.save(existingEmployee);
  }

  async delete(companyId: string, id: string): Promise<{ message: string }> {
    const existingEmployee = await this.findById(companyId, id);

    if (!existingEmployee) {
      throw new NotFoundException(`Karyawan dengan id ${id} tidak ditemukan`);
    }

    await this.employeeRepository.remove(existingEmployee);
    return { message: 'Berhasil dihapus' };
  }

  async checkDepartment(id: string, companyId: string) {
    if (id) {
      const department = await this.departmentRepository.findOne({
        where: { id },
      });
      if (!department) {
        throw new NotFoundException(
          `Department dengan id ${id} tidak ditemukan`,
        );
      }
      if (department.company_id !== companyId) {
        throw new NotFoundException(
          `Department ${department.department_name} tidak ada di perusahaan`,
        );
      }
      return department;
    }
    return;
  }
}
