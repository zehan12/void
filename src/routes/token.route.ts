import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyToken";
import { refreshAccessTokenHandler } from "../controllers/auth.controller";

const tokenRouterV1: Router = Router();

tokenRouterV1.get("/refresh-token", verifyJWT, refreshAccessTokenHandler);

export { tokenRouterV1 as tokenRoutesV1 };
