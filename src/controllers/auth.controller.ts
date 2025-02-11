import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { authService } from "../services";
import { ApiError } from "../utils/ApiError";
import { User } from "../models";
import config from "../config/config";

const options: any = {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "strict",
};

/**
 * @desc      create user and register user
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } .......
 * @returns   { JSON } - A JSON object representing the success, message, status and data
 */
const createUserHandler = expressAsyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const userBody = req.body;
        const { success, message, statusCode, data } = await authService.signup(
            userBody
        );

        // Check if something went wrong
        if (!success) {
            new ApiError(statusCode, message);
        }

        return res
            .status(statusCode)
            .cookie("accessToken", data?.tokens?.accessToken, options)
            .cookie("refreshToken", data?.tokens?.refreshToken, options)
            .json({
                success,
                message,
                data,
            });
    }
);

/**
 * @desc      login user
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } .......
 * @returns   { JSON } - A JSON object representing the success, message, status and data
 */
const loginUserHandler = expressAsyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const userBody = req.body;
        const { success, message, statusCode, data } = await authService.login(
            userBody
        );

        // Check if something went wrong
        if (!success) {
            new ApiError(statusCode, message);
        }

        return res
            .status(statusCode)
            .cookie("accessToken", data.tokens.accessToken, options)
            .cookie("refreshToken", data.tokens.refreshToken, options)
            .json({
                success,
                message,
                data,
            });
    }
);

/**
 * @desc      logout user
 * @param     { Object } req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } .......
 * @returns   { JSON } - A JSON object representing the success, message, status and data
 */
const logoutUserHandler = expressAsyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const userId: string | any = req.user._id;
        const { success, message, statusCode, data } = await authService.logout(
            userId
        );

        return res
            .status(statusCode)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({
                success,
                message,
                data,
            });
    }
);

export { createUserHandler, loginUserHandler, logoutUserHandler };
