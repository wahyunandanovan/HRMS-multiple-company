import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './role.enum';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username' })
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  username: string;

  @ApiProperty({ description: 'User Role' })
  @IsNotEmpty({ message: 'Role tidak boleh kosong' })
  role: UserRole;

  @ApiProperty({ description: 'Email' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(6, { message: 'Password harus memiliki minimal 6 karakter' })
  password: string;
}

export class UpdateUserDto extends CreateUserDto {}
