import { StatusCodes } from "http-status-codes";
import { CreateUserDto, LoginUserDto } from "../dtos";
import { UserRepository } from "../repositories";
import { IUser, User } from "../models";
import RESPONSE from "../constants/response";
import { generateAccessAndRefreshTokens } from "../helpers/generateToken";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

const userRepository = new UserRepository();

type RefreshToken = {
    refreshToken: string;
};

interface DecodedJwtPayload extends JwtPayload {
    id: string;
}

export interface ResponseType {
    success: boolean;
    message: string;
    statusCode: number;
    data?: any;
}

/**
 * @desc    Sign Up Service
 * @param   { CreateUserDto } createUser - Body object data
 * @return  { Object<success|statusCode|message|user|tokens> }
 */
const signup = async (createUser: CreateUserDto): Promise<ResponseType> => {
    const { email, username } = createUser;

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

/**
 * @desc    Login Service
 * @param   { LoginUserDto } loginUser - Login user data object
 * @return  { Object<success|statusCode|message|data> }
 */
const login = async (loginUser: LoginUserDto): Promise<ResponseType> => {
    const { email, username, password } = loginUser;

    if (!email && !username) {
        return {
            success: false,
            message: "Enter ness fields",
            statusCode: StatusCodes.NOT_FOUND,
        };
    }

    let user: IUser | null = null;
    if (email) {
        user = await userRepository.findOne({ email });
    } else {
        user = await userRepository.findOne({ username });
    }

    if (!user) {
        return {
            success: false,
            message: "User not found",
            statusCode: StatusCodes.NOT_FOUND,
        };
    }

    const isPasswordVerified = await user.verifyPassword(password);

    if (!isPasswordVerified) {
        return {
            success: false,
            message: `Invalid ${email ? "email" : "username"} or password`,
            statusCode: StatusCodes.UNAUTHORIZED,
        };
    }

    const userId: string | any = user._id;

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        userId
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await userRepository.findById(user.id);

    return {
        success: true,
        message: "User logged in successfully",
        statusCode: StatusCodes.OK,
        data: {
            user: loggedInUser,
            tokens: {
                accessToken,
                refreshToken,
            },
        },
    };
};

const getRefreshAccessToken = async (
    cookies: RefreshToken,
    body: RefreshToken
): Promise<ResponseType> => {
    const incomingRefreshToken = cookies.refreshToken || body.refreshToken;

    if (!incomingRefreshToken) {
        return {
            success: false,
            message: "Refresh token expired or used",
            statusCode: 401,
        };
    }

    let decodedToken: DecodedJwtPayload;
    try {
        decodedToken = jwt.verify(
            incomingRefreshToken,
            config.jwt.refreshToken.secret
        ) as DecodedJwtPayload;
    } catch (error) {
        return {
            success: false,
            message: "Invalid refresh token",
            statusCode: 401,
        };
    }

    const userId = decodedToken._id;
    const user = await userRepository.findById(userId);

    if (!user) {
        return {
            success: false,
            message: "Invalid refresh token",
            statusCode: 401,
        };
    }

    if (incomingRefreshToken !== user.refreshToken) {
        return {
            success: false,
            message: "Refresh token expired or used",
            statusCode: 401,
        };
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(userId);

    return {
        success: true,
        message: "Access Token refreshed",
        statusCode: 200,
        data: {
            tokens: {
                accessToken,
                refreshToken: refreshToken,
            },
        },
    };
};

export const authService = {
    signup,
    login,
    getRefreshAccessToken,
};
