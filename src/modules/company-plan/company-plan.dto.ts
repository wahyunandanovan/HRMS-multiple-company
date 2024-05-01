import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional, Matches } from 'class-validator';

export class CreateCompanyPlanDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Company id tidak boleh kosong' })
  company_id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Reference plan id tidak boleh kosong' })
  reference_plan_id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tanggal mulai tidak boleh kosong' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Format tanggal harus yyyy-mm-dd',
  })
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tanggal selesai tidak boleh kosong' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Format tanggal harus yyyy-mm-dd',
  })
  end_date: Date;

  @ApiProperty({ default: true })
  @IsNotEmpty({ message: 'IsActive tidak boleh kosong' })
  @IsBoolean()
  is_active: boolean;
}

export class UpdateCompanyPlanDto {
  @ApiProperty({ default: '2024-04-30' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Format tanggal harus yyyy-mm-dd',
  })
  @IsOptional()
  start_date: string;

  @ApiProperty({ default: '2024-04-30' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Format tanggal harus yyyy-mm-dd',
  })
  @IsOptional()
  end_date: string;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
