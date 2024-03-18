import * as jwt from 'jsonwebtoken';
import Config from '../configs/config';

export default function generateTokens(accessPayload: any = {}) {
    const accessToken = jwt.sign(accessPayload, Config.JWT_SECRET, { expiresIn: Config.ACCESS_TOKEN_LIFETIME });
    const refreshToken = jwt.sign({}, Config.JWT_REFRESH_SECRET, { expiresIn: Config.REFRESH_TOKEN_LIFETIME });

    return {
        access_token: accessToken,
        refresh_token: refreshToken
    };
}
