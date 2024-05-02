import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto, UpdateDepartmentDto } from './departments.dto';
import { Departments } from './departments.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Departments)
    private readonly departmentRepository: Repository<Departments>,
  ) {}

  async findAll(companyId: string): Promise<Departments[]> {
    return this.departmentRepository.find({ where: { company_id: companyId } });
  }

  async findById(
    companyId: string,
    id: string,
  ): Promise<Departments | undefined> {
    return this.departmentRepository.findOne({
      where: { company_id: companyId, id },
    });
  }

  async create(
    companyId: string,
    department: CreateDepartmentDto,
  ): Promise<Departments> {
    const existingDepartmentName = await this.departmentRepository.findOne({
      where: {
        company_id: companyId,
        department_name: department.department_name,
      },
    });
    if (existingDepartmentName) {
      throw new ConflictException('Nama department sudah dipakai');
    }

    const newDepartment = this.departmentRepository.create({
      ...department,
      company_id: companyId,
    });

    return this.departmentRepository.save(newDepartment);
  }

  async update(
    companyId: string,
    id: string,
    updateDepartment: UpdateDepartmentDto,
  ): Promise<Departments> {
    const existingDepartment = await this.findById(companyId, id);
    const existingDepartmentName = await this.departmentRepository.findOne({
      where: {
        company_id: companyId,
        department_name: updateDepartment.department_name,
      },
    });

    if (!existingDepartment) {
      throw new NotFoundException(`Department dengan ${id} tidak ditemukan`);
    }

    if (existingDepartmentName) {
      throw new ConflictException('Nama department sudah dipakai');
    }

    Object.assign(existingDepartment, updateDepartment);

    return this.departmentRepository.save(existingDepartment);
  }

  async delete(companyId: string, id: string): Promise<{ message: string }> {
    const existingDepartment = await this.findById(companyId, id);

    if (!existingDepartment) {
      throw new NotFoundException(`Department dengan ${id} tidak ditemukan`);
    }

    await this.departmentRepository.remove(existingDepartment);
    return { message: 'Berhasil dihapus' };
  }
}
