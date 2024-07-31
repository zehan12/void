import { Request, Response, Router } from "express";
import { isAuthenticate } from "../middlewares";
import expressAsyncHandler from "express-async-handler";
import { UserRepository } from "../repositories";
import { isValidObjectId } from "mongoose";
import { IUser } from "../models";

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
    expressAsyncHandler(async (req: Request, res: Response): Promise<any> => {
        const userRepository = new UserRepository();
        const userToFollowId: string = req.params.userId;
        const loggedInUserId: string = req.user.id;

        if (!isValidObjectId(userToFollowId)) {
            return res.json({
                message: "User id is not valid",
            });
        }

        if (userToFollowId === loggedInUserId) {
            return res.json({
                message: "You can't follow yourself, you are not Chandu losser!",
            });
        }

        const userToFollow: IUser | null = await userRepository.findById(
            userToFollowId
        );
        const loggedInUser: IUser | null = await userRepository.findById(
            loggedInUserId
        );

        if (!userToFollow || !loggedInUser) {
            return res.json({
                message: "User not found",
            });
        }

        const isFollowing =
            (loggedInUser.following as string[] | undefined)?.includes(
                userToFollowId
            ) ?? false;

        if (!isFollowing) {
            await userRepository.findByIdAndUpdate(loggedInUserId, {
                $push: { following: userToFollowId },
            });
            await userRepository.findByIdAndUpdate(userToFollowId, {
                $push: { followers: loggedInUserId },
            });

            return res.json({
                message: "Following user successfully",
                userFollowing: loggedInUser,
                userFollowed: userToFollow,
            });
        }

        return res.json({
            message: "Already following this user",
            loggedInUser,
            userToFollow,
        });
    })
);

// @route     PATCH api/v1/users/:userId/unfollow
// @desc      Un-Follow User
// @access    Private Protected


export { usersRouterV1 as usersRoutesV1 };
