import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { Response } from 'express';
import {
  accessTokenCookieExperied,
  accessTokenCookieName,
} from 'src/constant/cookieConstant';

const cookieOption = {
  httpOnly: true,
  maxAge: accessTokenCookieExperied,
};

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data: any = await this.authService.login(body);
    if (data) {
      const { access_token, message } = data.data;
      response.cookie(accessTokenCookieName, access_token, cookieOption);
      return { message };
    }
  }

  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { username, email, password } = body;
    const data = await this.authService.register(username, email, password);
    if (data) {
      const { access_token, message } = data.data;
      response.cookie(accessTokenCookieName, access_token, cookieOption);
      return { message };
    }
  }
}
