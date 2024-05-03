import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaves } from './leaves.entity';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { Employees } from '../employees/employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leaves, Employees])],
  providers: [LeavesService],
  controllers: [LeavesController],
})
export class LeavesModule {}
