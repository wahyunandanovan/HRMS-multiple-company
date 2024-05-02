import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { LoginDto } from './auth.dto';
import { UserRole } from '../users/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    const user = await this.usersService.create({
      username,
      password,
      email,
      role: UserRole.ADMIN,
    });

    const value = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    return {
      data: {
        message: 'Berhasil mendaftar!',
        access_token: this.jwtService.sign(value),
      },
    };
  }

  async login(body: LoginDto) {
    const { email, password } = body;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        `Pengguna dengan email ${email} tidak ditemukan!`,
      );
    }
    const isPasswordValid = await compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password salah!');
    }

    const jwtValue = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    return {
      data: {
        message: 'Berhasil masuk!',
        access_token: this.jwtService.sign(jwtValue),
      },
    };
  }
}
