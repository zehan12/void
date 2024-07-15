import { StatusCodes } from "http-status-codes";
import { CreateUserDto } from "../dtos";
import { UserRepository } from "../repositories";
import { IUser, User } from "../models";
import response from "../constants/response";
import { mapToIUser } from "../mapper/user.mapper";

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
            message: response.EMAIL_TAKEN,
            statusCode: StatusCodes.CREATED,
            data: {},
        };
    }

    const isUsernameAvailable = await User.isUsernameAvailable(username);

    if (!isUsernameAvailable) {
        return {
            success: false,
            message: response.EMAIL_TAKEN,
            statusCode: StatusCodes.CREATED,
            data: {},
        };
    }

    const user = await userRepository.create(mapToIUser(createUser));
    console.log(user)

    return {
        success: true,
        message: response.USER_CREATED,
        statusCode: StatusCodes.CREATED,
        data: { user },
    };
};

export const authService = {
    signup,
};
