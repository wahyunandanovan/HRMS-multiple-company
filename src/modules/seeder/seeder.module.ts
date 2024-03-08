import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { PlansService } from '../plans/plans.service';
import { Plans } from '../plans/plan.entity';

@Module({
  controllers: [SeederController],
  imports: [TypeOrmModule.forFeature([Users, Plans])],
  providers: [UsersService, PlansService],
})
export class SeederModule {}
