import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/constant/jwtConstant';
import * as fs from 'fs';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request | any, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer') {
      const accessToken = authorizationHeader.split(' ')[1];
      try {
        const decodedToken = jwt.verify(accessToken, jwtConstants.secret);
        req['user'] = decodedToken;
        const { method, path, user } = req;
        fs.appendFileSync(
          'public/request.log',
          `${JSON.stringify({ path, method, user })}\n`,
        );
      } catch (error) {
        throw new UnauthorizedException('Token tidak valid');
      }
    }
    next();
  }
}
