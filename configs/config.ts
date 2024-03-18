
export default
{
    DB_HOST:"localhost",
    DB_PORT:3306,
    DB_USERNAME:"root",
    DB_PASSWORD:"qwerty1234",
    DB_DATABASE:"test_db",

    PHONE_PATTERN : /^\+380\d{9}$/,
    PASSWORD_PATTERN : /^(?=.*[A-Z]).{8,}$/,
    SALT_ROUND_PASSWORD: 10,

    JWT_SECRET: 'uf7e^WaiUGFSA7fd8&^dadhADMIN',
    JWT_REFRESH_SECRET: '3fhfsdjfkf$$uIEFSHFKdfADMIN',
    ACCESS_TOKEN_LIFETIME: '600m',
    REFRESH_TOKEN_LIFETIME: '600m',
    TOKEN_LIFETIME: 2592000000
}