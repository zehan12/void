import { Router } from "express";
import { createUserHandler, loginUserHandler } from "../controllers/auth.controller";
import { validate } from "../zod/validate";
import { createUserSchema, loginUserSchema } from "../zod/user.schema";

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
// @desc      create and register user
// @access    Public
authRouterV1.post("/login", validate(loginUserSchema), loginUserHandler);

export { authRouterV1 as authRoutesV1, authRouterV2 as authRoutesV2 };
