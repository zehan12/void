import { IUser, User } from "../models";
import BaseRepository from "./BaseRepository";

export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(User);
    }
}
