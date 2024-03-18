import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import Config from '../configs/config'

export const sequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
    dialect: 'mysql',
    host: Config.DB_HOST,
    port: Config.DB_PORT,
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_DATABASE,
    autoLoadModels: true,
    synchronize: true,
});
