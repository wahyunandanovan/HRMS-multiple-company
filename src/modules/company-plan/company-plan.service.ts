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

  async findAll(companyId: string): Promise<CompanyPlan[] | any> {
    const data = await this.companyPlanRepository.find({
      where: { company_id: companyId },
    });
    return { data };
  }

  async findById(
    companyId: string,
    id: string,
  ): Promise<CompanyPlan | undefined> {
    return this.companyPlanRepository.findOne({
      where: { id, company_id: companyId },
    });
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
    companyId: string,
    id: string,
    updateCompanyPlan: UpdateCompanyPlanDto,
  ): Promise<CompanyPlan> {
    const existingCompanyPlan = await this.findById(companyId, id);

    if (!existingCompanyPlan) {
      throw new NotFoundException(`Company plan dengan ${id} tidak ditemukan`);
    }

    Object.assign(existingCompanyPlan, updateCompanyPlan);

    return this.companyPlanRepository.save(existingCompanyPlan);
  }

  async delete(companyId: string, id: string): Promise<any> {
    const existingCompanyPlan = await this.findById(companyId, id);

    if (!existingCompanyPlan) {
      throw new NotFoundException(`Company plan dengan ${id} tidak ditemukan`);
    }

    await this.companyPlanRepository.remove(existingCompanyPlan);
    return { message: 'Berhasil dihapus!' };
  }
}
