import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional, IsDate } from 'class-validator';

export class CreateCompanyPlanDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Company id tidak boleh kosong' })
  company_id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Reference plan id tidak boleh kosong' })
  reference_plan_id: string;

  @ApiProperty({ description: 'Tanggal Mulai', example: '2024-03-08' })
  @IsNotEmpty({ message: 'Tanggal mulai tidak boleh kosong' })
  @IsDate({ message: 'Format tanggal tidak valid' })
  start_date: Date;

  @ApiProperty({ description: 'Tanggal Selesai', example: '2024-03-08' })
  @IsNotEmpty({ message: 'Tanggal selesai tidak boleh kosong' })
  @IsDate({ message: 'Format tanggal tidak valid' })
  end_date: Date;

  @ApiProperty({ default: true })
  @IsNotEmpty({ message: 'IsActive tidak boleh kosong' })
  @IsBoolean()
  is_active: boolean;
}

export class UpdateCompanyPlanDto {
  @ApiProperty({ description: 'Tanggal Mulai', example: '2024-03-08' })
  @IsNotEmpty({ message: 'Tanggal mulai tidak boleh kosong' })
  @IsOptional()
  @IsDate({ message: 'Format tanggal tidak valid' })
  start_date: Date;

  @ApiProperty({ description: 'Tanggal Selesai', example: '2024-03-08' })
  @IsNotEmpty({ message: 'Tanggal selesai tidak boleh kosong' })
  @IsOptional()
  @IsDate({ message: 'Format tanggal tidak valid' })
  end_date: Date;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
