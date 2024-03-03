import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaves } from './leaves.entity';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Leaves])],
  providers: [LeavesService],
  controllers: [LeavesController],
})
export class LeavesModule {}
