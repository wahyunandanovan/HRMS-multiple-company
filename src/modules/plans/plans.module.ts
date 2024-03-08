import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plans } from './plan.entity';
import { PlansController } from './plans.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Plans])],
  providers: [PlansService, JwtService],
  controllers: [PlansController],
})
export class PlansModule {}
