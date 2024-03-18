import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use = (req: Request, res: Response, next: NextFunction) => {
        this.logger.log(`Request: ${req.method} ${req.url}`);
        this.logger.log(`Request headers: ${JSON.stringify(req.headers)}`);
        this.logger.log(`Request body: ${JSON.stringify(req.body)}`);

        const originalSend = res.send;
        res.send = ((body) => {
            this.logger.log(`Response status: ${res.statusCode}`);
            this.logger.log(`Response body: ${JSON.stringify(JSON.parse(body))}`);
            return originalSend.apply(res, [body]);
        }) as any;

        next();
    };
}
