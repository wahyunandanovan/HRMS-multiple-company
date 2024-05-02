import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/constant/jwtConstant';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer') {
      const accessToken = authorizationHeader.split(' ')[1];
      try {
        const decodedToken = jwt.verify(accessToken, jwtConstants.secret);
        req['user'] = decodedToken;
      } catch (error) {
        throw new UnauthorizedException('Token tidak valid');
      }
    }
    next();
  }
}
