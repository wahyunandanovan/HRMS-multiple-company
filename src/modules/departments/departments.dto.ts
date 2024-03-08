import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Nama Department' })
  @IsNotEmpty({ message: 'Nama department tidak boleh kosong' })
  @IsString({ message: 'Nama department harus berupa teks' })
  department_name: string;

  @ApiProperty({ description: 'Standar Gaji' })
  @IsNotEmpty({ message: 'Standar gaji tidak boleh kosong' })
  @IsNumber({}, { message: 'Standar gaji harus berupa angka' })
  standart_salary: number;

  @ApiProperty({
    description: 'ID Perusahaan',
  })
  @IsNotEmpty({ message: 'ID perusahaan tidak boleh kosong' })
  @IsUUID('4', { message: 'ID perusahaan harus berupa UUID versi 4' })
  company_id: string;
}

export class UpdateDepartmentDto extends CreateDepartmentDto {}
