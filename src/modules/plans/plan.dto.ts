import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({ description: 'Nama Plan' })
  @IsNotEmpty({ message: 'Nama plan tidak boleh kosong' })
  @IsString({ message: 'Nama plan harus berupa teks' })
  name: string;

  @ApiProperty({ description: 'Deskripsi Plan' })
  @IsNotEmpty({ message: 'Deskripsi plan tidak boleh kosong' })
  @IsString({ message: 'Deskripsi plan harus berupa teks' })
  description: string;

  @ApiProperty({ description: 'Harga Plan' })
  @IsNotEmpty({ message: 'Harga plan tidak boleh kosong' })
  @IsNumber({}, { message: 'Harga plan harus berupa angka' })
  price: number;

  @ApiProperty({ description: 'Maksimal karyawan' })
  @IsNotEmpty({ message: 'Maksimal karyawan tidak boleh kosong' })
  @IsNumber({}, { message: 'Maksimal karyawan harus berupa angka' })
  max_employee: number;
}

export class UpdatePlanDto extends CreatePlanDto {}
