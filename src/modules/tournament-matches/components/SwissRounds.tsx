"use client";

import { Match, Stage } from "../models/match.models";
import { MatchCard } from "./MatchCard";
import { buildRoundLabels } from "../utils/roundLabels";

interface SwissRoundsProps {
    matches: Match[];
    stage: Stage;
}

// SwissRounds groups matches by round in a vertical list (swiss and group
// stages don't have a bracket shape).
export function SwissRounds({ matches, stage }: SwissRoundsProps) {
    const labels = buildRoundLabels(stage, matches);
    const rounds = new Map<number, Match[]>();
    for (const m of matches) {
        const list = rounds.get(m.roundNumber) ?? [];
        list.push(m);
        rounds.set(m.roundNumber, list);
    }
    const sortedRounds = [...rounds.entries()].sort((a, b) => a[0] - b[0]);

    if (sortedRounds.length === 0) {
        return (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Aún no hay partidos generados en esta etapa.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {sortedRounds.map(([round, roundMatches]) => (
                <section key={round}>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {labels.get(round) ?? `Ronda ${round}`}
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {roundMatches.map((m) => (
                            <MatchCard key={m.id} match={m} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
