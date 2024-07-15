import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { authService } from "../services";
import { ApiError } from "../utils/ApiError";
import { IUser, User } from "../models";
import config from "../config/config";

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

        return res.status(statusCode).json({
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

        const options: any = {
            httpOnly: true,
            secure: config.env === "production",
            sameSite: "strict",
        };

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
        const userId = req.user;
        await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    refreshToken: undefined,
                },
            },
            { new: true }
        );

        return res
            .status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({
                success: true,
                message: "Successfully logged out",
                statusCode: 200,
            });
    }
);

export { createUserHandler, loginUserHandler, logoutUserHandler };
