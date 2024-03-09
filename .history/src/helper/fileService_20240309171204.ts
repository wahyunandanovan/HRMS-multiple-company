import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export const getFileName = (file: any, host: string): string => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const fileName = `${uniqueSuffix}${extname(file.originalname)}`;
  return `${host}/public/images/company/${fileName}`;
};

export const filterFile = (req: any, file: any, cb: any): void => {
  // Validasi tipe file yang diizinkan
  if (!file.mimetype.startsWith('image/')) {
    return cb(new BadRequestException('File harus berupa gambar.'), false);
  }

  // Validasi ukuran file (contoh batas maksimum 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return cb(
      new BadRequestException('Ukuran file terlalu besar. Maksimal 5MB.'),
      false,
    );
  }

  cb(null, true);
};
