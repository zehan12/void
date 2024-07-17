import jwt from "jsonwebtoken";
import config from "../config/config";
import { generateAccessAndRefreshTokens } from "../helpers";
import { UserRepository } from "../repositories";
import { DecodedJwtPayload, RefreshToken, ResponseType } from "../types";

const userRepository = new UserRepository();

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

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        userId
    );

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

export const tokenService = {
    getRefreshAccessToken,
};
