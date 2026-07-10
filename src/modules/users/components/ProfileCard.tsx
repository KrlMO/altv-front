import { User } from "@/types/user";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileInfo } from "./ProfileInfo";

type Props = {
    user: User;
};

export function ProfileCard({ user }: Props) {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-altv-maindark rounded-xl shadow-lg overflow-hidden">
            <ProfileBanner
                banner={user.banner_photo || "/default-banner.jpg"}
            />
            <ProfileAvatar
                photo={user.profile_photo || "/default-profile.jpg"}
            />
            <ProfileInfo user={user} />
        </div>
    );
}