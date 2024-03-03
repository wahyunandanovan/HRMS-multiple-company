import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { UserPaginateConfig } from './user.paginate.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<Users>> {
    return paginate(query, this.usersRepository, UserPaginateConfig);
  }
}
