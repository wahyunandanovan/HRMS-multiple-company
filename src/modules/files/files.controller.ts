import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as fs from 'fs';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filterFile, getFileName } from 'src/helper/fileService';
import { ReplaceFileDto, UploadFileDto } from './files.dto';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@ApiTags('files')
@Controller('files')
export class FilesController {
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const { destination } = req.body;
          cb(
            null,
            destination ? `public/images/${destination}` : 'public/images',
          );
        },
        filename: (req, file, cb) => {
          cb(null, getFileName(file));
        },
      }),
      fileFilter: filterFile,
    }),
  )
  async create(@Body() body: UploadFileDto, @UploadedFile() img) {
    return { ...img, path: `${img.destination}/${img.filename}` };
  }

  @Post('replace')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const { destination } = req.body;
          cb(
            null,
            destination ? `public/images/${destination}` : 'public/images',
          );
        },
        filename: (req, file, cb) => {
          cb(null, getFileName(file));
        },
      }),
      fileFilter: filterFile,
    }),
  )
  async replace(@Body() body: ReplaceFileDto, @UploadedFile() img) {
    const { oldPath } = body;
    fs.unlinkSync(oldPath);
    return { ...img, path: `${img.destination}/${img.filename}` };
  }

  @Delete(':filename')
  @ApiParam({
    name: 'filename',
    description: 'example : public/images/company/1711789764389-609326094.png',
  })
  async delete(@Param('filename') filename: string) {
    fs.unlinkSync(filename);
    return { message: 'File berhasil dihapus!' };
  }
}
