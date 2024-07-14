import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MenuIcon from "@/components/islands/profile/MenuIcon";
import { Badge } from "@/components/ui/badge";

const UserHeader = () => {
    return (<>
        <div className="flex flex-col items-start gap-4">
            <div className="flex justify-between items-center w-full">
                <div>
                    <div className="flex items-center gap-1">
                        <p className="text-2xl font-semibold leading-7 [&:not(:first-child)]:mt-6">
                            zehan12
                        </p>
                        <img className="w-6 h-6" src="/icons/verified.png" />
                    </div>
                    <div className="my-1 flex gap-2">
                        <p className="text-sm">zehan12</p>
                        <Badge className=" font-light" variant={"secondary"}>
                            user
                        </Badge>
                    </div>
                </div>
                <Avatar className="w-20 h-20">
                    <AvatarImage alt="userProfile" src="https://github.com/zehan12.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    The king, seeing how much happier his subjects were,
                    realized the error of his ways and repealed the joke tax.
                </p>
            </div>
            <div className="flex justify-between items-center w-full">
                <div className="flex justify-evenly items-center">
                    <p className="text-muted-foreground">10.2k followers</p>
                    <p className="text-muted-foreground mx-2">&#8226;</p>
                    <p className="text-muted-foreground">900 following</p>
                </div>
                <div>
                    <MenuIcon />
                </div>
            </div>
            <div className="w-full flex justify-evenly">
                <div className="w-full flex justify-center pb-3 cursor-pointer border-b-[1px] border-b-muted-foreground ">
                    <b className=" font-semibold">Activities</b>
                </div>
                <div className="w-full flex justify-center pb-3 cursor-pointer border-b-[1px] border-b-muted-primary-foreground ">
                    <b className=" font-semibold">Interactions</b>
                </div>
            </div>
        </div>
    </>)
}

UserHeader.displayName = "UserHeader";
export default UserHeader;