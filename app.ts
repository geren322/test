import { NestFactory } from '@nestjs/core';
import { AppModule } from './sequelize-orm/app.module';

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule);
        await app.listen(3000);
    } catch (error) {
        console.error('Failed to start the application:', error.message);
    }
}
bootstrap();