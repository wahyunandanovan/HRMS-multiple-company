import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './role.enum';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username' })
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  username: string;

  @ApiProperty({
    description: 'User Role',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
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

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  image: string;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'Username' })
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @IsOptional()
  username: string;

  @ApiProperty({
    description: 'User Role',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  @IsNotEmpty({ message: 'Role tidak boleh kosong' })
  @IsOptional()
  role: UserRole;

  @ApiProperty({ description: 'Email' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(6, { message: 'Password harus memiliki minimal 6 karakter' })
  @IsOptional()
  password: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  image: string;
}
