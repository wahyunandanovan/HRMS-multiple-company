import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { Employees } from './employees.entity';
import { EmployeesPaginateConfig } from './employees.paginate.config';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeesRepository: Repository<Employees>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<Employees>> {
    return paginate(query, this.employeesRepository, EmployeesPaginateConfig);
  }

  async findById(id: string): Promise<Employees | undefined> {
    return await this.employeesRepository.findOne({ where: { id } });
  }

  async create(employee: Partial<Employees>): Promise<Employees> {
    const newEmployee = this.employeesRepository.create(employee);
    return await this.employeesRepository.save(newEmployee);
  }

  async update(
    id: string,
    updateEmployee: Partial<Employees>,
  ): Promise<Employees> {
    const existingEmployee = await this.findById(id);

    if (!existingEmployee) {
      throw new NotFoundException('Karyawan tidak ditemukan');
    }

    Object.assign(existingEmployee, updateEmployee);

    return await this.employeesRepository.save(existingEmployee);
  }

  async delete(id: string): Promise<void> {
    const existingEmployee = await this.findById(id);

    if (!existingEmployee) {
      throw new NotFoundException('Karyawan tidak ditemukan');
    }

    await this.employeesRepository.remove(existingEmployee);
  }
}
