import { Match, Stage } from "../models/match.models";

// RoundLabels maps each round number of a stage to a human label
// (HLTV-style: Cuartos, Semis, Final, WB/LB rounds, Gran Final…).
export function buildRoundLabels(stage: Stage, matches: Match[]): Map<number, string> {
    const labels = new Map<number, string>();
    if (matches.length === 0) return labels;

    const rounds = [...new Set(matches.map((m) => m.roundNumber))].sort(
        (a, b) => a - b
    );
    const last = rounds[rounds.length - 1];

    if (stage.format === "SINGLE_ELIMINATION") {
        for (const r of rounds) {
            labels.set(r, eliminationRoundLabel(r, last, rounds.length));
        }
        return labels;
    }

    if (stage.format === "DOUBLE_ELIMINATION") {
        // WB rounds 1..k, LB rounds k+1..k+(2k-2), GF = last round.
        const gfRound = last;
        let ubRounds = 0;
        for (const r of rounds) {
            if (r === gfRound) break;
            ubRounds++;
        }
        const lbRounds = ubRounds > 0 ? rounds.length - ubRounds - 1 : 0;

        for (const r of rounds) {
            if (r === gfRound) {
                labels.set(r, "Gran Final");
            } else if (r <= ubRounds) {
                labels.set(r, `WB ${eliminationRoundLabel(r, ubRounds, ubRounds)}`);
            } else {
                const lbIndex = r - ubRounds;
                labels.set(
                    r,
                    lbIndex === lbRounds
                        ? "Final LB"
                        : `LB Ronda ${lbIndex}`
                );
            }
        }
        return labels;
    }

    // Swiss / groups: "Ronda i de N" when the config declares rounds.
    const total = stage.config?.rounds;
    for (const r of rounds) {
        labels.set(r, total ? `Ronda ${r} de ${total}` : `Ronda ${r}`);
    }
    return labels;
}

// eliminationRoundLabel names standard elimination rounds counting backwards.
function eliminationRoundLabel(round: number, last: number, total: number): string {
    const fromEnd = last - round;
    if (total === 1) return "Final";
    switch (fromEnd) {
        case 0:
            return "Final";
        case 1:
            return total >= 4 ? "Semis" : "Semifinal";
        case 2:
            return total >= 8 ? "Cuartos" : "Cuartos de final";
        default:
            return `Ronda ${round}`;
    }
}
