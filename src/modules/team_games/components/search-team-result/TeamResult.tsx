interface TeamResultProps {
    logo: string;
    name: string;
}

export function TeamResult({ logo, name }: TeamResultProps) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 
            hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
            <img
                src={logo}
                alt={name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <h3 className="text-sm font-medium truncate">{name}</h3>
        </div>
    );
}
