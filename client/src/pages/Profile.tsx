import ProfileHeader from "@/components/islands/profile/ProfileHeader";
import UserPost from "@/components/islands/profile/UserPost";
import { FC } from "react";

const Profile: FC = () => {
    return (<>
        <ProfileHeader />
        <UserPost title={"this is my first post"} image={"https://miro.medium.com/v2/resize:fit:1400/format:webp/0*ZGsHqqBsfNaBM4-F.jpg"} likes={10} replies={20} />
        <UserPost title={"this is my II post"} image={"https://alexwlchan.net/images/2024/Nahtavyys_liikennemerkki_20170523_2x.avif"} likes={10} replies={20} />
    </>)
}

Profile.displayName = "Profile";
export default Profile;