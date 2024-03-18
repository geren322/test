import {UsersService} from "../services/user";
import {User} from "../sequelize-orm/models/user";
import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import Config from "../configs/config";
import { PasswordService } from "../utils/bcryptjs-util"
import generateTokens from "../utils/token"



@Injectable()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    async addUser(userData: User): Promise<User> {

        if (!userData.first_name || !userData.last_name || !userData.email || !userData.phone || !userData.login || !userData.password) {
            throw new BadRequestException("All fields are required");
        }

        if (!Config.PHONE_PATTERN.test(userData.phone)) {
            throw new BadRequestException("Invalid phone number format. Example: +380981122333");
        }

        if (!Config.PASSWORD_PATTERN.test(userData.password)) {
            throw new BadRequestException("Invalid password format. It should contain at least 8 characters and one uppercase letter");
        }

        try {
            return await this.usersService.addUser(userData);
        } catch (err) {
            err.code = 400;
            throw err;
        }
    }

    async getUserById(id: number) {
        try{
            return await this.usersService.getUseByData({ id: Number(id) });
        }catch (err){
            err.code = 400;
            throw err;
        }
    }
    async login(data): Promise<any> {
        if (!data.login || !data.password) {
            throw new BadRequestException("You have not specified a login or password");
        }
        try{
            const user = await this.usersService.getUseByData({ login: data.login});
            if(!user){
                throw new UnauthorizedException("Incorrect login or password")
            }

            const isComparePassword = await PasswordService.comparePassword(data.password, user.password)
            if (!isComparePassword){
                throw new UnauthorizedException("Incorrect login or password")
            }
            const token = generateTokens({
                first_name: user.first_name,
                last_name: user.last_name,
                user_id: user.id
            })
            if (user && token && token.access_token && token.refresh_token) {
                let data = {
                    access_token: token.access_token,
                    refresh_token: token.refresh_token
                };

                await this.usersService.updateUserData(data, {id:user.id})

                user.access_token = token.access_token
                user.refresh_token = token.refresh_token
            }
                return user;
        }catch (err){
            throw new UnauthorizedException("Incorrect login or password")
        }
    }
}
