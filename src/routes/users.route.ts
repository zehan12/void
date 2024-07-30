import { Request, Response, Router } from "express";
import { isAuthenticate } from "../middlewares";
import expressAsyncHandler from "express-async-handler";
import { UserRepository } from "../repositories";

const usersRouterV1: Router = Router();

// @route     PATCH api/v1/users/me
// @desc      User Details
// @access    Private Protected

// @route     PATCH api/v1/users/:userId/follow
// @desc      Follow User
// @access    Private Protected
usersRouterV1.patch(
    "/:userId/follow",
    isAuthenticate,
    expressAsyncHandler(async (req: Request, res: Response) => {
        const userRepository = new UserRepository();
        
        const userToFollowId = req.params.id;
        const userToFollow = await userRepository.findById(userToFollowId);

        const loggedUserId = req.user.id;
        const loggedInUser = await userRepository.findById(loggedUserId);



        res.json({ user: req.user.id, loggedIn: req.params.userId });
    })
);

export { usersRouterV1 as usersRoutesV1 };
