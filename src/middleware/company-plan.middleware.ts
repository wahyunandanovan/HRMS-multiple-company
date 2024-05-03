import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { CompanyPlan } from 'src/modules/company-plan/company-plan.entity';
import { Employees } from 'src/modules/employees/employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyPlanMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(CompanyPlan)
    private repository: Repository<CompanyPlan>,

    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { companyId } = req.params;
    const { method, path } = req;

    if (companyId) {
      const plan = await this.repository.findOne({
        where: { company_id: companyId, is_active: true },
      });

      if (!plan) {
        throw new NotFoundException(
          'Tidak ada rencana perusahaan yang ditemukan',
        );
      }

      const currentDate = new Date();
      if (plan.end_date && plan.end_date < currentDate) {
        throw new ForbiddenException('Plan perusahaan telah berakhir');
      }

      if (
        method === 'POST' &&
        path === `/api/v1/company/${companyId}/employees`
      ) {
        await this.checkEmployeeLimit(companyId, plan);
      }
    }

    next();
  }

  private async checkEmployeeLimit(
    companyId: string,
    plan: CompanyPlan,
  ): Promise<void> {
    const employeeCount = await this.employeeRepository.count({
      where: { company_id: companyId },
    });

    if (plan.max_employee && plan.max_employee <= employeeCount) {
      throw new ForbiddenException(
        'Jumlah karyawan telah mencapai batas maksimum',
      );
    }
  }
}
