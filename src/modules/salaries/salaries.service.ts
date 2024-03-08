import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salaries } from './salaries.entity';
import { CreateSalaryDto, UpdateSalaryDto } from './salaries.dto';

@Injectable()
export class SalariesService {
  constructor(
    @InjectRepository(Salaries)
    private readonly salariesRepository: Repository<Salaries>,
  ) {}

  async findAll(): Promise<Salaries[]> {
    return this.salariesRepository.find();
  }

  async findById(id: string): Promise<Salaries | undefined> {
    return this.salariesRepository.findOne({ where: { id } });
  }

  async create(salary: CreateSalaryDto): Promise<Salaries> {
    const newSalary = this.salariesRepository.create(salary);

    return this.salariesRepository.save(newSalary);
  }

  async update(id: string, updateSalary: UpdateSalaryDto): Promise<Salaries> {
    const existingSalary = await this.findById(id);

    if (!existingSalary) {
      throw new NotFoundException('Salary not found');
    }

    Object.assign(existingSalary, updateSalary);

    return this.salariesRepository.save(existingSalary);
  }

  async delete(id: string): Promise<void> {
    const existingSalary = await this.findById(id);

    if (!existingSalary) {
      throw new NotFoundException('Salary not found');
    }

    await this.salariesRepository.remove(existingSalary);
  }
}
