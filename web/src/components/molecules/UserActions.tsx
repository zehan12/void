import { Icons } from "../svg";

const UserActions = () => {
    return (<div onClick={(e) => e.preventDefault()} className="flex items-center gap-5 my-2">
        <Icons.like width={"24"} fill="rgb(237, 73, 86)" color="rgb(237, 73, 86)" onClick={() => { console.log("liked"); }} />
        <Icons.comment width={"24"} fill="red" />
        <Icons.repost width={"24"} fill="white" />
        <Icons.share width={"24"} />
    </div>);
};

UserActions.displayName = "UserActions";
export default UserActions;