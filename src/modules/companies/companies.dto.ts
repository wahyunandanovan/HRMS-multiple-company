import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Nama Perusahaan' })
  @IsNotEmpty({ message: 'Nama perusahaan tidak boleh kosong' })
  @IsString({ message: 'Nama perusahaan harus berupa teks' })
  company_name: string;

  @ApiProperty({ description: 'Nomor Registrasi' })
  @IsNotEmpty({ message: 'Nomor registrasi tidak boleh kosong' })
  @IsString({ message: 'Nomor registrasi harus berupa teks' })
  registration_number: string;

  @ApiProperty({ description: 'Alamat' })
  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  @IsString({ message: 'Alamat harus berupa teks' })
  address: string;

  @ApiProperty({ description: 'Nomor Kontak' })
  @IsNotEmpty({ message: 'Nomor kontak tidak boleh kosong' })
  @IsString({ message: 'Nomor kontak harus berupa teks' })
  contact_number: string;
}
export class UpdateCompanyDto extends CreateCompanyDto {}
