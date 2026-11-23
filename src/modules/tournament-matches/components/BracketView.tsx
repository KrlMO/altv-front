"use client";

import { Match } from "../models/match.models";
import { MatchCard } from "./MatchCard";

interface BracketViewProps {
    matches: Match[];
}

// BracketView renders single-elimination brackets: one column per round,
// matches ordered top to bottom. Horizontal scroll on small screens.
export function BracketView({ matches }: BracketViewProps) {
    const rounds = new Map<number, Match[]>();
    for (const m of matches) {
        const list = rounds.get(m.roundNumber) ?? [];
        list.push(m);
        rounds.set(m.roundNumber, list);
    }
    const sortedRounds = [...rounds.entries()].sort((a, b) => a[0] - b[0]);

    return (
        <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max gap-6">
                {sortedRounds.map(([round, roundMatches]) => (
                    <div key={round} className="flex min-w-52 flex-col">
                        <h4 className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-neutral-500">
                            {roundMatches.length === 1
                                ? round === 1
                                    ? "Final"
                                    : `Ronda ${round}`
                                : `Ronda ${round}`}
                        </h4>
                        <div className="flex flex-1 flex-col justify-around gap-3">
                            {roundMatches.map((m) => (
                                <MatchCard key={m.id} match={m} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
