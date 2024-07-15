import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const ErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ApiError(400, message);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ApiError(400, message);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
