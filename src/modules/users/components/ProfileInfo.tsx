import { User } from "@/types/user";

type Props = {
    user: User;
};

export function ProfileInfo({ user }: Props) {
    return (
        <div>
            <h2>{user.nickname}</h2>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.auth.map((auth) => `${auth.provider}: ${auth.provider_uid}`)}</p>
        </div>
    );
}