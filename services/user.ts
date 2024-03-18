import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from '../sequelize-orm/models/user';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) {}

    async addUser(userData: User): Promise<User> {
        try {
            return await this.userModel.create(userData);
        }catch (err) {
            err.code = 400;
            throw err;
        }
    }

    async getUseByData(data) {
        try {
            return await this.userModel.findOne({where: data })
        }catch (err) {
            err.code = 400;
            throw err;
        }

    }

    async updateUserData(data, filter) {
        try {
            return await this.userModel.update(data, {where:filter})
        }catch (err) {
            err.code = 400;
            throw err;
        }

    }
}
