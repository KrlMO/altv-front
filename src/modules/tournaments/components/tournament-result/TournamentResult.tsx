import { TournamentItem } from "../../models/tournament.models";

interface TournamentResultProps {
    tournament: TournamentItem;
}

const organizerLabels: Record<string, string> = {
    OFFICIAL: "Oficial ALTV",
    COMMUNITY: "Comunidad",
    INDEPENDENT: "Organizador Independiente",
};

export function formatStartDate(value: string): string {
    return new Date(value).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function TournamentResult({ tournament }: TournamentResultProps) {
    const organizerLabel = tournament.organizerType
        ? organizerLabels[tournament.organizerType] ?? tournament.organizerType
        : undefined;

    return (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
            {tournament.logo ? (
                <img
                    src={tournament.logo}
                    alt={tournament.name}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                />
            ) : (
                <div className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-xs font-bold shrink-0">
                    {tournament.gameName.slice(0, 2).toUpperCase()}
                </div>
            )}

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-medium truncate">
                        {tournament.name}
                    </h3>
                    {tournament.typeName && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 shrink-0">
                            {tournament.typeName}
                        </span>
                    )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {tournament.gameName}
                    {organizerLabel && ` · ${organizerLabel}`}
                    {tournament.countryName &&
                        ` · ${tournament.countryName}`}
                    {!tournament.countryName &&
                        tournament.regionName &&
                        ` · ${tournament.regionName}`}
                </p>
            </div>

            <div className="text-right shrink-0">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Inicia
                </p>
                <p className="text-sm font-semibold">
                    {formatStartDate(tournament.startAt)}
                </p>
            </div>
        </div>
    );
}
