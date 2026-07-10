type Props = {
    photo: string;
};

export function ProfileAvatar({ photo }: Props) {
    return (
        <div className="-mt-10 sm:-mt-12 ml-4 sm:ml-6 relative z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white dark:border-altv-maindark overflow-hidden bg-gray-200 dark:bg-altv-darksecondary">
                <img
                    src={photo}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}