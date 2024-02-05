import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Add your middleware logic here
        console.log('App Middleware');
        next();
    }
}
