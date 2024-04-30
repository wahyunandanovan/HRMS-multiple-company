import {
  ConflictException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Companies } from './companies.entity';
import { Plans } from '../plans/plan.entity';
import { CreateCompanyDto } from './companies.dto';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { companyPaginateConfig } from './companies.paginate.config';
import { Users } from '../users/users.entity';
import { CompanyPlan } from '../company-plan/company-plan.entity';
import { CompanyPlanService } from '../company-plan/company-plan.service';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);
  constructor(
    @InjectRepository(Companies)
    private readonly companiesRepository: Repository<Companies>,

    @InjectRepository(Plans)
    private readonly planRepository: Repository<Plans>,

    @InjectRepository(CompanyPlan)
    private readonly companyPlanRepository: Repository<CompanyPlan>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    private readonly companyPlanService: CompanyPlanService,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Companies>> {
    return paginate(query, this.companiesRepository, companyPaginateConfig);
  }

  async findById(id: string): Promise<Companies | undefined> {
    const company = await this.companiesRepository.findOne({
      where: { id },
      relations: ['user', 'plan'],
    });
    if (!company) {
      throw new NotFoundException(`Perusahaan dengan id ${id} tidak ditemukan`);
    }
    return company;
  }

  async create(company: Partial<CreateCompanyDto>): Promise<Companies | any> {
    const existingCompany = await this.companiesRepository.findOne({
      where: { company_name: company.company_name },
    });

    const existingUser = await this.userRepository.findOne({
      where: { id: company.user_id },
    });

    if (existingCompany) {
      throw new ConflictException('Nama perusahaan sudah digunakan.');
    }

    if (!existingUser) {
      throw new ConflictException(
        `Pengguna dengan id ${company.user_id} tidak ditemukan`,
      );
    }

    if (company.company_plan_id) {
      throw new NotAcceptableException(
        'Tidak di perbolehkan merubah company_plan_id',
      );
    }

    const newCompany = this.companiesRepository.create(company);
    newCompany.generateCode();
    const savedCompany = await this.companiesRepository.save(newCompany);

    return { ...savedCompany, user: existingUser };
  }

  async update(
    id: string,
    updateCompany: Partial<Companies>,
  ): Promise<Companies> {
    const existingCompany = await this.findById(id);

    if (!existingCompany) {
      throw new NotFoundException('Perusahaan tidak ditemukan');
    }

    if (updateCompany.company_plan_id) {
      throw new NotAcceptableException(
        'Tidak di perbolehkan merubah company_plan_id',
      );
    }

    Object.assign(existingCompany, updateCompany);

    return await this.companiesRepository.save(existingCompany);
  }

  async delete(id: string): Promise<object> {
    const existingCompany = await this.findById(id);

    if (!existingCompany) {
      throw new NotFoundException('Perusahaan tidak ditemukan');
    }
    await this.companiesRepository.remove(existingCompany);
    return { statusCode: 200, message: 'Berhasil menghapus perusahaan' };
  }

  async changePlan(
    companyId: string,
    selectedPlanId: string,
    body: string | any,
  ): Promise<CompanyPlan> {
    const company = await this.companiesRepository.findOne({
      where: { id: companyId },
    });

    const selectedPlan = await this.planRepository.findOne({
      where: { id: selectedPlanId },
    });

    if (!company) {
      throw new NotFoundException(`Perusahaan tidak ditemukan`);
    }

    if (!selectedPlan) {
      throw new NotFoundException('Plan baru tidak ditemukan');
    }

    if (selectedPlan.price === 0) {
      throw new NotAcceptableException('Tidak dapat mengubah ke plan gratis');
    }

    await this.deactivatePlan(company.company_plan_id);
    const newCompanyPlan = await this.companyPlanService.create({
      reference_plan_id: selectedPlanId,
      company_id: companyId,
      start_date: new Date(),
      end_date: body?.endDate,
      is_active: true,
    });

    company.company_plan_id = newCompanyPlan.id;

    await this.companiesRepository.save(company);
    return newCompanyPlan;
  }

  async deactivatePlan(companyPlanId: string): Promise<void> {
    const companyPlan = await this.companyPlanRepository.findOne({
      where: { id: companyPlanId, is_active: true },
    });

    if (companyPlan) {
      companyPlan.is_active = false;
      await this.companyPlanRepository.save(companyPlan);
    }
  }

  async updateExpiredPlanStatus(): Promise<void> {
    //   const currentDate = new Date();
    //   const companiesToUpdate = await this.companiesRepository.find({
    //     where: {
    //       plan_status: CompanyPlanStatus.ONGOING,
    //       plan_end_date: LessThanOrEqual(currentDate),
    //     },
    //   });
    //   if (companiesToUpdate.length) {
    //     this.logger.log(
    //       `Scheduler : ${companiesToUpdate.length} Company expired.`,
    //     );
    //   } else {
    //     this.logger.log(`Scheduler : Nothing experied company`);
    //   }

    //   for (const company of companiesToUpdate) {
    //     company.plan_status = CompanyPlanStatus.EXPIRED;
    //     await this.companiesRepository.save(company);
    //   }
    // }
    return null;
  }
}
