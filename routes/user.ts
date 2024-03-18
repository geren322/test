import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UsersController } from '../controllers/user';
import { User } from '../sequelize-orm/models/user';

@Controller('api/v1')
export class UsersRouter {
    constructor(private readonly usersController: UsersController) {}

    @Post('register')
    async register(@Body() userData: User): Promise<User> {
        return await this.usersController.addUser(userData);
    }

    @Post('login')
    async login(@Body() userData: User): Promise<User> {
        return this.usersController.login(userData);
    }

    @Get('getUser/:id')
    async getUserById(@Param('id') id: number): Promise<User> {
        return this.usersController.getUserById(id);
    }
}
