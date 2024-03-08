import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Departments[]> {
    return this.departmentRepository.find();
  }

  async findById(id: string): Promise<Departments | undefined> {
    return this.departmentRepository.findOne({ where: { id } });
  }

  async create(department: CreateDepartmentDto): Promise<Departments> {
    const newDepartment = this.departmentRepository.create(department);

    return this.departmentRepository.save(newDepartment);
  }

  async update(
    id: string,
    updateDepartment: UpdateDepartmentDto,
  ): Promise<Departments> {
    const existingDepartment = await this.findById(id);

    if (!existingDepartment) {
      throw new NotFoundException('Department not found');
    }

    Object.assign(existingDepartment, updateDepartment);

    return this.departmentRepository.save(existingDepartment);
  }

  async delete(id: string): Promise<void> {
    const existingDepartment = await this.findById(id);

    if (!existingDepartment) {
      throw new NotFoundException('Department not found');
    }

    await this.departmentRepository.remove(existingDepartment);
  }
}
