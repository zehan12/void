import UserActions from "@/components/molecules/UserActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import { FC } from "react";

const Post: FC = () => {
    return (<>
        <div className="flex justify-between w-full">
            <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                    <AvatarImage alt="userProfile" src="https://github.com/zehan12.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold">zehan12</p>
                    <img className="w-4 h-4" src="/icons/verified.png" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-muted-foreground"> 1d</p>
                <Ellipsis />
            </div>
        </div>
        <p className="my-3 ml-12">Create feature flag in React | Atlassian machine coding question question question
        </p>
        <div className="overflow-hidden border-2 rounded-lg border-muted-foreground">
            <img src={"https://miro.medium.com/v2/resize:fit:1400/format:webp/1*weMVujeIsnTY_QIhmIYhfQ.png"} alt="image" />
        </div>
        <div className="flex gap-3 my-3">
            <UserActions />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
            <p>228 replies</p>
            <p>&#8226;</p>
            <p>444 likes</p>
        </div></>)
}

Post.displayName = "Post";
export default Post;