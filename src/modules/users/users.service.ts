import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { UserPaginateConfig } from './user.paginate.config';
import { UserRole } from './role.enum';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<Users>> {
    return paginate(query, this.usersRepository, UserPaginateConfig);
  }

  async findById(id: string): Promise<Users | undefined> {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async findByUsername(username: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async create(user: Partial<Users>): Promise<Users> {
    const { email, username, role, password } = user;

    if (!Object.values(UserRole).includes(role)) {
      throw new ConflictException('Role tidak valid');
    }

    const existingEmailUser = await this.findByEmail(email);
    const existingUsernameUser = await this.findByUsername(username);

    if (existingEmailUser) {
      throw new ConflictException('Email sudah dipakai');
    }

    if (existingUsernameUser) {
      throw new ConflictException('Username sudah dipakai');
    }

    const hashedPassword = hashSync(password, 10);

    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    return await this.usersRepository.save(newUser);
  }

  async update(id: string, updateUser: Partial<Users>): Promise<Users> {
    const existingUser = await this.findById(id);

    if (updateUser.role && !Object.values(UserRole).includes(updateUser.role)) {
      throw new ConflictException('Role tidak valid');
    }

    if (!existingUser) {
      throw new NotFoundException('User tidak ditemukan');
    }

    if (updateUser.password) {
      updateUser.password = hashSync(updateUser.password, 10);
    }

    Object.assign(existingUser, updateUser);

    return await this.usersRepository.save(existingUser);
  }

  async delete(id: string): Promise<void> {
    const existingUser = await this.findById(id);

    if (!existingUser) {
      throw new NotFoundException('User tidak ditemukan');
    }

    await this.usersRepository.remove(existingUser);
  }

  async seed(): Promise<any> {
    const userSeed: Partial<Users>[] = [
      {
        username: 'wahyunandanovan',
        email: 'wahyunandanovan@gmail.com',
        role: UserRole.PIAWAY_ADMIN,
        password: hashSync('Novan19-02', 10),
      },
      {
        username: 'admin',
        email: 'admin@gmail.com',
        role: UserRole.ADMIN,
        password: hashSync('adminseed', 10),
      },
      {
        username: 'employee',
        email: 'employee@gmail.com',
        role: UserRole.EMPLOYEE,
        password: hashSync('employeeseed', 10),
      },
    ];

    const createdUsers: Users[] = [];

    for (const user of userSeed) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: user.email },
      });

      if (!existingUser) {
        const newUser = this.usersRepository.create(user);
        const savedUser = await this.usersRepository.save(newUser);
        createdUsers.push(savedUser);
      }
    }

    const response = {
      message: `Total ${createdUsers.length} user dibuat`,
      data: createdUsers,
    };

    return response;
  }
}
