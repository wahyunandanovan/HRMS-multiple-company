import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth,  ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { CompaniesService } from './companies.service';
import { Companies } from './companies.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filterFile, getFileName } from 'src/helper/fileService';
import { companyPaginateConfig } from './companies.paginate.config';
import {
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiPaginationQuery(companyPaginateConfig)
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Companies>> {
    return this.companiesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Companies> {
    return this.companiesService.findById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/images/company',
        filename: (req, file, cb) => {
          cb(null, getFileName(file));
        },
      }),
      fileFilter: filterFile,
    }),
  )
  async create(
    @Body() body: CreateCompanyDto,
    @UploadedFile() img: any,
  ): Promise<Companies> {
    let imageFileName: string | null = null;

    if (img) {
      imageFileName = img.filename;
    }

    const companyData: Partial<CreateCompanyDto> = {
      ...body,
      image: imageFileName,
    };

    return this.companiesService.create(companyData);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/images/company',
        filename: (req, file, cb) => {
          cb(null, getFileName(file));
        },
      }),
      fileFilter: filterFile,
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCompanyDto,
    @UploadedFile() img: any,
  ): Promise<Companies> {
    let imageFileName: string | null = null;

    if (img) {
      imageFileName = img.filename;
    }

    const companyData: Partial<CreateCompanyDto> = {
      ...body,
      image: imageFileName,
    };
    return this.companiesService.update(id, companyData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<object> {
    return this.companiesService.delete(id);
  }
}
