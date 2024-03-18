import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersRouter } from '../routes/user';
import { UsersService } from '../services/user';
import { UsersController } from '../controllers/user';
import { sequelizeConfig } from './index';
import { User } from './models/user';
import { AuthMiddleware } from "../middlewares/user.validate.token";
import { LoggingMiddleware } from '../middlewares/logger';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => sequelizeConfig(configService),
        }),
        SequelizeModule.forFeature([User])
    ],
    controllers: [UsersRouter],
    providers: [UsersService, ConfigService, UsersController],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes('api/v1/getUser/:id');

        consumer
            .apply(LoggingMiddleware)
            .forRoutes('*');
    }
}
