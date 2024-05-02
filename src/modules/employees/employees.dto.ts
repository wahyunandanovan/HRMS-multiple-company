import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Nama lengkap' })
  @IsNotEmpty({ message: 'Nama lengkap tidak boleh kosong' })
  @IsString({ message: 'Nama lengkap harus berupa teks' })
  full_name: string;

  @ApiProperty({ description: 'Gambar profil', required: false })
  @IsOptional()
  @IsUrl({}, { message: 'Gambar harus berupa URL' })
  image: string;

  @ApiProperty({ description: 'Email', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'Format email tidak sesuai' })
  email: string;

  @ApiProperty({ description: 'Nomor telepon', required: false })
  @IsOptional()
  @IsString({ message: 'Nomor telepon harus berupa teks' })
  phone_number: string;

  @ApiProperty({ description: 'Alamat', required: false })
  @IsOptional()
  @IsString({ message: 'Alamat harus berupa teks' })
  address: string;

  @ApiProperty({ description: 'ID Departemen', required: false })
  @IsOptional()
  @IsUUID('4', { message: 'ID Departemen harus berupa UUID v4' })
  department_id: string;
}

export class UpdateEmployeeDto {
  @ApiProperty({ description: 'Nama lengkap' })
  @IsOptional()
  @IsString({ message: 'Nama lengkap harus berupa teks' })
  full_name: string;

  @ApiProperty({ description: 'Gambar profil', required: false })
  @IsOptional()
  @IsUrl({}, { message: 'Gambar harus berupa URL' })
  image: string;

  @ApiProperty({ description: 'Email', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'Format email tidak sesuai' })
  email: string;

  @ApiProperty({ description: 'Nomor telepon', required: false })
  @IsOptional()
  @IsPhoneNumber('ID', { message: 'Format nomor telepon tidak sesuai' })
  phone_number: string;

  @ApiProperty({ description: 'Alamat', required: false })
  @IsOptional()
  @IsString({ message: 'Alamat harus berupa teks' })
  address: string;

  @ApiProperty({ description: 'ID Departemen', required: false })
  @IsOptional()
  @IsUUID('4', { message: 'ID Departemen harus berupa UUID v4' })
  department_id: string;
}
