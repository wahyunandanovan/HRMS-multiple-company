import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class RequestErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);

    res.on('finish', () => {
      const { statusCode } = res;
      if (statusCode >= 400) {
        const imagePath = req.body.image;
        if (imagePath && fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    });
    next();
  }
}
