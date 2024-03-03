import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salaries } from './salaries.entity';
import { SalariesService } from './salaries.service';
import { SalariesController } from './salaries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Salaries])],
  providers: [SalariesService],
  controllers: [SalariesController],
})
export class SalariesModule {}
