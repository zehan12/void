import { StatusCodes } from "http-status-codes";
import { IUser, User } from "../models";
import { ApiError } from "../utils/ApiError";

export const generateAccessAndRefreshTokens = async (
    userId: string
): Promise<any> => {
    try {
        const user = (await User.findById(userId)) as IUser;
        if (!user) return;
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        return new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "INTERNAL_SERVER_ERROR"
        );
    }
};