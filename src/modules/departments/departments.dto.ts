import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Nama Department' })
  @IsNotEmpty({ message: 'Nama department tidak boleh kosong' })
  @IsString({ message: 'Nama department harus berupa teks' })
  department_name: string;

  @ApiProperty({ description: 'Gaji' })
  @IsNotEmpty({ message: 'Gaji tidak boleh kosong' })
  @IsNumber({}, { message: 'Gaji harus berupa angka' })
  salary: number;
}

export class UpdateDepartmentDto {
  @ApiProperty({ description: 'Nama Department' })
  @IsOptional()
  @IsString({ message: 'Nama department harus berupa teks' })
  department_name: string;

  @ApiProperty({ description: 'Gaji' })
  @IsOptional()
  @IsNumber({}, { message: 'Gaji harus berupa angka' })
  salary: number;
}
