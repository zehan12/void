import { Ellipsis } from "lucide-react"
import UserActions from "./UserActions"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Comments = () => {
    return (<>
        <Separator className="my-4" />
        <div className="flex py-2 mmy-2 w-full gap-4">
            <Avatar className="w-8 h-8">
                <AvatarImage alt="userProfile" src="https://github.com/zehan12.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col gap-1">
                <div className="w-full flex justify-between items-center">
                    <p className="text-sm font-semibold">
                        zehan
                    </p>
                    <div className="flex items-center gap-4 ">
                        <p className="text-muted-foreground">1d</p>
                        <Ellipsis />
                    </div>
                </div>
                <p>Hey this my comments</p>
                <UserActions />
                <p className="text-xs text-muted-foreground">199 likes</p>
            </div>
        </div>
    </>)
}

Comments.displayName = "Comments";
export default Comments;