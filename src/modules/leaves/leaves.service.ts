import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leaves } from './leaves.entity';
import { CreateLeaveDto, UpdateLeaveDto } from './leaves.dto';
import { Employees } from '../employees/employees.entity';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { LeavePaginateConfig } from './leave.paginate.config';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Leaves)
    private readonly leavesRepository: Repository<Leaves>,
    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,
  ) {}

  async findAll(
    companyId: string,
    query: PaginateQuery,
  ): Promise<Paginated<Leaves>> {
    return paginate(query, this.leavesRepository, {
      ...LeavePaginateConfig,
      where: { company_id: companyId },
    });
  }

  async findOneByCompanyId(
    companyId: string,
    id: string,
  ): Promise<Leaves | undefined> {
    return this.leavesRepository.findOne({
      where: { company_id: companyId, id },
    });
  }

  async create(companyId: string, body: CreateLeaveDto): Promise<Leaves> {
    await this.checkEmployee(body.employee_id, companyId);
    const newLeave = await this.leavesRepository.create({
      ...body,
      company_id: companyId,
    });

    return this.leavesRepository.save(newLeave);
  }

  async update(
    companyId: string,
    id: string,
    body: UpdateLeaveDto,
  ): Promise<Leaves> {
    const existingLeave = await this.findOneByCompanyId(companyId, id);

    if (!existingLeave) {
      throw new NotFoundException(`Leave dengan id ${id} tidak ditemukan`);
    }

    await this.checkEmployee(body.employee_id, companyId);

    Object.assign(existingLeave, body);

    return this.leavesRepository.save(existingLeave);
  }

  async delete(companyId: string, id: string): Promise<any> {
    const existingLeave = await this.findOneByCompanyId(companyId, id);

    if (!existingLeave) {
      throw new NotFoundException(`Leave dengan id ${id} tidak ditemukan`);
    }

    await this.leavesRepository.remove(existingLeave);
    return { message: 'Berhasil dihapus' };
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
