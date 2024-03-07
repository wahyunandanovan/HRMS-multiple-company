import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiPaginationQuery(UserPaginateConfig)
  public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Users>> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Users> {
    return this.userService.findById(id);
  }

  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() body: CreateUserDto): Promise<Users> {
    return this.userService.create(body);
  }

  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<Users> {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }

  @Post('/seed')
  async seed(): Promise<Users[]> {
    return await this.userService.seed();
  }
}
