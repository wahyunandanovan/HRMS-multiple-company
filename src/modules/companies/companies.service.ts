import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Companies } from './companies.entity';
import { CompanyPlanStatus } from './companies.enum';
import { Plans } from '../plans/plan.entity';
import { CreateCompanyDto } from './companies.dto';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { companyPaginateConfig } from './companies.paginate.config';
import { Users } from '../users/users.entity';
import { unlink } from 'fs';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);
  constructor(
    @InjectRepository(Companies)
    private readonly companiesRepository: Repository<Companies>,

    @InjectRepository(Plans)
    private readonly planRepository: Repository<Plans>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
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

    const existingPlan = await this.planRepository.findOne({
      where: { id: company.plan_id },
    });

    const existingUser = await this.userRepository.findOne({
      where: { id: company.user_id },
    });

    if (existingCompany) {
      throw new ConflictException('Nama perusahaan sudah digunakan.');
    }

    if (!existingPlan) {
      throw new ConflictException(
        `Plan dengan id ${company.plan_id} tidak ditemukan`,
      );
    }

    if (!existingUser) {
      throw new ConflictException(
        `Pengguna dengan id ${company.user_id} tidak ditemukan`,
      );
    }

    const planEndDate = new Date();
    planEndDate.setDate(planEndDate.getDate() + 7);

    const companyData = {
      ...company,
      plan_id: existingPlan.id,
      plan_status: CompanyPlanStatus.ONGOING,
      plan_end_date: planEndDate,
    };

    const newCompany = this.companiesRepository.create(companyData);
    newCompany.generateCode();
    const results = await this.companiesRepository.save(newCompany);
    return { ...results, plan: existingPlan, user: existingUser };
  }

  async update(
    id: string,
    updateCompany: Partial<Companies>,
  ): Promise<Companies> {
    const existingCompany = await this.findById(id);

    if (!existingCompany) {
      throw new NotFoundException('Perusahaan tidak ditemukan');
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
