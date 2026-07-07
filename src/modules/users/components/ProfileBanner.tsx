type Props = {
    banner: string;
};

export function ProfileBanner({ banner }: Props) {
    return (
        <div className="w-full h-32 sm:h-40 md:h-48 overflow-hidden rounded-t-xl">
            <img
                src={banner}
                alt="Banner"
                className="w-full h-full object-cover"
            />
        </div>
    );
}