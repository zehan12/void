import { Router } from "express";
import {
    createUserHandler,
    loginUserHandler,
    logoutUserHandler,
} from "../controllers";
import { validate } from "../zod";
import { createUserSchema, loginUserSchema } from "../zod";
import { validateAndAuthenticateJWT } from "../middlewares";

const authRouterV1: Router = Router();
const authRouterV2: Router = Router();

/*
|--------------------------------------------------------------------------
| Version 1
|--------------------------------------------------------------------------
*/

// @route     POST api/v1/auth/signup
// @desc      create and register user
// @access    Public
authRouterV1.post("/signup", validate(createUserSchema), createUserHandler);

// @route     POST api/v1/auth/signup
// @desc      login user
// @access    Public
authRouterV1.post("/login", validate(loginUserSchema), loginUserHandler);

// @route     DELETE api/v1/auth/logout
// @desc      logout user
// @access    Private Protected
authRouterV1.delete("/logout", validateAndAuthenticateJWT, logoutUserHandler);

export { authRouterV1 as authRoutesV1, authRouterV2 as authRoutesV2 };
