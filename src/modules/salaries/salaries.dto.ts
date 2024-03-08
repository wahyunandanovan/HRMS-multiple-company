import { IsNotEmpty, IsNumber, IsDate, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalaryDto {
  @ApiProperty({
    description: 'ID Karyawan',
  })
  @IsNotEmpty({ message: 'ID karyawan tidak boleh kosong' })
  @IsUUID('4', { message: 'ID karyawan harus berupa UUID versi 4' })
  employee_id: string;

  @ApiProperty({ description: 'Jumlah Gaji', example: 5000 })
  @IsNotEmpty({ message: 'Jumlah gaji tidak boleh kosong' })
  @IsNumber({}, { message: 'Jumlah gaji harus berupa angka' })
  amount: number;

  @ApiProperty({ description: 'Tanggal Pembayaran', example: '2024-03-08' })
  @IsNotEmpty({ message: 'Tanggal pembayaran tidak boleh kosong' })
  @IsDate({ message: 'Format tanggal tidak valid' })
  payment_date: Date;
}

export class UpdateSalaryDto extends CreateSalaryDto {}
