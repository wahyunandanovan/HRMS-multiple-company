import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

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

  @ApiProperty({ description: 'Plan id' })
  @IsNotEmpty({ message: 'Plan id tidak boleh kosong' })
  @IsUUID('4', { message: 'Plan id harus berupa uuid v4' })
  plan_id: string;

  @ApiProperty({
    description: 'Gambar',
    type: 'string',
    format: 'binary',
    required: false,
  })
  image: string;
}

export class UpdateCompanyDto {
  @ApiProperty({ description: 'Nama Perusahaan', required: false })
  @IsString({ message: 'Nama perusahaan harus berupa teks' })
  company_name: string;

  @ApiProperty({ description: 'Alamat', required: false })
  @IsString({ message: 'Alamat harus berupa teks' })
  address: string;

  @ApiProperty({ description: 'Nomor Kontak', required: false })
  @IsString({ message: 'Nomor kontak harus berupa teks' })
  contact_number: string;

  @ApiProperty({ description: 'Plan id', required: false })
  @IsUUID('4', { message: 'Plan id harus berupa uuid v4' })
  plan_id: string;

  @ApiProperty({
    description: 'Gambar',
    type: 'string',
    format: 'binary',
    required: false,
  })
  image: string;
}
