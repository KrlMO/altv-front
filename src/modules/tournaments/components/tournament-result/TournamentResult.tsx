"use client";

import Link from "next/link";
import { TournamentItem } from "../../models/tournament.models";
import { StatusBadge } from "@/components/ui/card/StatusBadge";

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

export function formatStartTime(value: string): string {
    return new Date(value).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function TournamentResult({ tournament }: TournamentResultProps) {
    const organizerLabel = tournament.organizerType
        ? organizerLabels[tournament.organizerType] ?? tournament.organizerType
        : undefined;

    return (
        <Link
            href={`/tournaments/${tournament.id}`}
            className="group flex flex-wrap items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:border-btn-primary/60 hover:bg-zinc-50 sm:flex-nowrap dark:border-zinc-700 dark:hover:border-btn-primary/60 dark:hover:bg-altv-maindark/60"
        >
            {tournament.logo ? (
                <img
                    src={tournament.logo}
                    alt={tournament.name}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                />
            ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-xs font-bold text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                    {tournament.gameName.slice(0, 2).toUpperCase()}
                </div>
            )}

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {tournament.name}
                    </h3>
                    <StatusBadge status={tournament.status} />
                    {tournament.typeName && (
                        <span className="shrink-0 rounded-full bg-btn-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-btn-primary">
                            {tournament.typeName}
                        </span>
                    )}
                </div>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {tournament.gameName}
                    <span className="hidden sm:inline">
                        {organizerLabel && ` · ${organizerLabel}`}
                        {tournament.countryName && ` · ${tournament.countryName}`}
                        {!tournament.countryName &&
                            tournament.regionName &&
                            ` · ${tournament.regionName}`}
                    </span>
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                        Inicia
                    </p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {formatStartDate(tournament.startAt)}
                    </p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                        {formatStartTime(tournament.startAt)} hs
                    </p>
                </div>
                <span
                    aria-hidden
                    className="hidden text-zinc-400 transition-colors group-hover:text-btn-primary sm:block"
                >
                    →
                </span>
            </div>
        </Link>
    );
}
