import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/constant/jwtConstant';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'Akses tidak diizinkan, Tidak ada token yang disediakan!',
      );
    }

    try {
      const decodedToken: any = jwt.verify(token, jwtConstants.secret);

      if (decodedToken.exp < Date.now() / 1000) {
        throw new UnauthorizedException('Token sudah kadaluwarsa');
      }
    } catch (error) {
      throw new UnauthorizedException('Token tidak valid');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return undefined;
  }
}
