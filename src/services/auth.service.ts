import { StatusCodes } from "http-status-codes";
import { CreateUserDto } from "../dtos";
import { UserRepository } from "../repositories";
import { IUser, User } from "../models";
import RESPONSE from "../constants/response";

const userRepository = new UserRepository();

/**
 * @desc    Sign Up Service
 * @param   { Object } createUser - Body object data
 * @return  { Object<success|statusCode|message|user|tokens> }
 */
const signup = async (createUser: CreateUserDto): Promise<any> => {
    const { email, username } = createUser as IUser;

    const isEmailTaken = await User.isEmailTaken(email);

    if (isEmailTaken) {
        return {
            success: false,
            message: RESPONSE.EMAIL_TAKEN,
            statusCode: StatusCodes.CONFLICT,
        };
    }

    const isUsernameAvailable = await User.isUsernameAvailable(username);

    if (!isUsernameAvailable) {
        return {
            success: false,
            message: RESPONSE.EMAIL_TAKEN,
            statusCode: StatusCodes.CONFLICT,
        };
    }

    const user = await userRepository.create(createUser);

    return {
        success: true,
        message: RESPONSE.USER_CREATED,
        statusCode: StatusCodes.CREATED,
        data: { user },
    };
};

export const authService = {
    signup,
};
