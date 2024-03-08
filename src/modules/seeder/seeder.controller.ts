import { Controller, Post } from '@nestjs/common';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { Plans } from '../plans/plan.entity';
import { PlansService } from '../plans/plans.service';

@Controller('seeder')
@ApiTags('seeder')
export class SeederController {
  constructor(
    private readonly userService: UsersService,
    private readonly plansService: PlansService,
  ) {}

  @Post('/users')
  async seedUser(): Promise<Users[]> {
    return await this.userService.seed();
  }
  @Post('/plans')
  async seedPlans(): Promise<Plans[]> {
    return await this.plansService.seed();
  }
}
