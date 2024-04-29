import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyPlan } from './company-plan.entity';
import { CreateCompanyPlanDto, UpdateCompanyPlanDto } from './company-plan.dto';
import { Plans } from '../plans/plan.entity';
import { Companies } from '../companies/companies.entity';

@Injectable()
export class CompanyPlanService {
  constructor(
    @InjectRepository(Plans)
    private readonly planRepository: Repository<Plans>,
    @InjectRepository(CompanyPlan)
    private readonly companyPlanRepository: Repository<CompanyPlan>,
    @InjectRepository(Companies)
    private readonly companyRepository: Repository<Companies>,
  ) {}

  async findAll(): Promise<CompanyPlan[] | any> {
    const data = await this.companyPlanRepository.find();
    return { data };
  }

  async findById(id: string): Promise<CompanyPlan | undefined> {
    return this.companyPlanRepository.findOne({ where: { id } });
  }

  async create(body: CreateCompanyPlanDto): Promise<CompanyPlan> {
    const company = await this.companyRepository.findOne({
      where: { id: body.company_id },
    });
    const plan: Plans = await this.planRepository.findOne({
      where: { id: body.reference_plan_id },
    });

    if (!plan) {
      throw new NotFoundException(
        `Plan dengan id ${body.reference_plan_id} tidak ditemukan`,
      );
    }
    if (!company) {
      throw new NotFoundException(
        `Perusahaan dengan id ${body.reference_plan_id} tidak ditemukan`,
      );
    }
    const newbody = this.companyPlanRepository.create({
      ...body,
      price: plan.price,
      max_employee: plan.max_employee,
      description: plan.description || '',
    });

    return this.companyPlanRepository.save(newbody);
  }

  async update(
    id: string,
    updateCompanyPlan: UpdateCompanyPlanDto,
  ): Promise<CompanyPlan> {
    const existingCompanyPlan = await this.findById(id);

    if (!existingCompanyPlan) {
      throw new NotFoundException(`Company plan dengan ${id} tidak ditemukan`);
    }

    Object.assign(existingCompanyPlan, updateCompanyPlan);

    return this.companyPlanRepository.save(existingCompanyPlan);
  }

  async delete(id: string): Promise<void> {
    const existingCompanyPlan = await this.findById(id);

    if (!existingCompanyPlan) {
      throw new NotFoundException(`Company plan dengan ${id} tidak ditemukan`);
    }

    await this.companyPlanRepository.remove(existingCompanyPlan);
  }
}
