type Props = {
    banner: string;
};

export function ProfileBanner({ banner }: Props) {
    return (
        <img src={banner} alt="Banner" />
    );
}