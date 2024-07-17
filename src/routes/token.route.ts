import { Router } from "express";
import { refreshAccessTokenHandler } from "../controllers";

const tokenRouterV1: Router = Router();

tokenRouterV1.get("/refresh-token", refreshAccessTokenHandler);

export { tokenRouterV1 as tokenRoutesV1 };
