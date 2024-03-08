import { IsNotEmpty, IsDate, IsUUID, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LeaveType } from './leaves.enum';

export class CreateLeaveDto {
  @ApiProperty({
    description: 'ID Karyawan',
  })
  @IsNotEmpty({ message: 'ID karyawan tidak boleh kosong' })
  @IsUUID('4', { message: 'ID karyawan harus berupa UUID versi 4' })
  employee_id: string;

  @ApiProperty({ description: 'Tanggal Mulai', example: '2024-03-08' })
  @IsNotEmpty({ message: 'Tanggal mulai tidak boleh kosong' })
  @IsDate({ message: 'Format tanggal tidak valid' })
  start_date: Date;

  @ApiProperty({ description: 'Jenis Cuti', enum: LeaveType })
  @IsNotEmpty({ message: 'Jenis cuti tidak boleh kosong' })
  @IsEnum(LeaveType, {
    message:
      'Jenis cuti harus salah satu dari: sakit, izin, menikah, cuti_tahunan',
  })
  type: LeaveType;

  @ApiProperty({ description: 'Deskripsi', example: 'Cuti karena sakit' })
  @IsString({ message: 'Deskripsi harus berupa teks' })
  description: string;

  @ApiProperty({ description: 'Tanggal Selesai', example: '2024-03-08' })
  @IsNotEmpty({ message: 'Tanggal selesai tidak boleh kosong' })
  @IsDate({ message: 'Format tanggal tidak valid' })
  end_date: Date;

  @ApiProperty({ description: 'Status' })
  @IsNotEmpty({ message: 'Status tidak boleh kosong' })
  status: string;
}

export class UpdateLeaveDto extends CreateLeaveDto {}
