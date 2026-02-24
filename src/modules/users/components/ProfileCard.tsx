import { User } from "@/types/user";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileInfo } from "./ProfileInfo";

type Props = {
    user: User;
};

export function ProfileCard({ user }: Props) {
    return (
        <>
            <div>
                <div>
                    <ProfileBanner banner={user?.banner_photo==="" ? "/default-banner.jpg" : user?.banner_photo ?? "/default-banner.jpg"} />
                </div>
                <div>
                    <ProfileAvatar photo={user?.profile_photo==="" ? "/default-profile.jpg" : user?.profile_photo ?? "/default-profile.jpg"} />
                </div>
            </div>
            <div>
                <ProfileInfo user={user} />
            </div>
        </>
    );
}