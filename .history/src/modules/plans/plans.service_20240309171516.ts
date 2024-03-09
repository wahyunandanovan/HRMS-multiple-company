import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plans } from './plan.entity';
import { CreatePlanDto, UpdatePlanDto } from './plan.dto';
import { QueryResponse } from 'src/helper/queryResponseTYpe';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plans)
    private readonly plansRepository: Repository<Plans>,
  ) {}

  async findAll(): Promise<QueryResponse<Plans[]>> {
    const plans = await this.plansRepository.find();
    return { data: plans };
  }

  async findById(id: string): Promise<Plans | undefined> {
    return this.plansRepository.findOne({
      where: { id },
      relations: ['company'],
    });
  }

  async create(plan: CreatePlanDto): Promise<Plans> {
    const newPlan = this.plansRepository.create(plan);

    return this.plansRepository.save(newPlan);
  }

  async update(id: string, updatePlan: UpdatePlanDto): Promise<Plans> {
    const existingPlan = await this.findById(id);

    if (!existingPlan) {
      throw new NotFoundException(`Plan dengan id ${id} tidak ditemukan`);
    }

    Object.assign(existingPlan, updatePlan);

    return this.plansRepository.save(existingPlan);
  }

  async delete(id: string): Promise<void> {
    const existingPlan = await this.findById(id);

    if (!existingPlan) {
      throw new NotFoundException(`Plan dengan id ${id} tidak ditemukan`);
    }

    await this.plansRepository.remove(existingPlan);
  }

  async seed(): Promise<any> {
    const planSeed: Partial<Plans>[] = [
      {
        name: 'Free Plan',
        description: 'Plan Gratis untuk mencoba aplikasi selama 7 hari',
        price: 0,
      },
      {
        name: 'Basic Plan',
        description: 'Plan Dasar untuk UMKM dengan 100 karyawan',
        price: 25000,
      },
      {
        name: 'Pro Plan',
        description: 'Plan Pro untuk UMKM dengan 200 karyawan',
        price: 50000,
      },
    ];

    const createdPlans: Plans[] = [];

    for (const plan of planSeed) {
      const existingPlan = await this.plansRepository.findOne({
        where: { name: plan.name },
      });

      if (!existingPlan) {
        const newPlan = this.plansRepository.create(plan);
        const savedPlan = await this.plansRepository.save(newPlan);
        createdPlans.push(savedPlan);
      }
    }

    const response = {
      message: `Total ${createdPlans.length} plan dibuat`,
      data: createdPlans,
    };

    return response;
  }
}
