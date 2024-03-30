import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    description:
      'Field to select folder, where yo save image. exp: company,user etc',
    required: false,
  })
  destination: string;

  @ApiProperty({
    description: 'png/jpg',
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: string;
}

export class ReplaceFileDto {
  @ApiProperty({
    required: true,
    description: 'File path do you want to replace',
  })
  @IsNotEmpty({ message: 'oldPath tidak boleh kosong' })
  @IsString({ message: 'oldPath harus berupa teks' })
  oldPath: string;

  @ApiProperty({
    description: 'png/jpg',
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: string;

  @ApiProperty({
    description:
      'Field to select folder, where yo save image. exp: company,user etc',
    required: false,
  })
  destination: string;
}
