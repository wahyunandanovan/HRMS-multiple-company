import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leaves } from './leaves.entity';
import { CreateLeaveDto, UpdateLeaveDto } from './leaves.dto';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Leaves)
    private readonly leavesRepository: Repository<Leaves>,
  ) {}

  async findAll(): Promise<Leaves[]> {
    return this.leavesRepository.find();
  }

  async findById(id: string): Promise<Leaves | undefined> {
    return this.leavesRepository.findOne({ where: { id } });
  }

  async create(leave: CreateLeaveDto): Promise<Leaves> {
    const newLeave = this.leavesRepository.create(leave);

    return this.leavesRepository.save(newLeave);
  }

  async update(id: string, updateLeave: UpdateLeaveDto): Promise<Leaves> {
    const existingLeave = await this.findById(id);

    if (!existingLeave) {
      throw new NotFoundException('Leave not found');
    }

    Object.assign(existingLeave, updateLeave);

    return this.leavesRepository.save(existingLeave);
  }

  async delete(id: string): Promise<void> {
    const existingLeave = await this.findById(id);

    if (!existingLeave) {
      throw new NotFoundException('Leave not found');
    }

    await this.leavesRepository.remove(existingLeave);
  }
}
