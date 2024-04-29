import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Nama Perusahaan' })
  @IsNotEmpty({ message: 'Nama perusahaan tidak boleh kosong' })
  @IsString({ message: 'Nama perusahaan harus berupa teks' })
  company_name: string;

  @ApiProperty({ description: 'Alamat' })
  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  @IsString({ message: 'Alamat harus berupa teks' })
  address: string;

  @ApiProperty({ description: 'Nomor Kontak' })
  @IsNotEmpty({ message: 'Nomor kontak tidak boleh kosong' })
  @IsString({ message: 'Nomor kontak harus berupa teks' })
  contact_number: string;

  @ApiProperty({ description: 'User id' })
  @IsNotEmpty({ message: 'User id tidak boleh kosong' })
  @IsUUID('4', { message: 'User id harus berupa uuid v4' })
  user_id: string;

  @ApiProperty()
  @IsUrl(undefined, { message: 'Image harus berupa alamat url' })
  @IsOptional()
  image: string;
}

export class UpdateCompanyDto {
  @ApiProperty({ description: 'Nama Perusahaan', required: false })
  @IsString({ message: 'Nama perusahaan harus berupa teks' })
  @IsOptional()
  company_name: string;

  @ApiProperty({ description: 'Alamat', required: false })
  @IsString({ message: 'Alamat harus berupa teks' })
  @IsOptional()
  address: string;

  @ApiProperty({ description: 'Nomor Kontak', required: false })
  @IsString({ message: 'Nomor kontak harus berupa teks' })
  @IsOptional()
  contact_number: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl(undefined, { message: 'Image harus berupa alamat url' })
  image: string;
}

export class ChangePlanDto {
  @ApiProperty({
    description: 'Tanggal kedaluwarsa baru rencana',
    example: '2024-04-01',
  })
  @IsNotEmpty({ message: 'Tanggal kedaluwarsa tidak boleh kosong' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Format tanggal harus yyyy-mm-dd',
  })
  endDate: Date;
}
