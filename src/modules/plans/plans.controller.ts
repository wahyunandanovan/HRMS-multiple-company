import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../helper/auth.guard';
import { RolesGuard } from 'src/helper/roles.guard';
import { Roles } from 'src/helper/roles.decorator';
import { PlansService } from './plans.service';
import { Plans } from './plan.entity';
import { CreatePlanDto, UpdatePlanDto } from './plan.dto';
import { UserRole } from '../users/role.enum';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  async findAll(): Promise<Plans[]> {
    return this.plansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Plans> {
    return this.plansService.findById(id);
  }

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.PIAWAY_ADMIN)
  @ApiBody({ type: CreatePlanDto })
  async create(@Body() body: CreatePlanDto): Promise<Plans> {
    return this.plansService.create(body);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBody({ type: UpdatePlanDto })
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePlanDto,
  ): Promise<Plans> {
    return this.plansService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, RolesGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.plansService.delete(id);
  }
}
