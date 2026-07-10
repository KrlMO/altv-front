interface TeamListItemProps {
    id: string;
    name: string;
    logo: string;
    role: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

export function TeamListItem({
    id,
    name,
    logo,
    role,
    isSelected,
    onSelect,
}: TeamListItemProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                isSelected
                    ? "bg-[#88008B]/10 border border-[#88008B]/30"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent"
            }`}
        >
            <img
                src={logo}
                alt={name}
                className="w-10 h-10 rounded-full object-cover bg-zinc-200 dark:bg-zinc-700"
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-zinc-900 dark:text-zinc-100">
                    {name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">
                    {role.replace("_", " ")}
                </p>
            </div>
        </button>
    );
}
