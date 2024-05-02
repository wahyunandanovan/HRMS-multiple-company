import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salaries } from './salaries.entity';
import { CreateSalaryDto, UpdateSalaryDto } from './salaries.dto';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { SalariesPaginateConfig } from './salaries.paginate.config';
import { Employees } from '../employees/employees.entity';

@Injectable()
export class SalariesService {
  constructor(
    @InjectRepository(Salaries)
    private readonly salariesRepository: Repository<Salaries>,

    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,
  ) {}

  async findAll(
    companyId: string,
    query: PaginateQuery,
  ): Promise<Paginated<Salaries>> {
    return paginate(query, this.salariesRepository, {
      ...SalariesPaginateConfig,
      where: { company_id: companyId },
    });
  }

  async findById(companyId: string, id: string): Promise<Salaries | undefined> {
    return this.salariesRepository.findOne({
      where: { company_id: companyId, id },
    });
  }

  async create(companyId: string, salary: CreateSalaryDto): Promise<Salaries> {
    await this.checkEmployee(salary.employee_id, companyId);
    const newSalary = this.salariesRepository.create({
      ...salary,
      company_id: companyId,
    });

    return this.salariesRepository.save(newSalary);
  }

  async update(
    companyId: string,
    id: string,
    updateSalary: UpdateSalaryDto,
  ): Promise<Salaries> {
    const existingSalary = await this.findById(companyId, id);

    if (!existingSalary) {
      throw new NotFoundException(`Salary dengan id ${id} tidak ditemukan`);
    }
    await this.checkEmployee(updateSalary['employee_id'], companyId);

    Object.assign(existingSalary, updateSalary);

    return this.salariesRepository.save(existingSalary);
  }

  async delete(companyId: string, id: string): Promise<void> {
    const existingSalary = await this.findById(companyId, id);

    if (!existingSalary) {
      throw new NotFoundException(`Salary dengan id ${id} tidak ditemukan`);
    }

    await this.salariesRepository.remove(existingSalary);
  }

  async checkEmployee(id: string, companyId: string) {
    if (id) {
      const employee = await this.employeeRepository.findOne({
        where: { id },
      });
      if (!employee) {
        throw new NotFoundException(`Karyawan dengan id ${id} tidak ditemukan`);
      }
      if (employee.company_id !== companyId) {
        throw new NotFoundException(
          `Karyawan ${employee.full_name} tidak terdaftar di perusahaan`,
        );
      }
      return employee;
    }
    return;
  }
}
