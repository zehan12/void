import expressAsyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError";
import { Request, Response } from "express";
import config from "../config/config";
import { tokenService } from "../services";

const refreshAccessTokenHandler = expressAsyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        const cookies: any = req.cookies;
        const body = req.body;
        const { success, statusCode, message, data }: any =
            await tokenService.getRefreshAccessToken(cookies, body);

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

export {
    refreshAccessTokenHandler
}