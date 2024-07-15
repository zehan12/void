import { Router } from "express";
import {
    createUserHandler,
    loginUserHandler,
    logoutUserHandler,
} from "../controllers/auth.controller";
import { validate } from "../zod/validate";
import { createUserSchema, loginUserSchema } from "../zod/user.schema";
import { verifyJWT } from "../middlewares/verifyToken";

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

// @route     POST api/v1/auth/logout
// @desc      logout user
// @access    Private
authRouterV1.post("/logout", verifyJWT, logoutUserHandler);

export { authRouterV1 as authRoutesV1, authRouterV2 as authRoutesV2 };
