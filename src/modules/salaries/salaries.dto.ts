import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsOptional,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalaryDto {
  @ApiProperty({ description: 'Jumlah Gaji', example: 4100000 })
  @IsNotEmpty({ message: 'Jumlah gaji tidak boleh kosong' })
  @IsNumber({}, { message: 'Jumlah gaji harus berupa angka' })
  amount: number;

  @ApiProperty({
    description: 'Employee ID',
  })
  @IsNotEmpty({ message: 'Employee ID tidak boleh kosong' })
  @IsUUID('4', { message: 'Employee ID harus UUID versi 4' })
  employee_id: string;

  @ApiProperty({ description: 'Tanggal Pembayaran', example: '2024-03-08' })
  @IsNotEmpty({ message: 'Tanggal pembayaran tidak boleh kosong' })
  @IsDate({ message: 'Format tanggal tidak valid' })
  payment_date: Date;

  @ApiProperty({ description: 'Nama File Gambar' })
  @IsOptional()
  @IsUrl({}, { message: 'Gambar harus berupa URL' })
  image: string;

  @ApiProperty({
    description: 'Detail Perhitungan',
  })
  @IsOptional()
  calculation_details: string;
}

export class UpdateSalaryDto {
  @ApiProperty({
    description: 'Employee ID',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Employee ID tidak boleh kosong' })
  @IsUUID('4', { message: 'Employee ID harus UUID versi 4' })
  employee_id: string;

  @ApiProperty({ description: 'Jumlah Gaji', example: 4100000 })
  @IsNumber({}, { message: 'Jumlah gaji harus berupa angka' })
  @IsOptional()
  amount: number;

  @ApiProperty({ description: 'Tanggal Pembayaran', example: '2024-03-08' })
  @IsDate({ message: 'Format tanggal tidak valid' })
  @IsOptional()
  payment_date: Date;

  @ApiProperty({ description: 'Nama File Gambar' })
  @IsUrl({}, { message: 'Gambar harus berupa URL' })
  @IsOptional()
  image: string;

  @ApiProperty({
    description: 'Detail Perhitungan',
  })
  @IsOptional()
  calculation_details: string;
}
