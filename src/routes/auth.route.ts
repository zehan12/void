import { Router } from "express";
import { createUserHandler } from "../controllers/auth.controller";
import { validate } from "../zod/validate";
import { createUserSchema } from "../zod/user.schema";

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


export { authRouterV1 as authRoutesV1, authRouterV2 as authRoutesV2 };
