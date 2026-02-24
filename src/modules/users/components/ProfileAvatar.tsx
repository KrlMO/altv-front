type Props = {
    photo: string;
};

export function ProfileAvatar({ photo }: Props) {
    return (
        <img src={photo} alt="Avatar" />
    );
}