import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { Users } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Users | null> {
    //  const user = await this.usersService.findByUsername(username);

    //  if (user && (await compare(password, user.password))) {
    //    return user;
    //  }

    return null;
  }
}
