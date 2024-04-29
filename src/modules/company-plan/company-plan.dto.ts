import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateCompanyPlanDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Company id tidak boleh kosong' })
  company_id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Reference plan id tidak boleh kosong' })
  reference_plan_id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tanggal mulai tidak boleh kosong' })
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tanggal selesai tidak boleh kosong' })
  @IsDate()
  end_date: Date;

  @ApiProperty({ default: true })
  @IsNotEmpty({ message: 'IsActive tidak boleh kosong' })
  @IsBoolean()
  is_active: boolean;
}

export class UpdateCompanyPlanDto extends CreateCompanyPlanDto {}
