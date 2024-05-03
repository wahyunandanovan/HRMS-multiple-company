import {
  IsNotEmpty,
  IsDate,
  IsUUID,
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LeaveStatus, LeaveType } from './leaves.enum';

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
    message: `Type cuti harus salah satu dari: ${Object.values(LeaveType)}`,
  })
  type: LeaveType;

  @ApiProperty({ description: 'Deskripsi', example: 'Cuti karena sakit' })
  @IsString({ message: 'Deskripsi harus berupa teks' })
  description: string;

  @ApiProperty({ description: 'Tanggal Selesai', example: '2024-03-08' })
  @IsNotEmpty({ message: 'Tanggal selesai tidak boleh kosong' })
  @IsDate({ message: 'Format tanggal tidak valid' })
  end_date: Date;

  @ApiProperty({ description: 'Status', enum: LeaveStatus })
  @IsNotEmpty({ message: 'Status tidak boleh kosong' })
  @IsEnum(LeaveStatus, {
    message: `Status cuti harus salah satu dari: ${Object.values(LeaveStatus)}`,
  })
  status: string;
}

export class UpdateLeaveDto {
  @ApiProperty({
    description: 'ID Karyawan',
  })
  @IsUUID('4', { message: 'ID karyawan harus berupa UUID versi 4' })
  @IsOptional()
  employee_id: string;

  @ApiProperty({ description: 'Tanggal Mulai', example: '2024-03-08' })
  @IsOptional()
  @IsDate({ message: 'Format tanggal tidak valid' })
  start_date: Date;

  @ApiProperty({ description: 'Jenis Cuti', enum: LeaveType })
  @IsOptional()
  @IsEnum(LeaveType, {
    message: `Type cuti harus salah satu dari: ${Object.values(LeaveType)}`,
  })
  type: LeaveType;

  @ApiProperty({ description: 'Deskripsi', example: 'Cuti karena sakit' })
  @IsString({ message: 'Deskripsi harus berupa teks' })
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Tanggal Selesai', example: '2024-03-08' })
  @IsOptional()
  @IsDate({ message: 'Format tanggal tidak valid' })
  end_date: Date;

  @ApiProperty({ description: 'Status', enum: LeaveStatus })
  @IsOptional()
  @IsEnum(LeaveStatus, {
    message: `Status cuti harus salah satu dari: ${Object.values(LeaveStatus)}`,
  })
  status: string;
}
