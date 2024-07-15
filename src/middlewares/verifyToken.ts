import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import { User } from "../models";
import expressAsyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

export const verifyJWT = expressAsyncHandler(
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const token =
                req.cookies?.accessToken ||
                req.header("Authorization")?.replace("Bearer ", "");

            if (!token) {
                throw new ApiError(StatusCodes.UNAUTHORIZED, "Token not found");
            }

            const decodedToken = jwt.verify(
                token,
                config.jwt.accessToken.secret
            ) as JwtPayload & { _id: string };

            if (!decodedToken?._id) {
                throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");
            }

            const user = await User.findById(decodedToken._id).select(
                "-password -refreshToken"
            );

            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
            }

            req.user = user;
            next();
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    message: error.message,
                });
            } else {
                // Handle unexpected errors
                console.error("Internal server error:", error);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "Internal server error",
                    error: "An unexpected error occurred",
                });
            }
        }
    }
);
