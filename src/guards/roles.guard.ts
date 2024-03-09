import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Akses tidak diizinkan');
    }

    const userRoles = this.extractRolesFromToken(token);

    const requiredRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];

    if (!requiredRoles || !requiredRoles.includes(userRoles)) {
      throw new UnauthorizedException(
        `Akses tidak diizinkan untuk role ${userRoles}`,
      );
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

  private extractRolesFromToken(token: string): string {
    const decodedToken = this.jwtService.decode(token) as { role?: string };
    return decodedToken.role || '';
  }
}
