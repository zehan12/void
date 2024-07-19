import { Request, Response, Router } from "express";
import { isAuthenticate } from "../middlewares";
import expressAsyncHandler from "express-async-handler";
import { User } from "../models";

const usersRouterV1: Router = Router();

// @route     PATCH api/v1/users/:userId/follow
// @desc      follow user
// @access    Private Protected
usersRouterV1.patch(
    "/:userId/follow",
    isAuthenticate,
    expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.id;
        const user = await User.findById(userId);
        res.json({ user: req.user.id, loggedIn: req.params.userId });
    })
);

export { usersRouterV1 as usersRoutesV1 };
