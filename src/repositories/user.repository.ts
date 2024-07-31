import { IUser, User } from "../models";
import BaseRepository from "./BaseRepository";

export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(User);
    }

    async findByIdAndUpdate(
        id: string,
        updateObj: object
    ): Promise<IUser | null> {
        const user = await User.findByIdAndUpdate(id, updateObj, { new: true });
        return user;
    }
}
