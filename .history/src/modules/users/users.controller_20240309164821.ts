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
import { UsersService } from './users.service';
import {
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';
import { Users } from './users.entity';
import { UserPaginateConfig } from './user.paginate.config';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserRole } from './role.enum';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(UserRole.PIAWAY_ADMIN)
  @ApiPaginationQuery(UserPaginateConfig)
  public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Users>> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.PIAWAY_ADMIN)
  async findOne(@Param('id') id: string): Promise<Users> {
    return this.userService.findById(id);
  }

  @Post()
  @Roles(UserRole.PIAWAY_ADMIN)
  @ApiBody({ type: CreateUserDto })
  async create(@Body() body: CreateUserDto): Promise<Users> {
    return this.userService.create(body);
  }

  @Patch(':id')
  @Roles(UserRole.PIAWAY_ADMIN)
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<Users> {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @Roles(UserRole.PIAWAY_ADMIN)
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
