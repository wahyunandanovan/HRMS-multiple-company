import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Companies } from './companies.entity';
import { CompanyPlanStatus } from './companies.enum';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);
  constructor(
    @InjectRepository(Companies)
    private readonly companiesRepository: Repository<Companies>,
  ) {}

  async findAll(): Promise<Companies[]> {
    return await this.companiesRepository.find();
  }

  async findById(id: string): Promise<Companies | undefined> {
    return await this.companiesRepository.findOne({
      where: { id },
      relations: ['departments', 'users'],
    });
  }

  async create(company: Partial<Companies>): Promise<Companies> {
    const newCompany = this.companiesRepository.create(company);
    return await this.companiesRepository.save(newCompany);
  }

  async update(
    id: string,
    updateCompany: Partial<Companies>,
  ): Promise<Companies> {
    const existingCompany = await this.findById(id);

    if (!existingCompany) {
      throw new NotFoundException('Company not found');
    }

    Object.assign(existingCompany, updateCompany);

    return await this.companiesRepository.save(existingCompany);
  }

  async delete(id: string): Promise<void> {
    const existingCompany = await this.findById(id);

    if (!existingCompany) {
      throw new NotFoundException('Company not found');
    }

    await this.companiesRepository.remove(existingCompany);
  }

  async updateExpiredPlanStatus(): Promise<void> {
    const currentDate = new Date();
    const companiesToUpdate = await this.companiesRepository.find({
      where: {
        plan_status: CompanyPlanStatus.ONGOING,
        plan_end_date: LessThanOrEqual(currentDate),
      },
    });
    if (companiesToUpdate.length) {
      this.logger.log(
        `Scheduler : ${companiesToUpdate.length} Company expired.`,
      );
    } else {
      this.logger.log(`Scheduler : Nothing experied company`);
    }

    for (const company of companiesToUpdate) {
      company.plan_status = CompanyPlanStatus.EXPIRED;
      await this.companiesRepository.save(company);
    }
  }
}
