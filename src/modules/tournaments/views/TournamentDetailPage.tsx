"use client";

import { useEffect, useState } from "react";
import { fetchTournamentById } from "../services/tournaments.service";
import { TournamentItem } from "../models/tournament.models";
import { TournamentMatchesSection } from "@/modules/tournament-matches/views/TournamentMatchesSection";

function formatDate(value: string): string {
    return new Date(value).toLocaleDateString("es-LA", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

// tournament === undefined means the fetch is still in flight.
export function TournamentDetailPage({ id }: { id: number }) {
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

    if (error) {
        return <p className="text-sm text-red-400">{error}</p>;
    }
    if (tournament === undefined) {
        return <p className="text-sm text-neutral-500">Cargando torneo…</p>;
    }

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{tournament.name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-400">
                    <span>{tournament.gameName}</span>
                    {tournament.organization && (
                        <span>· {tournament.organization}</span>
                    )}
                    {tournament.countryName && (
                        <span>· {tournament.countryName}</span>
                    )}
                    <span>· Inicia {formatDate(tournament.startAt)}</span>
                    {tournament.endAt && (
                        <span>· Termina {formatDate(tournament.endAt)}</span>
                    )}
                    <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs uppercase">
                        {tournament.status}
                    </span>
                </div>
            </header>

            <section>
                <h2 className="mb-4 text-lg font-semibold">Competencia</h2>
                <TournamentMatchesSection tournamentId={tournament.id} />
            </section>
        </div>
    );
}
