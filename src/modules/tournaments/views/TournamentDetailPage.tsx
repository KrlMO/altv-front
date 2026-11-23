"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { fetchTournamentById } from "../services/tournaments.service";
import { TournamentItem } from "../models/tournament.models";
import { StatusBadge } from "@/components/ui/card/StatusBadge";
import { GeneralButton } from "@/components/ui/buttom/GeneralButton";
import { TournamentMatchesSection } from "@/modules/tournament-matches/views/TournamentMatchesSection";

function formatDateTime(value: string): string {
    return new Date(value).toLocaleString("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function HeroSkeleton() {
    return (
        <div
            className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-altv-bgcontent"
            aria-busy="true"
            aria-label="Cargando torneo"
        >
            <div className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
                <div className="flex-1 space-y-2">
                    <div className="h-5 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
            </div>
        </div>
    );
}

// tournament === undefined means the fetch is still in flight.
export function TournamentDetailPage({ id }: { id: number }) {
    const { accessToken } = useAuth();
    const [tournament, setTournament] = useState<TournamentItem | undefined>(
        undefined
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetchTournamentById(id)
            .then((data) => {
                if (!cancelled) setTournament(data);
            })
            .catch((err: Error) => {
                if (!cancelled) setError(err.message);
            });
        return () => {
            cancelled = true;
        };
    }, [id]);

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4">
            {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/5 p-6 text-center">
                    <p className="font-medium text-red-400">{error}</p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        El torneo puede no existir o no estar disponible.
                    </p>
                </div>
            )}

            {!error && tournament === undefined && <HeroSkeleton />}

            {!error && tournament && (
                <>
                    <header className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-altv-bgcontent">
                        <div className="flex items-start gap-4">
                            {tournament.logo ? (
                                <img
                                    src={tournament.logo}
                                    alt={tournament.name}
                                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-sm font-bold text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                                    {tournament.gameName
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </div>
                            )}

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                        {tournament.name}
                                    </h1>
                                    <StatusBadge status={tournament.status} />
                                </div>
                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                    {tournament.gameName}
                                    {tournament.organization &&
                                        ` · ${tournament.organization}`}
                                    {(tournament.countryName ||
                                        tournament.regionName) &&
                                        ` · ${
                                            tournament.countryName ??
                                            tournament.regionName
                                        }`}
                                </p>
                            </div>

                            {accessToken && (
                                <Link
                                    href={`/app/tournaments/${tournament.id}/manage`}
                                    className="shrink-0"
                                >
                                    <GeneralButton>Gestionar</GeneralButton>
                                </Link>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 border-t border-zinc-200 pt-3 dark:border-zinc-700">
                            <span className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                Inicia{" "}
                                <span className="font-semibold">
                                    {formatDateTime(tournament.startAt)}
                                </span>
                            </span>
                            {tournament.endAt && (
                                <span className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                    Termina{" "}
                                    <span className="font-semibold">
                                        {formatDateTime(tournament.endAt)}
                                    </span>
                                </span>
                            )}
                        </div>
                    </header>

                    <section>
                        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            Competencia
                        </h2>
                        <TournamentMatchesSection tournamentId={tournament.id} />
                    </section>
                </>
            )}
        </div>
    );
}
