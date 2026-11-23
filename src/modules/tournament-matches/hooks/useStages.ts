"use client";

import { useEffect, useState } from "react";
import { fetchTournamentStages } from "../services/matches.service";
import { Stage } from "../models/match.models";

// stages === undefined means the fetch is still in flight.
export function useStages(tournamentId: number | undefined) {
    const [stages, setStages] = useState<Stage[] | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!tournamentId) return;
        let cancelled = false;

        fetchTournamentStages(tournamentId)
            .then((data) => {
                if (!cancelled) setStages(data);
            })
            .catch((err: Error) => {
                if (!cancelled) setError(err.message);
            });

        return () => {
            cancelled = true;
        };
    }, [tournamentId]);

    return { stages, loading: stages === undefined, error };
}
