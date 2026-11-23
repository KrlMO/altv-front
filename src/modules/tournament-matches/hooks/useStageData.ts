"use client";

import { useEffect, useState } from "react";
import {
    fetchStageMatches,
    fetchStageStandings,
} from "../services/matches.service";
import { Match, StandingsRow } from "../models/match.models";

// matches/standings === undefined means the fetch is still in flight.
export function useStageData(
    stageId: number | undefined,
    format: string | undefined
) {
    const [matches, setMatches] = useState<Match[] | undefined>(undefined);
    const [standings, setStandings] = useState<StandingsRow[] | undefined>(
        undefined
    );
    const [error, setError] = useState<string | null>(null);
    const needsStandings = format === "SWISS" || format === "GROUP_STAGE";

    useEffect(() => {
        if (!stageId || !format) return;
        let cancelled = false;

        const requests: Promise<void>[] = [
            fetchStageMatches(stageId)
                .then((data) => {
                    if (!cancelled) setMatches(data);
                })
                .catch((err: Error) => {
                    if (!cancelled) setError(err.message);
                }),
        ];

        if (needsStandings) {
            requests.push(
                fetchStageStandings(stageId)
                    .then((data) => {
                        if (!cancelled) setStandings(data);
                    })
                    .catch((err: Error) => {
                        if (!cancelled) setError(err.message);
                    })
            );
        }

        Promise.all(requests).catch(() => {
            /* errors already handled per request */
        });

        return () => {
            cancelled = true;
        };
    }, [stageId, format, needsStandings]);

    return {
        matches,
        standings,
        loading:
            matches === undefined || (needsStandings && standings === undefined),
        error,
    };
}
