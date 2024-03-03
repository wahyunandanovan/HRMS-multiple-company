import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';
import { Users } from './users.entity';
import { UserPaginateConfig } from './user.paginate.config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiPaginationQuery(UserPaginateConfig)
  public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Users>> {
    return this.userService.findAll(query);
  }
}
