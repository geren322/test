import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import Config from '../configs/config';
import { UsersService } from "../services/user";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const user = await this.userService.getUseByData({ access_token: token });
            if (!user) {
                throw new UnauthorizedException('Invalid token');
            }
            const decodedToken = verify(token, Config.JWT_SECRET);
            req['user'] = decodedToken;
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
