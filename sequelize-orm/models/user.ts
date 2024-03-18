import {BeforeCreate, Column, DataType, Model, Table} from 'sequelize-typescript';
import { PasswordService } from "../../utils/bcryptjs-util"

@Table
export class User extends Model<User> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column
    first_name: string;

    @Column
    last_name: string;

    @Column
    email: string;

    @Column
    phone: string;

    @Column
    login: string;

    @Column({
        type: DataType.CHAR(60)
    })
    password: string;

    @Column
    access_token: string;

    @Column
    refresh_token: string;

    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await PasswordService.hashPassword(instance.password)
    }
}