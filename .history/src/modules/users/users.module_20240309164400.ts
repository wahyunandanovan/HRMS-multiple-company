import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../../helper/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, JwtService, AuthGuard],
})
export class UsersModule {}
