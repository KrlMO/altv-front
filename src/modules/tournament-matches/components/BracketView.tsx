"use client";

import { Match, Stage } from "../models/match.models";
import { MatchCard } from "./MatchCard";
import { buildRoundLabels } from "../utils/roundLabels";

interface BracketViewProps {
    matches: Match[];
    stage: Stage;
}

// BracketView renders elimination brackets: one column per round, grouped by
// bracket section (WB / LB / GF) for double elimination.
export function BracketView({ matches, stage }: BracketViewProps) {
    const labels = buildRoundLabels(stage, matches);
    const rounds = new Map<number, Match[]>();
    for (const m of matches) {
        const list = rounds.get(m.roundNumber) ?? [];
        list.push(m);
        rounds.set(m.roundNumber, list);
    }
    const sortedRounds = [...rounds.entries()].sort((a, b) => a[0] - b[0]);

    const isDoubleElim = stage.format === "DOUBLE_ELIMINATION";
    // In a DE bracket the last column is the grand final and the middle ones
    // are the lower bracket.
    const gfRound = sortedRounds.length > 0 ? sortedRounds[sortedRounds.length - 1][0] : 0;
    const lbFirst = isDoubleElim ? firstLbRound(rounds, gfRound) : 0;

    return (
        <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max gap-6">
                {sortedRounds.map(([round, roundMatches]) => {
                    const section = sectionOf(round, gfRound, lbFirst, isDoubleElim);
                    return (
                        <div key={round} className="flex min-w-52 flex-col">
                            <h4
                                className={`mb-3 text-center text-xs font-semibold uppercase tracking-wider ${
                                    section === "gf"
                                        ? "text-amber-400"
                                        : section === "lb"
                                          ? "text-sky-400"
                                          : "text-neutral-500"
                                }`}
                            >
                                {labels.get(round) ?? `Ronda ${round}`}
                            </h4>
                            <div className="flex flex-1 flex-col justify-around gap-3">
                                {roundMatches.map((m) => (
                                    <MatchCard key={m.id} match={m} highlight={section === "gf"} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

type Section = "wb" | "lb" | "gf";

function sectionOf(round: number, gfRound: number, lbFirst: number, isDoubleElim: boolean): Section {
    if (isDoubleElim) {
        if (round === gfRound) return "gf";
        if (lbFirst > 0 && round >= lbFirst) return "lb";
    }
    if (round === gfRound) return "gf";
    return "wb";
}

// firstLbRound finds the first LB round: the first round whose match count is
// lower than the peak UB count and comes after it, scanning counts.
function firstLbRound(rounds: Map<number, Match[]>, gfRound: number): number {
    let prevCount = 0;
    for (const [round, list] of rounds) {
        if (round === gfRound) break;
        if (prevCount > 0 && list.length < prevCount) {
            return round;
        }
        prevCount = list.length;
    }
    return 0;
}
