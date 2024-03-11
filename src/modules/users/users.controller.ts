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
import { UsersService } from './users.service';
import {
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
  Paginated,
} from 'nestjs-paginate';
import { Users } from './users.entity';
import { UserPaginateConfig } from './user.paginate.config';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { diskStorage } from 'multer';
import { UserRole } from './role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { filterFile, getFileName } from 'src/helper/fileService';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(UserRole.PIAWAY_ADMIN)
  @ApiPaginationQuery(UserPaginateConfig)
  public findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Users>> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.PIAWAY_ADMIN)
  async findOne(@Param('id') id: string): Promise<Users> {
    return this.userService.findById(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/images/user',
        filename: (req, file, cb) => {
          cb(null, getFileName(file));
        },
      }),
      fileFilter: filterFile,
    }),
  )
  @Roles(UserRole.PIAWAY_ADMIN)
  @ApiBody({ type: CreateUserDto })
  async create(
    @Body() body: CreateUserDto,
    @UploadedFile() img,
  ): Promise<Users> {
    let imageFileName: string | null = null;

    if (img) {
      imageFileName = img.filename;
    }
    const userData: Partial<CreateUserDto> = {
      ...body,
      image: imageFileName,
    };
    return this.userService.create(userData);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/images/user',
        filename: (req, file, cb) => {
          cb(null, getFileName(file));
        },
      }),
      fileFilter: filterFile,
    }),
  )
  @Roles(UserRole.PIAWAY_ADMIN)
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @UploadedFile() img,
  ): Promise<Users> {
    let imageFileName: string | null = null;

    if (img) {
      imageFileName = img.filename;
    }
    const userData: Partial<CreateUserDto> = {
      ...body,
      image: imageFileName,
    };
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  @Roles(UserRole.PIAWAY_ADMIN)
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
