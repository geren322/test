import * as bcrypt from 'bcryptjs';
import Config from '../configs/config';

export class PasswordService {
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, Config.SALT_ROUND_PASSWORD);
    }

    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
