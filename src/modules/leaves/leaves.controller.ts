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
import { LeavesService } from './leaves.service';
import { Leaves } from './leaves.entity';
import { CreateLeaveDto, UpdateLeaveDto } from './leaves.dto';
import { LeaveType } from './leaves.enum';

@ApiTags('leaves')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Get()
  async findAll(): Promise<Leaves[]> {
    return this.leavesService.findAll();
  }

  @Get('/leave-type')
  getAllLeaveTypes(): string[] {
    const leaveTypes = Object.values(LeaveType).filter(
      (value) => typeof value === 'string',
    ) as string[];
    return leaveTypes;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Leaves> {
    return this.leavesService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateLeaveDto })
  async create(@Body() body: CreateLeaveDto): Promise<Leaves> {
    return this.leavesService.create(body);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateLeaveDto })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateLeaveDto,
  ): Promise<Leaves> {
    return this.leavesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.leavesService.delete(id);
  }
}
