import UserActions from "@/components/molecules/UserActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface UserPostPropTypes {
    title: string;
    image: string;
    likes: number;
    replies: number;
}

const UserPost: FC<UserPostPropTypes> = ({ title, image, likes, replies }) => {
    return (<Link to="/">
        <div className="flex gap-3 mb-4 py-5">
            <div className="flex flex-col items-center gap-1">
                <Avatar className="w-12 h-12">
                    <AvatarImage alt="userProfile" src="https://github.com/zehan12.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="h-full w-[0.1rem] bg-muted-foreground">
                </div>
                <div className="relative right-8">
                    <Avatar className="absolute w-6 h-6 top-[0px] left-[35px]">
                        <AvatarImage alt="userProfile" src="https://github.com/zehan12.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="absolute w-6 h-6 bottom-0 right-[-45px]">
                        <AvatarImage alt="userProfile" src="https://github.com/zehan12.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="absolute w-6 h-6 left-[4px]">
                        <AvatarImage alt="userProfile" src="https://github.com/zehan12.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between w-full">
                    <div className="w-full flex items-center gap-1">
                        <p className="text-sm font-semibold">zehan</p>
                        <img className="w-4 h-4" src="/icons/verified.png" />
                    </div>
                    <div className="flex items-center gap-4 ">
                        <p className="text-muted-foreground">1d</p>
                        <Ellipsis />
                    </div>
                </div>
                <p>{title}</p>
                {image &&
                    <div className="overflow-hidden border-2 rounded-lg border-muted-foreground">
                        <img src={image} alt="image" />
                    </div>}
                <UserActions />
                <div className="flex gap-2 items-center">
                    <p className="text-sm text-muted-foreground">{replies} Replies</p>
                    <p className="text-muted-foreground mx-1">&#8226;</p>
                    <p className="text-sm text-muted-foreground">{likes} Likes</p>
                </div>
            </div>
        </div>
    </Link>);
};

UserPost.displayName = "UserPost";
export default UserPost;