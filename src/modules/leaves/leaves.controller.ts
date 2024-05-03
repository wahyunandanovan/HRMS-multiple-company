import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateLeaveDto, UpdateLeaveDto } from './leaves.dto';
import { LeavePaginateConfig } from './leave.paginate.config';
import {
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';
import { Leaves } from './leaves.entity';

@ApiTags('leaves')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('company/:companyId/leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Get()
  @ApiPaginationQuery(LeavePaginateConfig)
  async findAll(
    @Param('companyId') companyId: string,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Leaves>> {
    return this.leavesService.findAll(companyId, query);
  }

  @Get(':id')
  async findOne(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
  ) {
    return this.leavesService.findOneByCompanyId(companyId, id);
  }

  @Post()
  async create(
    @Param('companyId') companyId: string,
    @Body() createLeaveDto: CreateLeaveDto,
  ) {
    return this.leavesService.create(companyId, createLeaveDto);
  }

  @Patch(':id')
  async update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() updateLeaveDto: UpdateLeaveDto,
  ) {
    return this.leavesService.update(companyId, id, updateLeaveDto);
  }

  @Delete(':id')
  async delete(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.leavesService.delete(companyId, id);
  }
}
