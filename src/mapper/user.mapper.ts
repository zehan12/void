import { CreateUserDto } from "../dtos";
import { IUser } from "../models";

export function mapToIUser(dto: CreateUserDto): IUser {
    const { name, username, email, password } = dto;

    const user: Partial<IUser> = {
        name,
        username,
        email,
        password,
    };

    return user as IUser; 
}
